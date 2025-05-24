import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatArea, parsePropertyImages } from '@/lib/utils';

const DeveloperDetail = () => {
  const params = useParams();
  const { id } = params;
  
  // Fetch developer details
  const { data: developer, isLoading: developerLoading, isError: developerError } = useQuery({
    queryKey: [`/api/developers/${id}`],
  });

  // Fetch developer properties
  const { data: properties, isLoading: propertiesLoading, isError: propertiesError } = useQuery({
    queryKey: [`/api/properties/byDeveloper/${id}`],
    enabled: !!id
  });

  const isLoading = developerLoading || propertiesLoading;
  const isError = developerError || propertiesError;

  if (developerLoading) {
    return (
      <div className="pt-16 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Skeleton className="h-40 w-40 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
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
          <a className="bg-primary hover:bg-teal-dark text-white px-6 py-2 rounded-md transition-colors duration-200">
            Back to Developers
          </a>
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
      className="pt-16 animated-bg"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/">
                  <a className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary">
                    <i className="fas fa-home mr-2"></i>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                  <Link href="/developers">
                    <a className="text-sm font-medium text-gray-500 hover:text-primary">Developers</a>
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-gray-400 mx-2 text-sm"></i>
                  <span className="text-sm font-medium text-gray-800">
                    {developer.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Developer Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-gray-100 rounded-xl p-4 flex items-center justify-center">
              <img 
                src={developer.logo} 
                alt={`${developer.name} Logo`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-montserrat font-bold mb-2">{developer.name}</h1>
              <p className="text-gray-500 mb-4">Established {developer.established} • {developer.projectCount}+ Projects</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                {developer.website && (
                  <a 
                    href={developer.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-teal-dark"
                  >
                    <i className="fas fa-globe mr-2"></i> Website
                  </a>
                )}
                {developer.contactEmail && (
                  <a 
                    href={`mailto:${developer.contactEmail}`}
                    className="inline-flex items-center text-primary hover:text-teal-dark"
                  >
                    <i className="fas fa-envelope mr-2"></i> Email
                  </a>
                )}
                {developer.contactPhone && (
                  <a 
                    href={`tel:${developer.contactPhone || '+971589532210'}`}
                    className="inline-flex items-center text-primary hover:text-teal-dark"
                  >
                    <i className="fas fa-phone-alt mr-2"></i> Call
                  </a>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {developer.featured && (
                  <Badge variant="premium">Premium Developer</Badge>
                )}
                <Badge variant="outline">Verified</Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Developer Content */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About Developer</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="gallery">Projects Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-2xl font-montserrat font-semibold mb-4">About {developer.name}</h2>
                <p className="text-gray-600 whitespace-pre-line">{developer.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-montserrat font-medium mb-4">Key Facts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Established</p>
                    <p className="font-medium">{developer.established}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Projects Completed</p>
                    <p className="font-medium">{developer.projectCount}+</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Headquarters</p>
                    <p className="font-medium">Dubai, UAE</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-montserrat font-medium mb-4">Why Choose {developer.name}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span className="text-gray-600">
                      Proven track record with {developer.projectCount}+ successful projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span className="text-gray-600">
                      Commitment to quality and innovative design principles
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span className="text-gray-600">
                      Strong reputation among investors and homeowners
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span className="text-gray-600">
                      Excellent after-sales service and property management
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="properties">
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Properties by {developer.name}</h2>
              
              {propertiesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-80 w-full rounded-xl" />
                  ))}
                </div>
              ) : propertiesError ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Failed to load properties. Please try again later.</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No properties found for this developer.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property: any) => {
                    const images = parsePropertyImages(property.images);
                    const featuredImage = images.length > 0 ? images[0] : '';
                    
                    return (
                      <motion.div 
                        key={property.id}
                        className="property-card bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative">
                          <img 
                            src={featuredImage} 
                            alt={property.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            {property.premium && (
                              <Badge variant="premium" className="mr-2">Premium</Badge>
                            )}
                            {property.exclusive && (
                              <Badge variant="exclusive" className="mr-2">Exclusive</Badge>
                            )}
                            {property.newLaunch && (
                              <Badge variant="new">New Launch</Badge>
                            )}
                          </div>
                          {/* Property overlay */}
                          <div className="property-overlay absolute inset-0 bg-dark-darker/40 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                            <Link href={`/properties/${property.id}`}>
                              <a className="bg-white text-foreground hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-md transition-colors duration-200">
                                View Property
                              </a>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-montserrat text-lg font-semibold mb-1 truncate">{property.title}</h3>
                          <p className="text-gray-500 text-sm flex items-center mb-2">
                            <i className="fas fa-map-marker-alt text-primary mr-2"></i> {property.address}
                          </p>
                          
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-secondary font-bold">{formatPrice(property.price)}</p>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{property.status}</span>
                          </div>
                          
                          <div className="flex justify-between text-gray-600 text-sm">
                            <div className="flex items-center">
                              <i className="fas fa-bed text-primary mr-1"></i>
                              <span>{property.beds} Beds</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-bath text-primary mr-1"></i>
                              <span>{property.baths} Baths</span>
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-ruler-combined text-primary mr-1"></i>
                              <span>{formatArea(property.area)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="gallery">
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Project Gallery</h2>
              
              {/* This would typically contain a gallery of developer projects,
                  but we don't have that data in our current schema */}
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-500 mb-4">Project gallery will be displayed here.</p>
                <p className="text-sm text-gray-400">Contact the developer for more project images.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Contact Developer */}
        <div className="bg-gray-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-6 text-center">Interested in {developer.name} Properties?</h2>
          <div className="max-w-lg mx-auto text-center">
            <p className="text-gray-600 mb-6">
              Our real estate consultants can help you find the perfect {developer.name} property that meets your requirements and investment goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <a className="bg-primary hover:bg-teal-dark text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center">
                  <i className="fas fa-envelope mr-2"></i> Contact Us
                </a>
              </Link>
              <a href={`tel:${developer.contactPhone || '+971589532210'}`} className="bg-white border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center">
                <i className="fas fa-phone-alt mr-2"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperDetail;
