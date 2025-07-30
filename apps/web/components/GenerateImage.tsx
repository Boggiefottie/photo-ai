"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useAuth } from '@clerk/nextjs';
import { SelectModel } from "./Models";


export function GenerateImage(){
    const [prompt , setPrompt] = useState("")
    const [selectedModel, setSelectedModel] = useState<string>()
   
        const {getToken}= useAuth()
    
    
    return <div className="h-[60vh] items-center justify-center flex">
        <div>
        <SelectModel setSelectedModel={setSelectedModel}/>
        <div className="flex justify-center pt-4">
        <Textarea onChange={(e)=>{
            setPrompt(e.target.value)
        }} placeholder="Describe the image that you would liked to see here"  className="px-4 w-2xl border border-blue-200 hover:border-blue-300 focus:border-blue-300 outline-none"></Textarea>
        </div>
        <div className="flex justify-center pt-4">
       
        <Button onClick={async()=>{
             const token = await getToken()
           await axios.post(`${BACKEND_URL}/ai/generate`,{
                prompt,
                modelId: selectedModel,
                num: 1
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }} variant={"secondary"}>Create Image</Button>
        </div>
       
        </div>
        
    </div>
}