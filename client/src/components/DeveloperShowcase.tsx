import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface DeveloperCardProps {
  name: string;
  projectCount: string | number;
  logo: string;
  id: number | string;
}

interface Developer {
  id: number;
  name: string;
  projectCount: string | number;
  logo: string;
  [key: string]: any;
}

const DeveloperCard = ({ name, projectCount, logo, id }: DeveloperCardProps) => {
  return (
    <Link href={`/developers/${id}`}>
      <a className="block bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-4 text-center group">
        <div className="w-full h-24 flex items-center justify-center mb-4">
          <img 
            src={logo || "https://via.placeholder.com/150?text=Logo"}
            alt={`${name} Logo`}
            className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500">{projectCount}+ Premium Projects</p>
      </a>
    </Link>
  );
};

const DeveloperShowcase = () => {
  // Sample data based on the UAE's most prominent developers
  const developerData: Developer[] = [
    {
      id: 1,
      name: "Nakheel",
      projectCount: "25+",
      logo: "https://logowik.com/content/uploads/images/nakheel-properties5583.jpg"
    },
    {
      id: 2,
      name: "Emaar Properties",
      projectCount: "42+",
      logo: "https://logowik.com/content/uploads/images/emaar-properties7403.jpg"
    },
    {
      id: 3,
      name: "Damac Properties",
      projectCount: "35+",
      logo: "https://logowik.com/content/uploads/images/damac-properties1402.jpg"
    },
    {
      id: 4,
      name: "Nakheel",
      projectCount: "25+",
      logo: "https://logowik.com/content/uploads/images/nakheel-properties5583.jpg"
    }
  ];

  const { data: developers, isLoading, isError } = useQuery<Developer[]>({
    queryKey: ['/api/developers/featured'],
  });

  // Use our sample data if API fails, otherwise use API data
  const displayDevelopers = isLoading || isError ? developerData : (developers || []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Premier UAE Developers</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore prestigious projects from the UAE's leading property developers, curated by Desert Jewel Realty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))
          ) : (
            displayDevelopers.map((developer: Developer, index: number) => (
              <DeveloperCard 
                key={`${developer.id || index}`}
                id={developer.id || index+1}
                name={developer.name}
                projectCount={developer.projectCount || "25+"}
                logo={developer.logo}
              />
            ))
          )}
        </div>

        <div className="text-center">
          <Link href="/developers">
            <a className="inline-flex items-center text-primary hover:text-teal-600 font-medium transition-colors duration-200">
              View All Developers <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase;
