export default function OrderConfirmationSkeleton() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
        {/* Thank you message */}
        <div className="space-y-2 mb-8">
          <div className="h-8 bg-gray-400 rounded w-64"></div>
          <div className="h-6 bg-gray-400 rounded w-96"></div>
          <div className="h-4 bg-gray-400 rounded w-80"></div>
          <div className="h-4 bg-gray-400 rounded w-72"></div>
          <div className="h-4 bg-gray-400 rounded w-40"></div>
        </div>
  
        {/* Summary */}
        <div className="space-y-4 mb-8">
          <div className="h-6 bg-gray-400 rounded w-24"></div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-400 rounded-md"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-400 rounded w-48"></div>
              <div className="h-4 bg-gray-400 rounded w-32"></div>
              <div className="h-4 bg-gray-400 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-400 rounded w-24"></div>
                <div className="h-4 bg-gray-400 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Delivery */}
        <div className="space-y-4 mb-8">
          <div className="h-6 bg-gray-400 rounded w-24"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded w-32"></div>
              <div className="h-4 bg-gray-400 rounded w-40"></div>
              <div className="h-4 bg-gray-400 rounded w-36"></div>
              <div className="h-4 bg-gray-400 rounded w-24"></div>
              <div className="h-4 bg-gray-400 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded w-24"></div>
              <div className="h-4 bg-gray-400 rounded w-40"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded w-24"></div>
              <div className="h-4 bg-gray-400 rounded w-48"></div>
            </div>
          </div>
        </div>
  
        {/* Payment */}
        <div className="space-y-4 mb-8">
          <div className="h-6 bg-gray-400 rounded w-24"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded w-32"></div>
              <div className="h-4 bg-gray-400 rounded w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded w-32"></div>
              <div className="h-4 bg-gray-400 rounded w-48"></div>
            </div>
          </div>
        </div>
  
        {/* Need help */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-400 rounded w-24"></div>
          <div className="h-4 bg-gray-400 rounded w-16"></div>
          <div className="h-4 bg-gray-400 rounded w-40"></div>
        </div>
      </div>
    )
  }