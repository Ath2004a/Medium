export const Skeleton = function()
{
    return(
        <div>
            <div className="flex justify-center w-full">
                    <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg space-y-6 animate-pulse">
                        {/* Avatar */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                            <div className="w-32 h-4 bg-gray-300 rounded"></div>
                        </div>
                        
                        {/* Post Date */}
                        <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>

                        {/* Title */}
                        <div className="w-3/4 h-8 bg-gray-300 rounded mt-4"></div>

                        {/* Content Preview */}
                        <div className="w-full h-6 bg-gray-300 rounded mt-2"></div>
                        <div className="w-5/6 h-6 bg-gray-300 rounded mt-2"></div>

                        {/* Time ago */}
                        <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
            </div>

        </div>
    )
}