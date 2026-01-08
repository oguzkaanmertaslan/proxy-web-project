
import React from 'react';
import Link from '../Link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex flex-wrap gap-2 pb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link className="text-text-secondary hover:text-primary text-sm font-medium leading-normal" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="text-white text-sm font-medium leading-normal">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-text-secondary text-sm font-medium leading-normal">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
