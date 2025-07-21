"use client"


import { BACKEND_URL } from "@/app/config"
import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from '@clerk/nextjs';
import { ImageCard, TImage } from './ImageCard';




export  function Camera() {
    const [images, setImages] = useState<TImage[]>([])
    const {getToken}= useAuth()
    useEffect(() => {
      (async()=>{
        const token = await getToken()
        const response = await axios.get(`${BACKEND_URL}/image/bulk`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
         })
         setImages(response.data.images)
      })()
    },[])
  return <div>
    {images.map(image => <ImageCard {...image}/>)}
  </div>
}