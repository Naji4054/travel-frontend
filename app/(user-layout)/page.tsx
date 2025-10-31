import Link from "next/link"
import { Button } from "@/components/ui/button"
import { categoryImages } from "@/components/categoryImages";

interface PackageInfo {
  _id: string;
  title : string
  description : string,
  duration: string,
  type: string,
  category: {
    _id: string;
    title: string
  },
  image:{
    url: string,
    altText: string
    isCover: string
  }[],
  status: string,
  price: string,
  location: {
    _id: string
    title: string
  },
}

const PopularCard  = ({ data } : {data: PackageInfo}) => {
  const coverImage = data.image.find(img => img.isCover);


  return (
    <div className="group flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
  <div className="relative overflow-hidden h-64 bg-gray-200 dark:bg-gray-700">
    <img 
      src={`http://localhost:3000/${coverImage?.url}`}
      alt={coverImage?.altText}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-3xl font-bold text-white">
        {data.title}
      </h3>
    </div>
  </div>
  
  <div className="p-5 bg-white dark:bg-gray-800">
    <div className="mb-3">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">
        ₹ {data.price}
      </span>
    </div>
    
    <div className="flex items-center gap-2 text-base mb-3">
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
      <span className="text-gray-800 dark:text-gray-200 font-medium">
        {data.duration}
      </span>
    </div>
    
    <div className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-400">
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
      <span>Available on request</span>
    </div>
  </div>
</div>
  )
}
export default async function Home () {

  const data = await fetch('http://localhost:3000/api/v1/home/packages')
  const res = await data.json()
  const packages = res.data.packages
  const categories = res.data.category

  return (
    
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 min-h-[600px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
              alt="Travel Background"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              {/* Left Side - Text Content */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-lg">
                    Travel with us
                  </h1>
                  <p className="max-w-[600px] text-gray-100 md:text-xl drop-shadow-md">
                    Stop Dreaming, Start Exploring: Hand-Crafted Journeys Worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#demo">
                    <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white text-gray-900 border-white">
                      View Packages
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side - Video Thumbnail Card */}
              <div className="flex items-center justify-center">
                <a 
                  href="https://youtu.be/tdgWEEOgdrU?si=f-M3XLEcd7ZKtaIF" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative group block w-full max-w-[600px] rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    <img
                      src="https://img.youtube.com/vi/tdgWEEOgdrU/maxresdefault.jpg"
                      alt="Travel Video Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <div className="bg-white/90 group-hover:bg-white rounded-full p-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                        <svg 
                          className="w-12 h-12 text-red-600" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {/* Watch Now Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-lg">Watch Our Travel Story</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700 dark:bg-teal-700/20 dark:text-teal-400">
                EXPLORE
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                What's Your Next Vibe? Browse By Travel Theme
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Filter your search by mood, not just location. We've organized the world's best trips to match your perfect state of mind.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
  {categories.map((cat: any, index: any) => (
    <div
      key={index}
      className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={categoryImages[cat._id as keyof typeof categoryImages]}
        alt={cat.title}
       className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500"></div>

      {/* Category Title (Visible Initially) */}
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:opacity-0">
      <h3 className="absolute left-4 bottom-4 text-white text-xl font-bold">
          {cat.title}
        </h3>
      </div>

      {/* Hover Content (Visible on Hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white text-lg mb-3">STARTING FROM ₹6,999</p>
        <button className="px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-white text-gray-900 rounded-md shadow-md hover:bg-gray-100 transition-all">
          View Packages
        </button>
      </div>
    </div>
  ))}
</div>

          </div>
        </section>
        <section id="motto">
            <div className="container pb-32">
              <h3 className=" text-center text-3xl font-bold tracking-tighter md:text-4xl/tight">Odyssey</h3>
              <p className=" md:text-xl/relaxed lg:text-base/relaxed xl:text-l/relaxed text-center max-w-[1200px] mx-auto text-gray-500 md:text-l dark:text-gray-400 pt-12">At Odyssey, we know the pain points of planning: the endless search for the perfect destination, the confusing flight routes, the guesswork on how many days you actually need, and the struggle to stay within budget. The holiday process shouldn't be a tiresome chore.</p>
              <p className=" md:text-xl/relaxed lg:text-base/relaxed xl:text-l/relaxed text-center max-w-[1200px] mx-auto text-gray-500 md:text-l dark:text-gray-400 pt-12">That's where we step in. We leverage our deep travel expertise and staff knowledge across a variety of locations to take the frustration out of planning. We offer a wide range of ready-made itineraries—perfectly timed and budgeted—or we can customize a tour exactly to your requirements. With Odyssey, your next great adventure is available with the simple click of a mouse or tap of a finger. Stop researching and start experiencing.</p>
            </div>
        </section>
        <section id= "popular-trips">
              <div className="container">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700 dark:bg-teal-700/20 dark:text-teal-400">
                  Traveler's Choice
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Browse Our Most Popular Holiday Packages
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the trips our community loves most! From weekend getaways to week-long explorations.
                  </p>
                </div>
                </div>
                <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((item:PackageInfo, index:any) => <PopularCard data={item} key={index}/>)}
                </div>
              </div>
        </section>
      </main>
    
  )
}
