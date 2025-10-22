'use client'

import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { GuideData } from '../page'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from '@/components/ui/dialog'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const token = Cookies.get('access_token')

const GuideView =   ({ params }: any ) => {

    const unwrappedParams:any = React.use(params); 
  
  // 3. Access the property on the unwrapped object
  const id = unwrappedParams?.id;
    
   
    const [viewGuide, setViewGuide] = useState<GuideData>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchGuide = async () => {
        await axios.get(`${baseUrl}/guides/view-guide/${id}`,{
            headers : {
              "Authorization":`Bearer ${token}`
            }
          }).then(res=> {
            setViewGuide(res.data.data)
        }).catch(err=> {
            console.error(err?.message)
            setError(true)

        })
        setIsLoading(false)
    }


    useEffect(()=> {
        fetchGuide()        
  
    }, [id])

    if (isLoading) {
        return <div>Loading....</div>
    }

    if (viewGuide) {
        return (
            <section>
              <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Name:</h3>
                    <p>{viewGuide?.name}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Age:</h3>
                    <p>{viewGuide?.age}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Gender:</h3>
                    <p>{viewGuide?.gender}</p>
                </div>
                <div>
                    <h3 className="font-semibold">email:</h3>
                    <p>{viewGuide?.email}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Phone:</h3>
                    <p>{viewGuide?.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold">location</h3>
                    <p>{viewGuide?.location}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Languages:</h3>
                    <p>{viewGuide?.language}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Availability:</h3>
                    <p>{viewGuide?.availability ? 'available' : 'not available'}</p>
                </div>
              </div>
            </section>
          
    )
    }

    if (error) {
        return (
            <div>error</div>
        )
    }

    return null
}

export default GuideView