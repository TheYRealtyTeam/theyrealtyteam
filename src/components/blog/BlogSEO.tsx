import React from 'react';
import { Helmet } from 'react-helmet';
import { BlogPostData } from '@/integrations/supabase/client';

interface BlogSEOProps {
  post: BlogPostData;
  canonicalUrl: string;
}

const BlogSEO = ({ post, canonicalUrl }: BlogSEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url,
    "datePublished": post.date,
    "dateModified": post.updated_at || post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.author_role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Y Realty Team",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yrealtyteam.com/lovable-uploads/logo-96x96.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": post.category,
    "keywords": post.category
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{post.title} | Y Realty Team Blog</title>
      <meta name="title" content={post.title} />
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={`${post.category}, property management, real estate, ${post.author}`} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image_url} />
      <meta property="og:site_name" content="Y Realty Team" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:modified_time" content={post.updated_at || post.date} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={post.image_url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default BlogSEO;
