
import React from 'react';

interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const paragraphs = React.useMemo(() => {
    return content.split('\n\n').map((paragraph, index) => {
      // Handle headers with proper semantic structure
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const headerText = paragraph.slice(2, -2);
        return { type: 'heading', content: headerText, key: `h-${index}` };
      }
      
      // Handle bullet points
      if (paragraph.includes('•')) {
        const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
        return { type: 'list', items, key: `l-${index}` };
      }
      
      // Regular paragraphs
      if (paragraph.trim()) {
        return { type: 'paragraph', content: paragraph, key: `p-${index}` };
      }
      
      return null;
    }).filter(Boolean);
  }, [content]);

  return (
    <section className="prose prose-lg max-w-none mb-12" itemProp="articleBody">
      {paragraphs.map((item) => {
        if (!item) return null;
        
        if (item.type === 'heading') {
          return <h2 key={item.key} className="text-2xl font-bold text-foreground mt-8 mb-4">{item.content}</h2>;
        }
        
        if (item.type === 'list') {
          return (
            <ul key={item.key} className="list-disc pl-6 space-y-2 mb-6">
              {item.items.map((listItem, idx) => (
                <li key={`${item.key}-${idx}`} className="text-muted-foreground leading-relaxed">
                  {listItem.replace('•', '').trim()}
                </li>
              ))}
            </ul>
          );
        }
        
        if (item.type === 'paragraph') {
          return <p key={item.key} className="text-muted-foreground leading-relaxed mb-4">{item.content}</p>;
        }
        
        return null;
      })}
    </section>
  );
};

export default BlogPostContent;
