import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDeveloperById } from '@/data/developersData';
import { getDeveloperProperties } from '@/data/properties';
import { useMemo } from 'react';

const DeveloperDetail = () => {
  const params = useParams();
  const { id } = params;
  
  // Get developer and properties from frontend data
  const developer = useMemo(() => {
    return getDeveloperById(parseInt(id || '0'));
  }, [id]);

  const properties = useMemo(() => {
    if (!developer) return [];
    return getDeveloperProperties(developer.id);
  }, [developer]);

  const isLoading = false;
  const isError = !developer;

  if (isLoading) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="h-40 w-40 bg-gray-200 rounded-xl animate-pulse" />
            <div className="flex-1">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-60 bg-gray-200 rounded w-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !developer) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Developer Not Found</h2>
        <p className="mb-8">The developer you're looking for doesn't exist or has been removed.</p>
        <Link href="/developers">
          <motion.button 
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Developers
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 container mx-auto px-4 py-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/developers">
            <motion.button 
              className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
              whileHover={{ x: -5 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Developers
            </motion.button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={developer.logo || "https://via.placeholder.com/80?text=Logo"}
                  alt={`${developer.name} Logo`}
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-sm"
                />
                <h1 className="text-4xl md:text-5xl font-montserrat font-bold">{developer.name}</h1>
              </div>
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Established {developer.established}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{developer.projectCount}+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Company Description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-montserrat font-medium mb-4">About {developer.name}</h3>
                  <div className="space-y-4">
                    {developer.overviewParagraphs && developer.overviewParagraphs.length > 0 ? (
                      developer.overviewParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {developer.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="font-medium text-lg">{developer.established}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Projects</p>
                    <p className="font-medium text-lg">{developer.projectCount}+</p>
                  </div>
                </div>
              </div>
              
              {/* Key Information */}
              <div className="space-y-6">
                {developer.keyProjects && (
                  <div>
                    <h3 className="text-xl font-montserrat font-medium mb-4">Key Projects</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {developer.keyProjects.map((project: string, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-sm font-medium text-gray-700">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {developer.uniqueSellingPoints && (
                  <div>
                    <h3 className="text-xl font-montserrat font-medium mb-4">Unique Selling Points</h3>
                    <ul className="space-y-3">
                      {developer.uniqueSellingPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {developer.marketPosition && (
                  <div>
                    <h3 className="text-xl font-montserrat font-medium mb-4">Market Position</h3>
                    <p className="text-gray-600 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                      {developer.marketPosition}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <h2 className="text-2xl font-montserrat font-semibold mb-6">Properties by {developer.name}</h2>
            
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {property.images && property.images[0] ? (
                        <img 
                          src={property.images[0]} 
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-white px-2 py-1 text-xs rounded-full">
                          {property.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Price:</span>
                          <span className="font-medium">AED {property.price.toLocaleString()}</span>
                        </div>
                        {property.beds && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Bedrooms:</span>
                            <span>{property.beds}</span>
                          </div>
                        )}
                        {property.area && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Area:</span>
                            <span>{property.area} sq ft</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        <p>{property.address}</p>
                      </div>
                      
                      {property.amenities && property.amenities.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Amenities:</p>
                          <div className="flex flex-wrap gap-1">
                            {property.amenities.slice(0, 3).map((amenity, index) => (
                              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">
                                {amenity}
                              </span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="text-xs text-gray-500">+{property.amenities.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-500 mb-2">No properties available</p>
                <p className="text-sm text-gray-400">Properties from this developer will appear here when available.</p>
              </div>
            )}
          </TabsContent>
          

        </Tabs>
      </div>
    </motion.div>
  );
};

export default DeveloperDetail;