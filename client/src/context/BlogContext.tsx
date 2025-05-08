import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "2025 UAE Real Estate Market Outlook",
    excerpt: "Insights into market trends, hotspots, and investment opportunities in the UAE property market.",
    content: `
      <h2>2025 UAE Real Estate Market Outlook</h2>
      
      <p>The UAE real estate market continues to show remarkable resilience and growth in 2025, with several key trends emerging that shape investment opportunities across the emirates.</p>
      
      <h3>Dubai's Continued Dominance</h3>
      
      <p>Dubai remains the epicenter of real estate activity in the region, with premium developments in areas like Palm Jumeirah, Dubai Hills, and Dubai Marina commanding the highest demand. The introduction of new visa regulations has further stimulated foreign investment, particularly in the luxury segment.</p>
      
      <h3>Abu Dhabi's Steady Growth</h3>
      
      <p>Abu Dhabi's real estate market has seen measured but consistent growth, with Yas Island and Saadiyat Island developments attracting significant interest from both local and international investors seeking long-term value appreciation.</p>
      
      <h3>Emerging Opportunities in Northern Emirates</h3>
      
      <p>Sharjah, Ras Al Khaimah, and Ajman are increasingly being viewed as attractive investment alternatives, offering competitive pricing and growing infrastructure that appeals to residents seeking value outside the main hubs.</p>
      
      <h3>Technology Integration</h3>
      
      <p>Smart home technology and sustainable building practices have become standard features rather than luxury additions, with buyers increasingly prioritizing properties that offer advanced technological integration and energy efficiency.</p>
      
      <h3>Investment Outlook</h3>
      
      <p>For investors, the outlook remains positive with rental yields averaging 5-7% across prime areas, though careful selection based on location, developer reputation, and future infrastructure plans remains crucial for maximizing returns.</p>
    `,
    category: "Market Trends",
    date: "May 2, 2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "New Regulations for Foreign Property Investors",
    excerpt: "Understanding the latest regulatory changes affecting non-resident property buyers in the UAE.",
    content: `
      <h2>New Regulations for Foreign Property Investors</h2>
      
      <p>The UAE government has introduced several significant regulatory changes in 2025 that impact foreign property investors, creating both new opportunities and considerations for international buyers.</p>
      
      <h3>Extended Residency Options</h3>
      
      <p>The Golden Visa program has been expanded to include more categories of property investors, with the minimum investment threshold adjusted to account for market evolution. Investors purchasing properties worth AED 2 million or more now qualify for 10-year residency visas with simplified renewal processes.</p>
      
      <h3>Tax Implications</h3>
      
      <p>While the UAE maintains its status as a tax-friendly jurisdiction with no property tax or income tax, new documentation requirements ensure compliance with international tax reporting standards, particularly for investors from countries participating in global tax information exchange agreements.</p>
      
      <h3>Foreign Ownership Expansion</h3>
      
      <p>The designated areas where foreigners can purchase property with freehold ownership rights have been expanded in several emirates, opening new geographic opportunities for international investors beyond the previously established zones.</p>
      
      <h3>Mortgage Regulations</h3>
      
      <p>Banking regulations for non-resident borrowers have been updated, with loan-to-value ratios and eligibility criteria modified to balance market accessibility with financial stability. Foreign investors can now access more competitive financing options from UAE banks with streamlined approval processes.</p>
      
      <h3>Registration Procedures</h3>
      
      <p>Digital transformation of property registration has simplified the purchase process, with new blockchain-based systems reducing processing times and enhancing transparency for all transactions. Remote completion of purchases is now possible for international buyers, eliminating the need for physical presence in many cases.</p>
    `,
    category: "Regulations",
    date: "April 28, 2025",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Guide to Off-Plan Investment in Dubai",
    excerpt: "A comprehensive guide to investing in off-plan properties and maximizing returns.",
    content: `
      <h2>Guide to Off-Plan Investment in Dubai</h2>
      
      <p>Off-plan property investment continues to be a popular strategy in Dubai's real estate market, offering potentially higher returns but requiring careful consideration of various factors.</p>
      
      <h3>Developer Due Diligence</h3>
      
      <p>The reputation and track record of the developer remains the most critical factor when considering off-plan investments. Established developers with proven delivery records minimize completion risk, though newer developers may offer more attractive pricing and payment plans to establish market presence.</p>
      
      <h3>Payment Plan Structures</h3>
      
      <p>The market has evolved to offer increasingly flexible payment plans, with some developers now offering plans extending beyond handover. These post-handover payment plans can significantly reduce upfront capital requirements and improve cash flow management for investors.</p>
      
      <h3>Location Analysis</h3>
      
      <p>While established locations offer stability, emerging areas with planned infrastructure improvements often provide better value appreciation potential. Investing ahead of infrastructure completion can maximize returns as areas mature and services become operational.</p>
      
      <h3>Legal Protections</h3>
      
      <p>Dubai's escrow account regulations provide significant protection for off-plan buyers, with developer payments linked to construction milestones verified by independent authorities. Additional buyer protections have been implemented to address potential project delays or cancellations.</p>
      
      <h3>Exit Strategies</h3>
      
      <p>Investors should consider multiple exit strategies when purchasing off-plan properties. Options include selling prior to completion to capture early appreciation, holding for rental income after completion, or selling after a short holding period once the project and area have matured.</p>
    `,
    category: "Investment Guide",
    date: "April 15, 2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    readTime: "7 min read"
  }
];

interface BlogContextType {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  setCurrentPost: (post: BlogPost | null) => void;
  getRelatedPosts: (post: BlogPost, count?: number) => BlogPost[];
}

const BlogContext = createContext<BlogContextType>({
  posts: [],
  currentPost: null,
  setCurrentPost: () => {},
  getRelatedPosts: () => [],
});

export const BlogProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [posts] = useState<BlogPost[]>(sampleBlogPosts);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const getRelatedPosts = (post: BlogPost, count: number = 2): BlogPost[] => {
    // Filter out the current post and get posts in the same category
    const sameCategoryPosts = posts.filter(p => 
      p.id !== post.id && p.category === post.category
    );
    
    // If we have enough posts in the same category, return them
    if (sameCategoryPosts.length >= count) {
      return sameCategoryPosts.slice(0, count);
    }
    
    // Otherwise, add other posts to fill the count
    const otherPosts = posts.filter(p => 
      p.id !== post.id && p.category !== post.category
    );
    
    return [
      ...sameCategoryPosts,
      ...otherPosts.slice(0, count - sameCategoryPosts.length)
    ];
  };

  return (
    <BlogContext.Provider value={{ posts, currentPost, setCurrentPost, getRelatedPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);