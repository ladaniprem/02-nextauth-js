

 export default function page({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounce">
            Profile Page
            </h1>
            <h2 className="text-2xl text-blue-600 mt-4 animate-pulse hover:text-blue-800 transition-colors duration-300">
                                        {params.id}
                                </h2>
    </div>
  )
}
