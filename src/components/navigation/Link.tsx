import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const isExternal = to.startsWith('http');
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't handle clicks for external links
    if (isExternal) return;
    
    e.preventDefault();
    // Use history API to change the URL without a full page reload
    window.history.pushState({}, '', to);
    
    // Dispatch a custom event to notify the Router
    const navigationEvent = new CustomEvent('navigate', { detail: to });
    window.dispatchEvent(navigationEvent);
    
    // Call the original onClick handler if provided
    if (props.onClick) {
      props.onClick(e);
    }
  };
  
  return (
    <a 
      href={to} 
      onClick={handleClick}
      {...props}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
};