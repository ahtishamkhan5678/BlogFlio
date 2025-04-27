import React from 'react';
import { ContentSection as ContentSectionType } from '../../types';

interface ContentSectionProps {
  section: ContentSectionType;
}

const ContentSection: React.FC<ContentSectionProps> = ({ section }) => {
  const getStyleClasses = () => {
    switch (section.style) {
      case 'elegant':
        return 'font-serif text-slate-800 leading-relaxed';
      case 'modern':
        return 'font-sans text-slate-900 leading-tight';
      case 'minimal':
        return 'font-mono text-slate-700 leading-normal';
      default:
        return 'font-sans text-slate-700 leading-relaxed';
    }
  };

  const getLayoutClasses = () => {
    switch (section.layout) {
      case 'left':
        return 'float-left mr-8 mb-4 w-1/2';
      case 'right':
        return 'float-right ml-8 mb-4 w-1/2';
      case 'center':
        return 'mx-auto my-8 w-2/3';
      case 'full':
        return 'w-full my-8';
      default:
        return 'w-full my-4';
    }
  };

  switch (section.type) {
    case 'image':
      return (
        <figure className={getLayoutClasses()}>
          <img
            src={section.imageUrl}
            alt={section.content}
            className="rounded-lg shadow-lg w-full h-auto"
          />
          {section.content && (
            <figcaption className="mt-2 text-sm text-slate-500 text-center italic">
              {section.content}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-8 italic text-lg text-slate-700">
          {section.content}
        </blockquote>
      );

    case 'highlight':
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-lg">
          <p className="text-blue-900">{section.content}</p>
        </div>
      );

    default:
      return (
        <p className={`my-6 ${getStyleClasses()}`}>
          {section.content}
        </p>
      );
  }
};

export default ContentSection;