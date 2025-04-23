import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "Desert Jewel Realty provided exceptional service in helping me find my dream home in Dubai Marina. Their knowledge of the market and attention to detail was impressive.",
    name: "James Mitchell",
    title: "Dubai Marina Homeowner",
    initials: "JM",
    rating: 5
  },
  {
    id: 2,
    text: "As an international investor, I needed a trustworthy partner in UAE. Desert Jewel Realty exceeded my expectations with their transparency and investment insights.",
    name: "Sarah Reynolds",
    title: "International Investor",
    initials: "SR",
    rating: 5
  },
  {
    id: 3,
    text: "Desert Jewel Realty's in-depth knowledge of off-plan projects helped me secure an outstanding investment opportunity in Downtown Dubai at pre-launch prices.",
    name: "Ahmed Khan",
    title: "Property Developer",
    initials: "AK",
    rating: 4.5
  }
];

const stats = [
  { id: 1, value: "1,500+", label: "Properties Sold" },
  { id: 2, value: "AED 3.2B+", label: "Transaction Value" },
  { id: 3, value: "98%", label: "Client Satisfaction" },
  { id: 4, value: "15+", label: "Years of Experience" }
];

const TestimonialsAndStats = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-montserrat font-semibold mb-2">Client Experiences</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it — hear what our clients have to say about their journey with Desert Jewel Realty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-8 relative hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-secondary text-6xl font-playfair absolute top-4 right-6 opacity-20">"</div>
              <p className="text-gray-600 mb-6 relative z-10">
                {testimonial.text}
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">{testimonial.initials}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-montserrat font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 text-primary">
                {renderStars(testimonial.rating)}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div 
          className="bg-dark-darker rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                className={`text-center p-10 ${
                  index < stats.length - 1 && (
                    index < stats.length - 1 ? 
                      'border-b md:border-b-0 md:border-r border-gray-700' : 
                      '')
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-4xl font-bold text-secondary mb-2">{stat.value}</div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsAndStats;
