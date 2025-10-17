import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// export const axiosHelper = async (method: string, endpoint: string, payload = {}, authenticate = false) => {

//   let response:any;
//   const headers = {}
//   if (method === 'get') {
//     axios.get(`${process.env.NEXT_PUBLIC_PUBLIC_URL}/api/v1${endpoint}`)
//   }
// }

