"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, UserPlus } from "lucide-react"
import axios from "axios"
import Link from "next/link"
import { useDebounce } from 'use-debounce';


export interface GuideData {
  _id: string
  name: string
  age: string
  gender: string
  email: string
  phone: string
  location: string
  language: string
  availability: boolean
}

const defaultGuide = {
  _id:"",
  name:"",
  age:"",
  gender:"",
  email:"",
  phone:"",
  location:"",
  language:"",
  availability: false
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const token = Cookies.get('access_token')

export default function Guides() {
 
  //reset form
const resetForm = () =>{
setGuides(defaultGuide);
setSelectedGuide(null);
setFormLoading(false);
}


  //add guides 
const [guides, setGuides] = useState<GuideData>(defaultGuide)
const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
const [formLoading, setFormLoading] = useState(false)

const handleInputChange = (e:any) => {
  const {name, value} = e.target
  
  setGuides((prev: any)=> ({...prev, [name]: value}))
}

const handleSubmit = async (e:any)=> {

  if (selectedGuide) {
    const res = await axios.patch(`${baseUrl}/guides/update-guide/${selectedGuide}`,guides,{
      headers : {
        "Authorization":`Bearer ${token}`
      }
    })
  } else {
    const res = await axios.post(`${baseUrl}/guides/add-guide`,guides,{ 
      headers : {
        "Authorization":`Bearer ${token}`
      }
    }).then(res=> console.log(res.data,'submit adding guide')).catch(err=> console.log(err))
    
  }
  setIsAddDialogOpen(false)
}
  //add guides

  //update guide
  const handleFetchCurrentData = async() =>{
    if (selectedGuide) {
    
      setFormLoading(true)
      
        const res = await axios.get(`${baseUrl}/guides/view-guide/${selectedGuide}`,{ 
          headers : {
            "Authorization":`Bearer ${token}`
          }
        }).then(res=> {
          setGuides(res.data.data)
          setFormLoading(false)
        }).catch(err=> {
          console.log(err)
        }).finally(()=> setFormLoading(false))
      
    }
  }
  useEffect(()=> {
    if (selectedGuide)
      setIsAddDialogOpen(true)
      handleFetchCurrentData()
  }, [selectedGuide])

//listing packages 
const [searchQuery, setSearchQuery] = useState('')
 const [debouncedSearchQuery] = useDebounce(searchQuery, 300)

const [filterOptions, setFilterOptions] = useState<any>({
  gender: "all",
  availability: "all"
})

  const [guideList, setGuideList] = useState<GuideData[]>([])
  const fetchList = async() => {
    const res =  axios.get(`${baseUrl}/guides/all-guide`, { 
      headers : {
        "Authorization":`Bearer ${token}`
      },
      params: {
        searchQuery: debouncedSearchQuery,
        ...filterOptions
      }
    }).then(res => setGuideList(res.data.data)).catch(err => console.log(err))
  }

  useEffect(()=> {
  fetchList()
  },[debouncedSearchQuery, filterOptions])

//listing packages 


// filter

const handleFilterChange = (e:any) => {
const { name, value } = e.target
setFilterOptions((prev:any) => ({ ...prev, [name]:value }))
}
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Travel Guides</h2>
        
        {
          formLoading && <div>Loading...</div>
        }
        {
          !formLoading && (
            <form action="">
        <Dialog open={isAddDialogOpen} onOpenChange={(open)=> {
          setIsAddDialogOpen(open)
          if(!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Guide</DialogTitle>
              <DialogDescription>Enter the guide's information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input  value={guides.name} name= "name" onChange = {handleInputChange} id="name" placeholder="John Doe" className="col-span-3" />
              </div>

              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input value={guides.age} name= "age" onChange = {handleInputChange} id="age" type="number" placeholder="35" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select value= {guides.gender} onValueChange={(val)=> handleInputChange ({target: { name: "gender", value: val}})}>
                  <SelectTrigger id="gender" className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input value={guides.email} name= "email" onChange = {handleInputChange} id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input value={guides.phone} name= "phone" onChange = {handleInputChange} id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input value={guides.location} name= "location" onChange = {handleInputChange} id="location" placeholder=" Calicut, Kerala, India" className="col-span-3" />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="language" className="text-right">
                  Languages
                </Label>
                <Input  value={guides.language} name= "language" onChange = {handleInputChange} id="language" placeholder=" English, Hindi, Malayalam" className="col-span-3" />
              </div>
              
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availabile
                </Label>
                <Input  type ="checkbox" checked = {guides.availability} onChange={(e)=> handleInputChange ({target: { name: "availability", value: e.target.checked}})} className="col-span-3"/>
              </div>

              
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {setIsAddDialogOpen(false)
                resetForm()
              }}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                onClick={handleSubmit}
              >
                { selectedGuide ? 'Save changes' : 'Add Guide' }
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </form>
          )
        }
      </div>
      <>
      <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Guides"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select value={filterOptions.availability} onValueChange={(val)=>handleFilterChange({target :{name: 'availability', value : val}})}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Available</SelectItem>
                  <SelectItem value="inactive">Un-available</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterOptions.gender} onValueChange={(val)=> handleFilterChange({ target: { name:'gender', value: val }})}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Age/Gender</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {guideList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="h-24 text-center">
                        No Guides found.
                      </td>
                    </tr>
                  ) : (
                    guideList.map((guide) => (
                      <tr
                        key={guide._id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {guide.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{guide.name}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span>{guide.age} years</span>
                            <span className="text-xs text-muted-foreground">{guide.gender}</span>
                          </div>
                        </td>

                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span>{guide.email}</span>
                            <span className="text-xs text-muted-foreground">{guide.phone}</span>
                          </div>
                        </td>
                        
                        <td className="p-4 align-middle">
                        <div>
                              <div className="font-medium">{guide.location}</div>
                            </div>
                        </td>

                        <td className="p-4 align-middle">
                          <Badge variant={
                                  guide.availability ? 'default': 'outline'
                                }>
                            {guide.availability ? 'available' : 'unavailable'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Link href={`/dashboard/guide/${guide._id}`}> View</Link>
                            <Button 
                            onClick={()=> setSelectedGuide(guide._id)}
                            variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </>
     
    </div>
  )
}
