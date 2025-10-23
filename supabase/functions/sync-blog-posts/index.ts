import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  author_role: string;
  date: string;
  category: string;
  image_url: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting blog post sync...');

    // Create Supabase client with service role (bypasses RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Get blog posts from request body
    const { posts } = await req.json() as { posts: BlogPostInput[] };
    
    if (!posts || !Array.isArray(posts)) {
      throw new Error('Invalid posts data');
    }

    console.log(`Received ${posts.length} posts to sync`);

    // Step 1: Delete all existing posts
    const { error: deleteError, count: deletedCount } = await supabase
      .from('blog_posts')
      .delete({ count: 'exact' })
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw deleteError;
    }

    console.log(`✓ Deleted ${deletedCount || 0} existing blog posts`);

    // Step 2: Insert new posts in batches
    const batchSize = 10;
    let insertedCount = 0;

    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);
      
      const { error: insertError, count } = await supabase
        .from('blog_posts')
        .insert(batch, { count: 'exact' });

      if (insertError) {
        console.error(`Insert error (batch ${i / batchSize + 1}):`, insertError);
        throw insertError;
      }

      insertedCount += count || batch.length;
      console.log(`✓ Inserted batch ${i / batchSize + 1} (${batch.length} posts)`);
    }

    console.log(`✓ Successfully synced ${insertedCount} blog posts`);

    return new Response(
      JSON.stringify({
        success: true,
        deletedCount: deletedCount || 0,
        insertedCount,
        message: `Successfully deleted ${deletedCount || 0} posts and inserted ${insertedCount} new posts`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Sync failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
