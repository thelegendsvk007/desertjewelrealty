import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useBlog, BlogPost } from '@/context/BlogContext';

// Fallback data in case the context fails
const localBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "2025 UAE Real Estate Market Outlook",
    excerpt: "Insights into market trends, hotspots, and investment opportunities in the UAE property market.",
    content: `<h2>2025 UAE Real Estate Market Outlook</h2><p>The UAE real estate market continues to show remarkable resilience and growth in 2025, with several key trends emerging that shape investment opportunities across the emirates.</p>`,
    category: "Market Trends",
    date: "May 2, 2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "New Regulations for Foreign Property Investors",
    excerpt: "Understanding the latest regulatory changes affecting non-resident property buyers in the UAE.",
    content: `<h2>New Regulations for Foreign Property Investors</h2><p>The UAE government has introduced several significant regulatory changes in 2025 that impact foreign property investors, creating both new opportunities and considerations for international buyers.</p>`,
    category: "Regulations",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Guide to Off-Plan Investment in Dubai",
    excerpt: "A comprehensive guide to investing in off-plan properties and maximizing returns.",
    content: `<h2>Guide to Off-Plan Investment in Dubai</h2><p>Off-plan property investment continues to be a popular strategy in Dubai's real estate market, offering potentially higher returns but requiring careful consideration of various factors.</p>`,
    category: "Investment Guide",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "7 min read"
  }
];

const BlogAndNews = () => {
  const blogContext = useBlog();
  const [localCurrentPost, setLocalCurrentPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Use context data if available, otherwise use local data
  const posts = blogContext?.posts?.length > 0 ? blogContext.posts : localBlogPosts;
  const currentPost = blogContext?.currentPost || localCurrentPost;
  const setCurrentPost = blogContext?.setCurrentPost || setLocalCurrentPost;
  
  // Function to get related posts
  const getRelatedPosts = (post: BlogPost, count: number = 2): BlogPost[] => {
    if (blogContext?.getRelatedPosts) {
      return blogContext.getRelatedPosts(post, count);
    }
    
    // Fallback implementation
    const sameCategoryPosts = posts.filter(p => 
      p.id !== post.id && p.category === post.category
    );
    
    if (sameCategoryPosts.length >= count) {
      return sameCategoryPosts.slice(0, count);
    }
    
    const otherPosts = posts.filter(p => 
      p.id !== post.id && p.category !== post.category
    );
    
    return [
      ...sameCategoryPosts,
      ...otherPosts.slice(0, count - sameCategoryPosts.length)
    ];
  };

  const openArticle = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-gray-50 animated-bg">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">UAE Real Estate Blog & News</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest market trends, new regulations, and investment guides for UAE real estate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-white hover:bg-primary">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-gray-600">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => openArticle(post)}
                  >
                    Read Article <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All Articles <i className="fas fa-external-link-alt ml-2"></i>
          </Button>
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {currentPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-white">
                    {currentPost.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{currentPost.date} · {currentPost.readTime}</span>
                </div>
                <DialogTitle className="text-2xl font-montserrat">{currentPost.title}</DialogTitle>
                <DialogDescription>{currentPost.excerpt}</DialogDescription>
              </DialogHeader>
              
              <div className="my-4">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title}
                  className="w-full h-64 object-cover rounded-md mb-6" 
                />
                <div 
                  className="prose prose-emerald max-w-none" 
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
              </div>
              
              {/* Recommended Related Articles */}
              {currentPost && (
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-montserrat font-semibold mb-4">Recommended Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getRelatedPosts(currentPost, 2).map((relatedPost) => (
                      <div 
                        key={relatedPost.id}
                        className="flex cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                        onClick={() => {
                          setCurrentPost(relatedPost);
                          // Scroll to top of dialog
                          setTimeout(() => {
                            const dialogContent = document.querySelector('[role="dialog"]');
                            if (dialogContent) dialogContent.scrollTop = 0;
                          }, 10);
                        }}
                      >
                        <div className="flex-shrink-0 w-20 h-20 mr-4">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover rounded" 
                          />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-1 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-medium text-sm line-clamp-2">{relatedPost.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedPost.readTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <DialogFooter className="mt-6">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogAndNews;