import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
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
            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Wilderness & Adventure",
                  description: "Manage doctor schedules and patient appointments with ease.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-teal-600"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                  ),
                },
                {
                  title: "Vibrant Cities & Culture",
                  description: "Store and access patient records, history, and medical information.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-teal-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  title: "Coastal Escapes & Beaches",
                  description: "Record diagnoses, prescriptions, and follow-up appointments.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-teal-600"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                      <path d="m8 15 2 2 4-4" />
                    </svg>
                  ),
                },
            
                
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                  <div className="p-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
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
                {[
                  {
                    title: "Wilderness & Adventure",
                    description: "Manage doctor schedules and patient appointments with ease.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10 w-10 text-teal-600"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                        <path d="M8 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M16 18h.01" />
                      </svg>
                    ),
                  },
                  {
                    title: "Vibrant Cities & Culture",
                    description: "Store and access patient records, history, and medical information.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10 w-10 text-teal-600"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                  },
                  {
                    title: "Coastal Escapes & Beaches",
                    description: "Record diagnoses, prescriptions, and follow-up appointments.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-10 w-10 text-teal-600"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                        <path d="m8 15 2 2 4-4" />
                      </svg>
                    ),
                  },
              
                  
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                    <div className="p-2">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
                </div>
              </div>
        </section>
      </main>
    
  )
}
