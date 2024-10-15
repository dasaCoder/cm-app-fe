export default function CheckoutSkeleton() {
    return (
      <div className="max-w-6xl mx-auto p-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-400 rounded w-1/3"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-400 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
              </div>
              <div className="h-10 bg-gray-400 rounded w-1/3"></div>
            </div>
  
            {/* Delivery */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-400 rounded w-1/4"></div>
                <div className="h-4 bg-gray-400 rounded w-16"></div>
              </div>
              <div className="h-10 bg-gray-400 rounded"></div>
            </div>
  
            {/* Payment */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-400 rounded w-1/4"></div>
                <div className="h-4 bg-gray-400 rounded w-16"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
  
            {/* Review */}
            <div className="h-6 bg-gray-400 rounded w-1/4"></div>
          </div>
  
          {/* Cart Summary */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-400 rounded w-1/2"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/4"></div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-400 rounded"></div>
              <div className="space-y-2 flex-grow">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    )
  }