export default function ItemPageSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-4 flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
        </div>
  
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Product image skeleton */}
          <div className="md:w-1/2 mb-4 md:mb-0">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
  
          {/* Product details skeleton */}
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-12 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
  
        {/* Suggested items skeleton */}
        <div className="mt-12">
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }