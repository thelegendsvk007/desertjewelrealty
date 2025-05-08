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
import { Loader2, Send, X, Minimize2, Maximize2, Home, Building, Map, Calendar, Calculator } from 'lucide-react';

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
    content: "I can help you with property searches, investment advice, Golden Visa eligibility, or connect you with a real estate advisor.",
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
  { text: "Connect me with a real estate advisor", id: "advisor" }
];

interface Message {
  id: number;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

interface RealEstateChatbotProps {
  isInitiallyOpen?: boolean;
}

const RealEstateChatbot: React.FC<RealEstateChatbotProps> = ({ isInitiallyOpen = false }) => {
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
      {/* Chat button */}
      {!isOpen && (
        <Button 
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg"
          onClick={toggleChatbox}
        >
          <Home className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chatbox */}
      {isOpen && (
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
                <CardTitle className="text-base">Desert Jewel Assistant</CardTitle>
                <CardDescription className="text-primary-foreground/70 text-xs">
                  Real Estate Expert
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