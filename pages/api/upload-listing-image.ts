import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import type { NextApiRequest, NextApiResponse } from 'next';

const BUCKET_NAME = 'listing-images';
const PUBLIC_URL = 'https://pub-9c939c686fba4d628f1e9d2054f48844.r2.dev';

// Lazy initialization to avoid errors at module load time
let r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (r2Client) return r2Client;
  
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY environment variables.');
  }
  
  r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  
  return r2Client;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check credentials first
    const R2 = getR2Client();
    
    const chunks: Buffer[] = [];
    for await (const chunk of req as any) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Parse multipart form data
    const boundary = req.headers['content-type']?.split('boundary=')[1];
    if (!boundary) {
      return res.status(400).json({ error: 'No boundary found' });
    }

    const parts = buffer.toString('binary').split(`--${boundary}`);
    let fileBuffer: Buffer | null = null;
    let fileName = '';
    let contentType = 'image/jpeg';

    for (const part of parts) {
      if (part.includes('filename=')) {
        const filenameMatch = part.match(/filename="(.+?)"/);
        const contentTypeMatch = part.match(/Content-Type: (.+?)\r\n/);
        
        if (filenameMatch) fileName = filenameMatch[1];
        if (contentTypeMatch) contentType = contentTypeMatch[1].trim();

        const dataStart = part.indexOf('\r\n\r\n') + 4;
        const dataEnd = part.lastIndexOf('\r\n');
        const fileData = part.slice(dataStart, dataEnd);
        fileBuffer = Buffer.from(fileData, 'binary');
      }
    }

    if (!fileBuffer) {
      return res.status(400).json({ error: 'No file found' });
    }

    // Generate unique filename
    const ext = fileName.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

    await R2.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueName,
      Body: fileBuffer,
      ContentType: contentType,
    }));

    const publicUrl = `${PUBLIC_URL}/${uniqueName}`;
    
    return res.status(200).json({ url: publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message });
  }
}
