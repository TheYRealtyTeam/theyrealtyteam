import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { syncBlogPostsToDatabase } from '@/utils/syncBlogPosts';
import { AlertCircle, CheckCircle2, Database, Loader2 } from 'lucide-react';

/**
 * Admin page to sync local blog posts to Supabase database
 * This will delete all existing posts and replace with quality content
 */
const BlogSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    deletedCount?: number;
    insertedCount?: number;
    error?: string;
  } | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    
    const syncResult = await syncBlogPostsToDatabase();
    setResult(syncResult);
    setSyncing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container-custom max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-yrealty-navy" />
              <div>
                <CardTitle className="text-2xl">Blog Database Sync</CardTitle>
                <CardDescription className="mt-2">
                  Clean up test posts and load 34 quality blog articles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This will permanently delete all 92 existing blog posts 
                and replace them with 34 high-quality articles across 6 categories.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">What will happen:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Delete all 92 test blog posts from database</li>
                <li>Insert 34 professionally written articles</li>
                <li>Diverse authors and publication dates</li>
                <li>SEO-optimized content (5-8 min reads)</li>
                <li>Categories: Property Management, Tenant Relations, Investment Advice, Maintenance, Market Trends, Technology</li>
              </ul>
            </div>

            <Button 
              onClick={handleSync} 
              disabled={syncing}
              size="lg"
              className="w-full"
            >
              {syncing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Syncing Database...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-5 w-5" />
                  Start Database Cleanup & Sync
                </>
              )}
            </Button>

            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {result.success ? (
                    <>
                      <strong>Success!</strong> Deleted {result.deletedCount} old posts and 
                      inserted {result.insertedCount} quality articles.
                    </>
                  ) : (
                    <>
                      <strong>Error:</strong> {result.error}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogSync;
