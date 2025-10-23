import { supabase } from "@/integrations/supabase/client";
import { blogPosts } from "@/data/blogPosts";
import { toast } from "sonner";

/**
 * Syncs local blog posts to Supabase database via edge function
 * Uses service role to bypass RLS policies
 */
export const syncBlogPostsToDatabase = async () => {
  try {
    console.log("Starting blog post sync...");
    
    // Prepare posts data
    const postsToInsert = blogPosts.map(post => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      author_role: "Property Management Expert",
      date: post.date,
      category: post.category,
      image_url: post.image_url
    }));
    
    // Call edge function with service role access
    const { data, error } = await supabase.functions.invoke('sync-blog-posts', {
      body: { posts: postsToInsert }
    });
    
    if (error) {
      console.error("Sync error:", error);
      throw error;
    }
    
    if (!data.success) {
      throw new Error(data.error || "Unknown error occurred");
    }
    
    console.log(`✓ Successfully synced blog posts:`, data);
    
    toast.success(`Successfully synced ${data.insertedCount} quality blog posts!`, {
      description: `Deleted ${data.deletedCount} old test posts.`
    });
    
    return {
      success: true,
      deletedCount: data.deletedCount,
      insertedCount: data.insertedCount
    };
    
  } catch (error) {
    console.error("Blog sync failed:", error);
    toast.error("Failed to sync blog posts", {
      description: error instanceof Error ? error.message : "Unknown error occurred"
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
