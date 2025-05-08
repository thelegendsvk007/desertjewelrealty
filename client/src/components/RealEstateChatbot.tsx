import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, X, Minimize2, Maximize2, Home, Building, Map, Calendar, Calculator, BrainCircuit } from 'lucide-react';

// Sample conversation objects for chatbot
const initialMessages: Message[] = [
  {
    id: 1,
    role: "agent",
    content: "Hello! I'm Safiyan, your Desert Jewel Realty virtual assistant. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    role: "agent",
    content: "I can help you with property searches, investment advice, Golden Visa eligibility, or connect you with a real estate advisor. Our new AI-powered Area Advisor can also help you compare neighborhoods in Dubai!",
    timestamp: new Date().toISOString(),
  }
];

// Sample responses based on keywords
const responsePatterns = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    responses: [
      "Hello! How can I help you with your real estate needs today?",
      "Hi there! Looking for a property in Dubai? I can help you find the perfect match."
    ]
  },
  {
    keywords: ["buy", "purchase", "invest"],
    responses: [
      "Great time to buy property in Dubai! What type of property are you looking for? Apartment, villa, or commercial space?",
      "Dubai offers excellent investment opportunities. What's your budget range for the property you're looking to purchase?"
    ]
  },
  {
    keywords: ["golden visa", "residency", "visa"],
    responses: [
      "The UAE Golden Visa requires a minimum property investment of AED 2 million. Would you like me to explain the full benefits and requirements?",
      "Properties worth AED 2 million or more qualify for the Golden Visa program. We have many eligible properties in our listings."
    ]
  },
  {
    keywords: ["palm jumeirah", "palm"],
    responses: [
      "Palm Jumeirah is one of Dubai's most prestigious addresses. Properties there range from AED 2 million to over AED 100 million. What's your budget range?",
      "Palm Jumeirah offers luxurious beachfront living with stunning views. Are you interested in apartments or villas on the Palm?"
    ]
  },
  {
    keywords: ["downtown", "burj khalifa"],
    responses: [
      "Downtown Dubai is home to the iconic Burj Khalifa and Dubai Mall. It's a vibrant area with premium apartments. What kind of property are you looking for there?",
      "Downtown Dubai offers luxury urban living. Prices typically start from AED 1.5 million for apartments. What's your budget range?"
    ]
  },
  {
    keywords: ["mortgage", "finance", "loan"],
    responses: [
      "UAE banks typically offer mortgages up to 80% for residents and 65% for non-residents. Would you like me to connect you with a mortgage advisor?",
      "We work with several banks that offer competitive mortgage rates. The current rates start from around 3.5% depending on your profile. Would you like more information?"
    ]
  },
  {
    keywords: ["rent", "rental", "lease"],
    responses: [
      "Dubai offers a wide range of rental properties. What area are you interested in and what's your monthly budget?",
      "Rental yields in Dubai typically range from 5-8% depending on the location. Are you looking to rent a property or invest in a rental property?"
    ]
  },
  {
    keywords: ["price", "cost", "expensive"],
    responses: [
      "Property prices in Dubai vary widely by location. Premium areas like Palm Jumeirah and Downtown start from AED 1.5-2 million for apartments, while more affordable areas like JVC start from AED 500,000.",
      "The price per square foot ranges from AED 800 in affordable areas to AED 3,000+ in luxury developments. What's your budget and preferred location?"
    ]
  },
  {
    keywords: ["school", "education", "children"],
    responses: [
      "Dubai has excellent international schools near residential communities. Areas like Arabian Ranches, Emirates Hills, and Jumeirah Village Circle are popular with families for their proximity to good schools.",
      "If you're looking for family-friendly communities with good schools, I'd recommend Arabian Ranches, Dubai Hills, or Jumeirah Village Triangle. Would you like information about any of these areas?"
    ]
  }
];

// Default fallback responses
const fallbackResponses = [
  "I'd be happy to help with that. Could you provide a bit more information about what you're looking for?",
  "That's an interesting question. Would you like me to connect you with one of our real estate advisors who specializes in this area?",
  "I understand you're interested in Dubai real estate. Could you tell me more about your specific requirements so I can better assist you?",
  "I'm here to help with your property search. Are you looking to buy or rent in a specific area of Dubai?",
  "Let me help you find the perfect property. What features are most important to you in your next home?"
];

// Suggestions for quick replies
const suggestedQuestions = [
  { text: "How's the real estate market in Dubai right now?", id: "market" },
  { text: "What areas offer the best investment returns?", id: "investment" },
  { text: "Do I qualify for the Golden Visa program?", id: "goldenvisa" },
  { text: "Can foreigners buy property in Dubai?", id: "foreigners" },
  { text: "What are the buying costs and fees?", id: "fees" },
  { text: "Connect me with a real estate advisor", id: "advisor" },
  { text: "Compare Dubai Marina and Downtown Dubai", id: "compare-areas" },
  { text: "Which area is best for families?", id: "family-areas" }
];

// Area profiles for the Area Advisor
const areaProfiles = {
  "dubai-marina": {
    name: "Dubai Marina",
    summary: "Dubai Marina is a waterfront community known for its high-rise luxury apartments, vibrant nightlife, and extensive dining options. It offers stunning views of the marina and is popular with expats and young professionals.",
    pros: [
      "Waterfront lifestyle with stunning views",
      "Excellent connectivity with tram and metro stations",
      "Walkable community with beaches, restaurants, and shopping",
      "High rental yields (6-7% average)",
      "Active lifestyle with Marina Walk and beach access"
    ],
    cons: [
      "Traffic congestion during peak hours",
      "Higher service charges compared to newer areas",
      "Some buildings are starting to show age",
      "Can feel crowded during tourist season"
    ],
    demographics: "Primarily expat community with a high percentage of European, American, and Asian residents. Popular with young professionals, couples, and small families.",
    investment: "Strong rental market with consistently high occupancy rates. Resale values remain strong with modest appreciation (3-5% annually). Studio and 1-bedroom apartments provide the highest yields.",
    amenities: "Dubai Marina Mall, The Beach at JBR, Dubai Marina Yacht Club, Bluewaters Island, Multiple gyms, pools, and fitness facilities"
  },
  "downtown-dubai": {
    name: "Downtown Dubai",
    summary: "Downtown Dubai is the city's central district featuring the Burj Khalifa, Dubai Mall, and Dubai Fountain. It offers premium living with a mix of apartments and luxury hotels in an urban setting.",
    pros: [
      "Central location with iconic landmarks",
      "Premier shopping, dining, and entertainment",
      "High prestige and status address",
      "Modern infrastructure and amenities",
      "Good capital appreciation potential"
    ],
    cons: [
      "Premium pricing with higher cost per sq.ft",
      "Busy tourist area with less privacy",
      "Traffic congestion, especially around Dubai Mall",
      "Higher cost of living generally"
    ],
    demographics: "Mix of wealthy professionals, business executives, and high-net-worth investors. Popular with both residents and investors seeking premium properties.",
    investment: "Historically strong capital appreciation. Rental yields slightly lower than Marina (5-6%) but with better long-term value growth. Premium for Burj Khalifa view units.",
    amenities: "Dubai Mall, Dubai Opera, Burj Park, Souk Al Bahar, Multiple high-end restaurants and cafes, Dubai Fountain, Burj Khalifa"
  },
  "palm-jumeirah": {
    name: "Palm Jumeirah",
    summary: "Palm Jumeirah is an iconic man-made island shaped like a palm tree, featuring luxury villas, high-end apartments, and 5-star hotels. It offers beachfront living with exclusive amenities.",
    pros: [
      "Prestigious address with high exclusivity",
      "Private beaches and waterfront living",
      "Larger property sizes compared to other areas",
      "Resort-style living with luxury amenities",
      "Strong capital appreciation history"
    ],
    cons: [
      "Premium pricing with highest cost per sq.ft",
      "Limited public transportation options",
      "Single access point can create traffic bottlenecks",
      "Higher maintenance costs for beachfront properties"
    ],
    demographics: "Predominantly high-net-worth individuals, celebrities, and wealthy families. Mix of permanent residents and vacation homeowners.",
    investment: "Strong capital appreciation potential, particularly for signature projects. Rental yields average 4-5%, with higher returns for short-term holiday rentals.",
    amenities: "Nakheel Mall, Atlantis The Palm, The Pointe, Club Vista Mare, Numerous beach clubs and 5-star hotels, Aquaventure Waterpark"
  },
  "dubai-hills": {
    name: "Dubai Hills Estate",
    summary: "Dubai Hills Estate is a newer family-friendly master community with a mix of villas, townhouses, and apartments centered around an 18-hole championship golf course.",
    pros: [
      "Newer development with modern infrastructure",
      "More spacious properties with greenery",
      "Family-oriented with excellent schools nearby",
      "Quieter lifestyle away from tourist areas",
      "Good potential for capital appreciation"
    ],
    cons: [
      "More dependent on private transportation",
      "Further from beaches and waterfront",
      "Still developing with some amenities under construction",
      "Premium pricing for villa properties"
    ],
    demographics: "Predominantly families with children, with a mix of expats and UAE nationals. Popular with upgraders moving from apartment living to villas and townhouses.",
    investment: "Strong capital appreciation potential as area matures. Rental yields around 5-6% with good occupancy rates for family properties.",
    amenities: "Dubai Hills Mall, Dubai Hills Golf Club, Dubai Hills Park, King's College Hospital, GEMS International School"
  },
  "jumeirah-village-circle": {
    name: "Jumeirah Village Circle (JVC)",
    summary: "JVC is an affordable community offering a mix of apartments, townhouses, and villas. It's popular with families and professionals seeking value for money in a central location.",
    pros: [
      "Affordable pricing with good value for money",
      "Central location with good highway access",
      "Family-friendly with parks and community spaces",
      "Higher rental yields compared to premium areas",
      "Mix of property types for different budgets"
    ],
    cons: [
      "Still developing with ongoing construction",
      "Limited public transportation options",
      "Fewer amenities compared to established areas",
      "Lower capital appreciation compared to premium areas"
    ],
    demographics: "Diverse mix of young professionals, small families, and first-time buyers. Popular with middle-income expatriates seeking affordability.",
    investment: "Highest rental yields in Dubai (7-9%) with good occupancy rates. Moderate capital appreciation potential as area matures.",
    amenities: "Circle Mall, JVC Community Park, Numerous retail plazas and supermarkets, Schools and nurseries"
  }
};

interface Message {
  id: number;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

interface RealEstateChatbotProps {
  isInitiallyOpen?: boolean;
  onClose?: () => void;
}

const RealEstateChatbot: React.FC<RealEstateChatbotProps> = ({ 
  isInitiallyOpen = false,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const toggleChatbox = () => {
    if (isOpen && onClose) {
      onClose();
    }
    setIsOpen(!isOpen);
    
    // Focus input when opening
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate chatbot "thinking" delay
    setTimeout(() => {
      const botReply = getResponse(inputValue);
      const agentMessage: Message = {
        id: messages.length + 2,
        role: "agent",
        content: botReply,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for more natural feel
  };
  
  const getResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    // ChatGPT-Powered Area Advisor functionality
    if (normalizedQuery === "compare dubai marina and downtown dubai") {
      const marina = areaProfiles["dubai-marina"];
      const downtown = areaProfiles["downtown-dubai"];
      
      return `📊 **Area Comparison: Dubai Marina vs Downtown Dubai**

**Dubai Marina Summary:**
${marina.summary}

**Downtown Dubai Summary:**
${downtown.summary}

**Price Comparison:**
• Dubai Marina: AED 1,300-1,800 per sq.ft (apartments)
• Downtown Dubai: AED 1,800-2,500 per sq.ft (apartments)

**Lifestyle:**
• Dubai Marina offers a waterfront lifestyle with a focus on outdoor activities, marina views, and beach access.
• Downtown Dubai offers an urban city-center lifestyle with iconic landmarks, shopping, and cultural attractions.

**Investment Potential:**
• Dubai Marina: ${marina.investment}
• Downtown Dubai: ${downtown.investment}

**Best For:**
• Dubai Marina: Young professionals, couples, those seeking active waterfront lifestyle
• Downtown Dubai: Luxury seekers, professionals working in business districts, shopping enthusiasts

Would you like more specific information about either area?`;
    } 
    else if (normalizedQuery === "which area is best for families?") {
      return `🏡 **Best Areas for Families in Dubai**

1. **Dubai Hills Estate**
   ${areaProfiles["dubai-hills"].summary}
   • Premium schools nearby: GEMS International School, Dubai International Academy
   • Extensive parks and green spaces
   • Family-sized villas and townhouses
   • Safe, gated communities

2. **Arabian Ranches**
   • Established villa community with a suburban feel
   • Excellent schools including JESS Arabian Ranches
   • Family-friendly amenities including parks, pools, and community centers
   • Strong sense of community with many long-term residents

3. **Jumeirah Village Circle (JVC)**
   ${areaProfiles["jumeirah-village-circle"].summary}
   • More affordable option for families
   • Growing number of schools and nurseries
   • Mix of apartments, townhouses and villas
   • Family-oriented community with numerous parks

4. **Emirates Hills**
   • Ultra-luxury villa community
   • Home to some of Dubai's top schools including Emirates International School
   • Prestigious gated community with 24/7 security
   • Exclusive lifestyle with golf course views

Would you like more specific information about any of these family-friendly areas?`;
    }
    // Look for area comparison questions
    else if (normalizedQuery.includes("compare") && normalizedQuery.includes("vs")) {
      return "I can help you compare different areas in Dubai. Our Area Advisor feature can provide detailed comparisons of neighborhoods based on lifestyle, investment potential, amenities, and more. Please try our pre-set comparisons or ask about specific areas you're interested in.";
    }
    else if (normalizedQuery.includes("area") && (normalizedQuery.includes("family") || normalizedQuery.includes("kid") || normalizedQuery.includes("children") || normalizedQuery.includes("school"))) {
      return "When looking for family-friendly areas in Dubai, I recommend considering Dubai Hills Estate, Arabian Ranches, and Jumeirah Village Circle. These areas offer good schools, parks, family amenities, and have a mix of villas and townhouses ideal for families. Would you like more specific details about these areas?";
    }
    
    // Check for keyword matches
    for (const pattern of responsePatterns) {
      for (const keyword of pattern.keywords) {
        if (normalizedQuery.includes(keyword)) {
          return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        }
      }
    }
    
    // Handle suggested question clicks specially
    if (normalizedQuery === "how's the real estate market in dubai right now?") {
      return "The Dubai real estate market is experiencing strong growth in 2025, with property prices up 12% year-over-year. Premium areas like Palm Jumeirah and Downtown continue to see high demand, while emerging areas like Dubai South are showing excellent potential for capital appreciation.";
    } else if (normalizedQuery === "what areas offer the best investment returns?") {
      return "Currently, areas with the highest rental yields include JVC (8-9%), Dubai South (7-8%), and Business Bay (6-7%). For capital appreciation, Dubai Hills, Dubai Harbour, and Emaar Beachfront have shown the strongest performance in the past year. Would you like more specific information about any of these areas?";
    } else if (normalizedQuery === "do i qualify for the golden visa program?") {
      return "To qualify for the Golden Visa through real estate investment, you need to purchase a property worth at least AED 2 million. The property can be off-plan, but it must be purchased directly from an approved developer. Would you like to see our Golden Visa eligible properties?";
    } else if (normalizedQuery === "can foreigners buy property in dubai?") {
      return "Yes, foreigners (including non-residents) can buy property in designated freehold areas in Dubai. These include popular areas like Dubai Marina, Downtown Dubai, Palm Jumeirah, and many others. You'll get full ownership rights and the property comes with renewable residence visas under certain conditions.";
    } else if (normalizedQuery === "what are the buying costs and fees?") {
      return "The main costs when buying property in Dubai are: 4% Dubai Land Department transfer fee, 2% real estate agency commission, AED 2,000-4,000 registration trustee fee, and AED 500-5,000 for the No Objection Certificate (NOC). For mortgages, there's an additional 0.25% mortgage registration fee. In total, budget around 7-8% of the property value for fees.";
    } else if (normalizedQuery === "connect me with a real estate advisor") {
      return "I'd be happy to connect you with one of our experienced real estate advisors. Could you please provide your name, contact number or email, and the best time to reach you? Alternatively, you can call us directly at +971 4 123 4567.";
    }
    
    // Return random fallback if no match
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };
  
  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };
  
  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button - only show when not opened by parent component */}
      {!isOpen && !isInitiallyOpen && (
        <Button 
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
          onClick={toggleChatbox}
        >
          <Home className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chatbox */}
      {(isOpen || isInitiallyOpen) && (
        <Card 
          className={`fixed ${isExpanded ? 'top-4 right-4 left-4 bottom-4 h-auto' : 'bottom-6 right-6 w-80 h-[500px]'} shadow-lg flex flex-col z-50 transition-all duration-200`}
        >
          <CardHeader className="p-4 flex flex-row items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/path/to/agent-avatar.jpg" />
                <AvatarFallback className="bg-primary-foreground text-primary">DJ</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base flex items-center gap-1">
                  Desert Jewel Assistant
                  <BrainCircuit className="h-3.5 w-3.5 text-primary-foreground/70" />
                </CardTitle>
                <CardDescription className="text-primary-foreground/70 text-xs">
                  AI-Powered Real Estate Expert
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={toggleExpand}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={toggleChatbox}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4" style={{ height: 'calc(100% - 140px)' }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
          
          {!isTyping && messages.length <= 5 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {suggestedQuestions.slice(0, 3).map((question) => (
                  <Badge 
                    key={question.id}
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => handleSuggestionClick(question.text)}
                  >
                    {question.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <CardFooter className="p-3 pt-2 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="h-10 w-10 p-0"
                disabled={!inputValue.trim() || isTyping}
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default RealEstateChatbot;