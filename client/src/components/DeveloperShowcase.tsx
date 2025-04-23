import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const DeveloperShowcase = () => {
  const { data: developers, isLoading, isError } = useQuery({
    queryKey: ['/api/developers/featured'],
  });

  // Repeat developers for infinite carousel effect
  const duplicatedDevelopers = developers ? [...developers, ...developers.slice(0, 3)] : [];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto mb-16 text-center">
        <h2 className="text-3xl font-montserrat font-semibold mb-2">Premier UAE Developers</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore prestigious projects from the UAE's leading property developers, curated by Desert Jewel Realty.
        </p>
      </div>
      
      <div className="relative overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-60 flex-none">
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-gray-500">
            Unable to load developers. Please try again later.
          </div>
        ) : (
          <div className="developer-carousel flex">
            {duplicatedDevelopers.map((developer, index) => (
              <div className="flex-none mx-5 w-60" key={`${developer.id}-${index}`}>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg p-6 h-48 flex flex-col items-center justify-center transform transition-transform hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={developer.logo} 
                    alt={`${developer.name} Logo`} 
                    className="h-12 mb-4 object-contain"
                  />
                  <h3 className="font-montserrat font-medium text-lg mb-1">{developer.name}</h3>
                  <p className="text-sm text-gray-500">{developer.projectCount}+ Premium Projects</p>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/developers">
          <a className="inline-flex items-center text-primary hover:text-teal-dark font-montserrat font-medium transition-colors duration-200">
            View All Developers <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default DeveloperShowcase;
