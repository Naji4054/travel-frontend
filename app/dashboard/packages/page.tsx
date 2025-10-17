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
interface AddPackageFormData {
  _id: string;
  title : string
  description : string,
  duration: string,
  type: string,
  category: {
    _id: string;
    title: string
  },
  image?: File[],
  status: string,
  price: string,
  location: {
    _id: string
    title: string
  },


}
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
  }[],
  status: string,
  price: string,
  location: {
    _id: string
    title: string
  },


}

interface Options {
  category: { title: string; _id: string }[],
  locations: { title: string; _id: string }[]
}

const defaultPackage = {
  _id: '',
  title : "",
  description: "",
  duration: "",
  type: "",
  category: {
    _id: '',
    title: ''
  },
  image:[],
  status: "",
  location:{
    _id: '',
    title: ''
  },
  price: ""
}

export default function Packages() {

 //reset form
const resetForm = () => {
  setPackageData(defaultPackage);
  setSelectedPackage(null);
  setFormLoading(false);
}

 //reset form


// package data
const [formLoading, setFormLoading] = useState(false)
const [packageData, setPackageData] = useState<AddPackageFormData>(defaultPackage)

const handleInputChange = (e:any) => {
  const{name, value} = e.target
  console.log(value, 'e from cat')
  setPackageData((prev:any) => ({...prev, [name]:value}))
}

const handleFileChange = (e:any)=> {
  
  if (e.target.files) {
    const filesArray: File[] = Array.from(e.target.files);
    setPackageData((prev: AddPackageFormData) => ({ ...prev, image: filesArray }));
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



const handleSubmit = async(e:any) => {
  e.preventDefault()
  
  const formData = new FormData()
  
  Object.keys(packageData).forEach((key) => {
    if (key === "image") return; // skip images

    const value = packageData[key as keyof AddPackageFormData];

    if (value === undefined || value === null) return;

    //  If the value is an object, stringify it
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });

  console.log(packageData.image,'imagee')
   packageData.image?.forEach(file => {
    formData.append("images", file)
   })

  //map and append package data into formdata

  if (selectedPackage) {
    const res = await axios.patch(`${baseUrl}/packages/update-packages/${selectedPackage}`,formData,{
      headers : {
        "Authorization":`Bearer ${token}`
      }
    })
  } else {
    const res = await axios.post(`${baseUrl}/packages/add-packages`, formData,{
      headers : {
        "Authorization":`Bearer ${token}`
      }
    }).then(res => console.log(res)).catch(err => console.log(err))
  }
 

}
// package data


// listing package 
const [packageList, setPackageList] = useState<AddPackageFormData[]>([])
const fetchList = async() => {
  const res =  axios.get(`${baseUrl}/packages/all-packages`).then(res => setPackageList(res.data.data)).catch(err => console.log(err))
}
useEffect(()=>{
fetchList()
},[])
//listing packages 

// view single package 

const [viewPackage, setViewPackage] = useState<PackageInfo>()
const [viewOpen, setViewOpen] = useState(false)

const handleView = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/packages/view-package/${id}`)
    setViewPackage(res.data.data)
    setViewOpen(true)
  } catch (err) {
    console.error(err)
  }
}

useEffect(()=>{
  console.log(viewPackage,'...view...')
},[viewPackage])
// view single package 


//edit Package
const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
const handleFetchCurrentData = async () => {

  if (selectedPackage) {
    
    setFormLoading(true)
    
      const res = await axios.get(`${baseUrl}/packages/view-package/${selectedPackage}`).then(res=> {
        setPackageData(res.data.data)
        setFormLoading(false)
      }).catch(err=> {
        console.log(err)
      }).finally(()=> setFormLoading(false))
    }
  }
  useEffect(()=> {
    if (selectedPackage)
       setIsAddDialogOpen(true)
       handleFetchCurrentData()
  }, [selectedPackage])
//edit Package


  
// delete package 

const handlePackageDelete = async (id:string) =>{
  const res = await axios.delete(`${baseUrl}/packages/delete-packages/${id}`,{
    headers : {
      "Authorization":`Bearer ${token}`
    }
  }).then().catch(err=>console.log(err))
}

// delete package 


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

        {/* // form */}

        <Dialog open={isAddDialogOpen} onOpenChange={(open)=>{
          setIsAddDialogOpen(open);
          if(!open) resetForm()
        }}>
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


          {
            formLoading && <div>Loading...</div>
          }
          {
            !formLoading && (
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
                  <Select
                  value={packageData.category._id || ""}
                  onValueChange={(val) => {
                    const selectedCat = options?.category?.find((cat: any) => cat._id === val);
                    handleInputChange({
                      target: {
                        name: "category",
                        value: {
                          _id: selectedCat?._id || "",
                          title: selectedCat?.title || "",
                        },
                      },
                    });
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.category?.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Location" className="text-right">
                    Location
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={packageData.location._id || ""}
                      onValueChange={(val) => {
                        const selectedLoc = options?.locations?.find((loc: any) => loc._id === val);
                        handleInputChange({
                          target: {
                            name: "location",
                            value: {
                              _id: selectedLoc?._id || "",
                              title: selectedLoc?.title || "",
                            },
                          },
                        });
                      }}
                    >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {options?.locations?.map((loc: any) => (
                        <SelectItem key={loc._id} value={loc._id}>
                          {loc.title}
                        </SelectItem>
                      ))}
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

              <Button variant="outline" onClick={() => {setIsAddDialogOpen(false)
                resetForm()
              }}>
              Cancel
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleSubmit}
            >
              { selectedPackage ? 'Save changes' : 'Add package' }
            </Button>
          </form>
            )
          }


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

              {/* //table */}
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
                      {packageList.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="h-24 text-center">
                            No Package found.
                          </td>
                        </tr>
                      ) : (
                        packageList.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{item?._id}</td>
                            <td className="p-4 align-middle">{item.title}</td>
                            <td className="p-4 align-middle">{item.type}</td>
                            <td className="p-4 align-middle">{item.location.title}</td>
                            <td className="p-4 align-middle">{item.price}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant={
                                  item.status === "active"
                                    ? "default"
                                    : item.status === "inactive"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {item.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button  onClick={() => handleView(item._id)} variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm" onClick={()=> setSelectedPackage(item._id)}>
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" onClick={()=> handlePackageDelete(item._id)}>
                                  Delete
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
        {/* <TabsContent value="calendar" className="space-y-4">
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
        </TabsContent> */}
      </Tabs>
           
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View Package</DialogTitle>
            <DialogDescription>Package details</DialogDescription>
          </DialogHeader>

          {/* //view package */}

          {viewPackage ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Title:</h3>
                <p>{viewPackage.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description:</h3>
                <p>{viewPackage.description}</p>
              </div>
              <div>
                <h3 className="font-semibold">Category:</h3>
                <p>{viewPackage.category?.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Location:</h3>
                <p>{viewPackage.location?.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Type:</h3>
                <p>{viewPackage.type}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price:</h3>
                <p>{viewPackage.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status:</h3>
                <Badge>{viewPackage.status}</Badge>
              </div>
              {viewPackage.image?.length ? (
                <div>
                  <h3 className="font-semibold">Images:</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewPackage.image.map((img, i) => (
                      <img
                      key={i}
                      src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}/${img?.url}`} // because url already includes 'uploads/...'
                      alt={img.altText || viewPackage.title}
                      className="h-24 w-24 object-cover rounded"
                    />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>

    
    </div>
  )
}
