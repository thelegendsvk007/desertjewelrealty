import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import DeveloperShowcase from '@/components/DeveloperShowcase';
import FeaturedProperties from '@/components/FeaturedProperties';
import InteractiveMap from '@/components/InteractiveMap';
import FeaturedDevelopment from '@/components/FeaturedDevelopment';
import TestimonialsAndStats from '@/components/TestimonialsAndStats';
import CallToAction from '@/components/CallToAction';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <DeveloperShowcase />
      <FeaturedProperties />
      <InteractiveMap />
      <FeaturedDevelopment />
      <TestimonialsAndStats />
      <CallToAction />
    </motion.div>
  );
};

export default Home;
