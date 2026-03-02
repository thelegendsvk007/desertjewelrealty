        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] lg:hidden"
            >
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Filter Properties</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-6">
                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          searchParams.category === 'residential'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setSearchParams({...searchParams, category: 'residential'})}
                      >
                        Residential
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          searchParams.category === 'commercial'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setSearchParams({...searchParams, category: 'commercial'})}
                      >
                        Commercial
                      </button>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Property Type</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                      value={searchParams.propertyType}
                      onChange={(e) => setSearchParams({...searchParams, propertyType: e.target.value})}
                    >
                      <option value="">All Property Types</option>
                      {searchParams.category === 'residential' ? (
                        <>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="penthouse">Penthouse</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="studio">Studio</option>
                          <option value="duplex">Duplex</option>
                        </>
                      ) : (
                        <>
                          <option value="office">Office</option>
                          <option value="retail">Retail Space</option>
                          <option value="warehouse">Warehouse</option>
                          <option value="showroom">Showroom</option>
                          <option value="building">Full Building</option>
                          <option value="land">Commercial Land</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                      value={searchParams.city}
                      onChange={(e) => setSearchParams({...searchParams, city: e.target.value, locationId: ''})}
                    >
                      <option value="">All Cities</option>
                      <option value="dubai">Dubai</option>
                      <option value="abudhabi">Abu Dhabi</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="ajman">Ajman</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                      value={searchParams.budget}
                      onChange={(e) => setSearchParams({...searchParams, budget: e.target.value})}
                    >
                      <option value="">All Budgets</option>
                      <option value="1000000">Up to AED 1M</option>
                      <option value="3000000">AED 1M - 3M</option>
                      <option value="5000000">AED 3M - 5M</option>
                      <option value="10000000">AED 5M - 10M</option>
                      <option value="999999999">AED 10M+</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                      value={searchParams.bedrooms}
                      onChange={(e) => setSearchParams({...searchParams, bedrooms: e.target.value})}
                    >
                      <option value="">All Bedrooms</option>
                      <option value="studio">Studio</option>
                      <option value="1">1 Bedroom</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5">5+ Bedrooms</option>
                    </select>
                  </div>

                  {/* Property Status */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700"
                      value={searchParams.status}
                      onChange={(e) => setSearchParams({...searchParams, status: e.target.value})}
                    >
                      <option value="">All Status</option>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Off-Plan">Off-Plan</option>
                    </select>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                    onClick={() => {
                      handleSearch();
                      setShowMobileFilters(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full py-3"
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>