import Link from "next/link"
import { Button } from "@/components/ui/button"
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
export default async function Home () {

  const data = await fetch('http://localhost:3000/api/v1/home/packages')
  const res = await data.json()
  const packages = res.data.packages
  const categories = res.data.category

  // const pkg =({item} : {item: PackageInfo}) => {
  //   const coverImage = item.image.find(img => img.isCover);
  // }

  return (
    
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Travel with us
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Stop Dreaming, Start Exploring: Hand-Crafted Journeys Worldwide.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 
                  <Link href="#demo">
                    <Button size="lg" variant="outline">
                      View Packages
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Clinic Management Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                />
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
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                  {/* <div className="p-2">{feature.icon}</div> */}
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">{cat._id}</p>
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
                {packages.map((item:PackageInfo, index:any) => (
                  
                  <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                    {/* <div className="p-2">{feature.icon}</div> */}
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
                </div>
              </div>
        </section>
      </main>
    
  )
}
