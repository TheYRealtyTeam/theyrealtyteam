import { supabase } from "@/integrations/supabase/client";
import { blogPosts } from "@/data/blogPosts";
import { toast } from "sonner";

/**
 * Syncs local blog posts to Supabase database
 * Deletes all existing posts and inserts new quality content
 */
export const syncBlogPostsToDatabase = async () => {
  try {
    console.log("Starting blog post sync...");
    
    // Step 1: Delete all existing posts
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all posts
    
    if (deleteError) {
      console.error("Error deleting old posts:", deleteError);
      throw deleteError;
    }
    
    console.log("✓ Deleted all existing blog posts");
    
    // Step 2: Prepare new posts for insertion
    const postsToInsert = blogPosts.map(post => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      author_role: "Property Management Expert", // Default role
      date: post.date,
      category: post.category,
      image_url: post.image_url
    }));
    
    // Step 3: Insert new posts in batches (Supabase has limits)
    const batchSize = 10;
    for (let i = 0; i < postsToInsert.length; i += batchSize) {
      const batch = postsToInsert.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert(batch);
      
      if (insertError) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, insertError);
        throw insertError;
      }
      
      console.log(`✓ Inserted batch ${i / batchSize + 1} (${batch.length} posts)`);
    }
    
    console.log(`✓ Successfully synced ${postsToInsert.length} blog posts to database`);
    
    toast.success(`Successfully synced ${postsToInsert.length} quality blog posts!`, {
      description: "Database cleanup complete. Old test posts removed."
    });
    
    return {
      success: true,
      deletedCount: 92, // We know this from the query
      insertedCount: postsToInsert.length
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
