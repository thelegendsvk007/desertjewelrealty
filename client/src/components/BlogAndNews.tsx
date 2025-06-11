import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useBlogFeed, BlogPost } from '@/hooks/useBlogFeed';
import { Calendar, Clock, ExternalLink, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const BlogAndNews = () => {
  const { posts, loading, error } = useBlogFeed();
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();
  const touchStartRef = useRef<number>(0);
  
  // Function to get related posts
  const getRelatedPosts = (post: BlogPost, count: number = 2): BlogPost[] => {
    if (!posts || posts.length === 0) return [];
    
    // Filter out the current post and get the first few
    return posts
      .filter(p => p.guid !== post.guid)
      .slice(0, count);
  };

  const openArticle = (post: BlogPost) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const truncateText = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const extractTextFromHtml = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const startAutoScroll = () => {
    if (scrollContainerRef.current && posts.length > 0 && isAutoPlaying) {
      autoScrollRef.current = setInterval(() => {
        if (scrollContainerRef.current && isAutoPlaying) {
          const container = scrollContainerRef.current;
          const cardWidth = 400; // Card width + gap
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollTo({ 
              left: container.scrollLeft + cardWidth, 
              behavior: 'smooth' 
            });
          }
        }
      }, 4000); // 4 seconds interval
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = undefined;
    }
  };

  // Auto-scroll functionality for blog carousel
  useEffect(() => {
    if (posts.length > 1 && isAutoPlaying) {
      startAutoScroll();
    }

    return () => stopAutoScroll();
  }, [posts, isAutoPlaying]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 400; // Card width + gap
      
      // Stop auto-scroll when arrows are clicked
      stopAutoScroll();
      setIsAutoPlaying(false);
      
      if (direction === 'left') {
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    // Stop auto-scroll on touch interaction
    stopAutoScroll();
    setIsAutoPlaying(false);
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left (next)
        scroll('right');
      } else {
        // Swipe right (previous)
        scroll('left');
      }
    }
  };

  const handleCardTouch = () => {
    // Stop auto-scroll when card is touched
    stopAutoScroll();
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">UAE Real Estate Blog & News</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest market trends, new regulations, and investment guides for UAE real estate.
            </p>
          </div>
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading latest articles...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">UAE Real Estate Blog & News</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest market trends, new regulations, and investment guides for UAE real estate.
            </p>
          </div>
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">Unable to load latest articles</p>
            <p className="text-gray-600">Please check back later</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">UAE Real Estate Blog & News</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest market trends, new regulations, and investment guides for UAE real estate.
          </p>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {posts.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.guid}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-none w-80"
              >
                <Card 
                  className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onTouchStart={handleCardTouch}
                >
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.thumbnail || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {Array.isArray(post.categories) ? post.categories[0] : 'Real Estate'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.pubDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-3">
                      {truncateText(extractTextFromHtml(post.description))}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                      onClick={() => openArticle(post)}
                    >
                      Read Article
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Article Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {currentPost && (
              <>
                <DialogHeader>
                  <div className="aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={currentPost.thumbnail || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                      alt={currentPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-left">
                    {currentPost.title}
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(currentPost.pubDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                      <Badge variant="secondary">
                        {Array.isArray(currentPost.categories) ? currentPost.categories[0] : 'Real Estate'}
                      </Badge>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentPost.content || currentPost.description }} />
                  
                  {/* Additional article information */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">About This Article</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Published:</strong> {formatDate(currentPost.pubDate)}
                      </div>
                      <div>
                        <strong>Category:</strong> {Array.isArray(currentPost.categories) ? currentPost.categories[0] : 'Real Estate'}
                      </div>
                      <div>
                        <strong>Source:</strong> UAE Real Estate News
                      </div>
                      <div>
                        <strong>Reading Time:</strong> ~5 minutes
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <strong>Key Topics:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(Array.isArray(currentPost.categories) ? currentPost.categories : ['Real Estate', 'Property Investment', 'UAE Market']).map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600">
                        This article provides insights into the UAE real estate market, covering current trends, 
                        investment opportunities, and regulatory updates that impact property buyers and investors.
                      </p>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Close
                    </Button>
                    <Button asChild>
                      <a href={currentPost.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Article
                      </a>
                    </Button>
                  </div>
                </DialogFooter>

                {/* Related Articles */}
                {getRelatedPosts(currentPost).length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getRelatedPosts(currentPost).map((relatedPost) => (
                        <Card 
                          key={relatedPost.guid}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => {
                            setCurrentPost(relatedPost);
                          }}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm line-clamp-2">
                              {relatedPost.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {truncateText(extractTextFromHtml(relatedPost.description), 100)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {formatDate(relatedPost.pubDate)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BlogAndNews;