"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from '@clerk/nextjs';

interface TModel {
    id: string,
    thumbnail: string,
    name: string,
}

export function GenerateImage(){
    const [prompt , setPrompt] = useState("")
    const [models, setModels] = useState<TModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>()
    const [modelLoading, setModelLoading] = useState(true);
    
        const {getToken}= useAuth()
    useEffect(() => {
      (async()=>{
        const token = await getToken()
        const response = await axios.get(`${BACKEND_URL}/models`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
         })
         setModels(response.data.models)
         setSelectedModel(response.data.models[0]?.id)
         setModelLoading(false)
      })()
    },[])
    
    return <div className="h-[60vh] items-center justify-center flex">
        <div>
        <div className="text-2xl pb-2 max-w-4xl">
            Select Model
        </div>
        <div className="max-w-2xl">
        <div className="grid grid-cols-4 gap-2 p-4">
        {models.map(model=> <div className={`${selectedModel === model.id ? "border-red-300" : ""} cursor-pointer rounded border p-2 w-full`} onClick={()=>{
           setSelectedModel(model.id)
        }}>
            <img src={model.thumbnail} className="rounded h-40"/>
            {model.name}
         </div>)}
            
        

         </div>
         {modelLoading && <div className="flex gap-2 p-4">
            <Skeleton className="h-40 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
            
            </div>}
         <div className="flex justify-center pt-4">
        <Textarea onChange={(e)=>{
            setPrompt(e.target.value)
        }} placeholder="Describe the image that you would liked to see here"  className="px-4 w-2xl border border-blue-200 hover:border-blue-300 focus:border-blue-300 outline-none"></Textarea>
        </div>
        <div className="flex justify-center pt-4">
        <Button onClick={async()=>{
           await axios.post(`${BACKEND_URL}"/ai/generate`,{
                prompt,
                modelId: selectedModel,
                num: 1
            })
        }} variant={"secondary"}>Create Image</Button>
        </div>
       
        </div>
        </div>
    </div>
}