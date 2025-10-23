
import React from 'react';

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  return (
    <section className="prose prose-lg max-w-none mb-12" itemProp="articleBody">
      {content.split('\n\n').map((paragraph, index) => {
        // Handle headers with proper semantic structure
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          const headerText = paragraph.slice(2, -2);
          return <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">{headerText}</h2>;
        }
        
        // Handle bullet points
        if (paragraph.includes('•')) {
          const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-muted-foreground leading-relaxed">{item.replace('•', '').trim()}</li>
              ))}
            </ul>
          );
        }
        
        // Regular paragraphs
        return paragraph.trim() ? (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
        ) : null;
      })}
    </section>
  );
};

export default BlogPostContent;
