import { useState, useEffect } from 'react';

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  thumbnail?: string;
  categories?: string[];
  guid: string;
}

interface RSSResponse {
  status: string;
  feed: {
    title: string;
    description: string;
    link: string;
    image: string;
  };
  items: Array<{
    title: string;
    link: string;
    pubDate: string;
    description: string;
    content: string;
    thumbnail?: string;
    categories?: string[];
    guid: string;
  }>;
}

export const useBlogFeed = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMultipleFeeds = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Multiple RSS feeds for diverse content
        const feedUrls = [
          'https://rss.app/feeds/v1.1/ADiDj3PYPd4mLV0q.json',
          'https://rss.app/feeds/v1.1/Kv8ph9eptpMBqfcO.json',
          'https://rss.app/feeds/v1.1/7Fg4bsvRaPOtpa99.json',
          'https://rss.app/feeds/v1.1/xJUHb2Q5cYNUihPy.json',
          'https://rss.app/feeds/v1.1/1xHifxnYL8vtwpEu.json'
        ];
        
        // Fetch all feeds concurrently
        const feedPromises = feedUrls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.warn(`Failed to fetch feed: ${url}`);
              return [];
            }
            const data = await response.json();
            return data.items || [];
          } catch (err) {
            console.warn(`Error fetching feed ${url}:`, err);
            return [];
          }
        });
        
        const allFeedResults = await Promise.all(feedPromises);
        
        // Combine and shuffle all posts from different feeds
        const allPosts = allFeedResults.flat();
        
        // Transform to our BlogPost format and remove duplicates
        const transformedPosts = allPosts
          .map(item => ({
            title: item.title,
            link: item.url || item.link,
            pubDate: item.date_published || item.pubDate,
            description: item.summary || item.description || item.content_text || '',
            content: item.content_html || item.content || item.summary || item.description || '',
            thumbnail: item.image || item.thumbnail || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            categories: item.tags || item.categories || ['Real Estate'],
            guid: item.id || item.guid || item.url || item.link
          }))
          .filter((post, index, self) => 
            // Remove duplicates based on title and link
            index === self.findIndex(p => p.title === post.title || p.link === post.link)
          )
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()) // Sort by date, newest first
          .slice(0, 20); // Limit to 20 most recent posts
        
        setPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMultipleFeeds();
  }, []);

  return { posts, loading, error };
};