"use client"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus, Clock, Filter, Search } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { object } from 'joi'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// Sample appointment data
const appointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    date: "2025-05-11",
    time: "10:00 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    doctor: "Dr. Wilson",
    date: "2025-05-11",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Mike Williams",
    doctor: "Dr. Brown",
    date: "2025-05-11",
    time: "1:00 PM",
    type: "Check-up",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. Smith",
    date: "2025-05-11",
    time: "2:30 PM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 5,
    patient: "Robert Miller",
    doctor: "Dr. Wilson",
    date: "2025-05-11",
    time: "4:00 PM",
    type: "Follow-up",
    status: "Cancelled",
  },
  {
    id: 6,
    patient: "Jennifer Lee",
    doctor: "Dr. Brown",
    date: "2025-05-12",
    time: "9:00 AM",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: 7,
    patient: "David Wilson",
    doctor: "Dr. Smith",
    date: "2025-05-12",
    time: "10:30 AM",
    type: "Check-up",
    status: "Confirmed",
  },
  {
    id: 8,
    patient: "Lisa Anderson",
    doctor: "Dr. Wilson",
    date: "2025-05-12",
    time: "1:00 PM",
    type: "Follow-up",
    status: "Pending",
  },
]

// 
interface PackageInfo {
  title : string
  description : string,
  duration: string,
  type: string,
  category: string,
  dateA: string,
  dateB: string,
  dateC: string,
  images?: File[],
  status: string,
  price: string,
  location: string,


}

interface Options {
  category: { title: string; _id: string }[],
  locations: { title: string; _id: string }[]
}
export default function Packages() {

 

// package data

const [packageData, setPackageData] = useState<PackageInfo>({
  title : "",
  description: "",
  duration: "",
  type: "",
  category: "",
  dateA: "",
  dateB: "",
  dateC: "",
  images:[],
  status: "",
  location:"",
  price: ""
})

const handleInputChange = (e:any) => {
  const{name, value} = e.target
  setPackageData((prev:any) => ({...prev, [name]:value}))
}

const handleFileChange = (e:any)=> {
  if (e.target.files) {
    const filesArray: File[] = Array.from(e.target.files);
    setPackageData((prev: PackageInfo) => ({ ...prev, images: filesArray }));
  }
}

const [options, setOptions] = useState<Options>({
  category: [],
  locations: []
})
// 
const fetchOptions = async()=> {

  await axios.get(`${baseUrl}/packages/add-options`).then(res=> {
    console.log(res.data.data, '---res data-----')                                           
     // res.data =={
    //   category: [{_id: "123", title: "Domestic"}, {_id: "124", title: "International"}],
    //   locations: [{_id: "201", title: "Goa"}, {_id: "202", title: "Paris"}] }
    setOptions(res.data.data)
  }).catch(err=> {
    console.error(err?.message)
  })
}

useEffect(()=>{
  fetchOptions()
},[])

const token = Cookies.get('access_token')

useEffect(()=> {
  console.log(options.locations,'location options')
},[options])

const handleSubmit = async(e:any) =>{
  e.preventDefault()
  
  const formData = new FormData()
  
  Object.keys(packageData).forEach(key =>{
    if ( key !== "images"){
      const value  = packageData[ key as  keyof PackageInfo]
      if ( value !== undefined ) formData.append( key , value as string);
    }
  });
   packageData.images?.forEach(file => {
    formData.append("images", file)
   })

  //map and append package data into formdata

  const res = await axios.post(`${baseUrl}/packages/add-packages`, formData,{
    headers : {
      "Authorization":`Bearer ${token}`
    }
  }).then(res => console.log(res)).catch(err => console.log(err))

}
// package data

 // Sample doctors data
 const doctors = [
  { id: 1, name: "Dr. Smith", specialty: "General Medicine" },
  { id: 2, name: "Dr. Wilson", specialty: "Cardiology" },
  { id: 3, name: "Dr. Brown", specialty: "Pediatrics" },
]

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>("all")
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter appointments based on search query, selected date, doctor, and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDate = date ? appointment.date === date.toISOString().split("T")[0] : true

    const matchesDoctor = selectedDoctor && selectedDoctor !== "all" ? appointment.doctor === selectedDoctor : true

    const matchesStatus = selectedStatus && selectedStatus !== "all" ? appointment.status === selectedStatus : true

    return matchesSearch && matchesDate && matchesDoctor && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Package
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Packagae</DialogTitle>
              <DialogDescription>Create a new package.</DialogDescription>
            </DialogHeader>


            <form action="">

                <div className="grid gap-4 py-4">
                 
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <div className="col-span-3">
                      <Input onChange ={handleInputChange} value= {packageData.title} name ="title" id="title" placeholder="Package Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <div className="col-span-3">
                      <Textarea  onChange ={handleInputChange} value= {packageData.description} name="description" id= "description">

                      </Textarea>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <div className="col-span-3">
                      <Input name="image"
                       onChange={ handleFileChange}
                       id="image" 
                       type ="file"/>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      Duration
                    </Label>
                    <div className="col-span-3">
                      <Input onChange ={handleInputChange} value= {packageData.duration} name="duration" id="duration" placeholder="3D 4N" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <div className="col-span-3">
                      <Select value ={packageData.category}
                      onValueChange={(val)=> handleInputChange({target : {name: "category", value: val}})}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            options?.category?.map((cat: any)=> <SelectItem  key ={cat._id} value={cat._id}>{cat.title}</SelectItem>)
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="Location" className="text-right">
                      Location
                    </Label>
                    <div className="col-span-3">
                      <Select value ={packageData.location}
                      onValueChange={(val)=> handleInputChange({target : {name: "location", value: val}})}>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select Destination"/>
                        </SelectTrigger>
                        <SelectContent>
                          {
                            //location is passed with response from backend
                            options?.locations?.map((loc: any)=> <SelectItem key ={loc._id} value={loc._id}>{loc.title}</SelectItem>)
                          }

                        
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <div className="col-span-3">
                      <Select value ={packageData.type}
                      onValueChange={(val)=> handleInputChange({target : {name: "type", value: val}})}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="International">International</SelectItem>
                          <SelectItem value="Domestic">Domestic</SelectItem>
                          <SelectItem value="Group">Group</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <div className="col-span-3">
                      <Input onChange ={handleInputChange} value= {packageData.dateA} name ="dateA" id="date1" placeholder="Available Dates" />
                      <Input onChange ={handleInputChange} value= {packageData.dateB} name="dateB" id="date2" placeholder="Available Dates" />
                      <Input onChange ={handleInputChange} value= {packageData.dateC} name="dateC" id="date3" placeholder="Available Dates" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <div className="col-span-3">
                      <Input onChange ={handleInputChange} value= {packageData.price} name ="price" id="price" placeholder="Price" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <div className="col-span-3">
                      <Select value = {packageData.status} 
                      onValueChange={(val)=> handleInputChange({target: {name: "status" , value: val}})}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                </div>

                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={handleSubmit}
              >
                Save Appointment
              </Button>
            </form>


            <DialogFooter>
              
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search appointments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Doctors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Doctors</SelectItem>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Package</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      </tr>

                    </thead>
                    <tbody>
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="h-24 text-center">
                            No appointments found.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appointment) => (
                          <tr
                            key={appointment.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{appointment.patient}</td>
                            <td className="p-4 align-middle">{appointment.doctor}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col">
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {appointment.time}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{appointment.type}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={
                                  appointment.status === "Confirmed"
                                    ? "default"
                                    : appointment.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
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
            </div>
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-[300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setDate(new Date())}>
                    Today
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date
                      ? date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "All Appointments"}
                  </CardTitle>
                  <CardDescription>{filteredAppointments.length} appointments scheduled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                        <div className="text-center">
                          <h3 className="text-lg font-medium">No appointments found</h3>
                          <p className="text-sm text-muted-foreground">
                            There are no appointments scheduled for this date.
                          </p>
                        </div>
                      </div>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="grid gap-1">
                            <div className="font-medium">{appointment.patient}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.doctor} • {appointment.type}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                              <Badge
                                variant={
                                  appointment.status === "Confirmed"
                                    ? "default"
                                    : appointment.status === "Pending"
                                      ? "outline"
                                      : "destructive"
                                }
                                className="mt-1"
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon">
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
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                              <span className="sr-only">More</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
