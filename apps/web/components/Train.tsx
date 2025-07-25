"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { UploadModal } from "@/components/ui/upload"
import { useState } from "react"
import { TrainModelInput } from "common/inferred"
import axios from "axios"
import { BACKEND_URL } from "@/app/config"
import { useRouter } from "next/navigation"
import {useAuth} from "@clerk/nextjs"





export  function Train() {
    const {getToken} = useAuth()
    const [zipUrl, setZipUrl] = useState("")
    const [type, setType] = useState("Man")
    const [age, setAge] = useState<string>()
    const[ethnicity, setEthenecity] = useState<string>()
    const [eyeColor, setEyeColor] = useState<string>()
    const [bald, setBald] = useState(false)
    const [name, setName] = useState("")
    const router = useRouter()

   async function trainModal() {

        const input = {
         zipUrl,
         type,
         age: parseInt(age ?? "0"),
         ethnicity,
         eyeColor,
         bald,
         name
        }
        try {
            const token = await getToken()
            const response = await axios.post(
              `${BACKEND_URL}/ai/training`,
              input,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
              }
            );
            router.push("/");
          } catch (err) {
            console.error("Training failed:", err);
          }
        }
     

    return (
        <div className="flex flex-col items-center justify-center pt-4">
             <Card className="w-[600px] px-4">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
       
          <div className="grid w-full items-center gap-4">
            <div className="flex ">
            <div className="flex flex-col space-y-1.5 flex-1 ">
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e)=> setName(e.target.value)} id="name" placeholder="Name of the model" />
            </div>
            <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Age</Label>
                <Input id="name" placeholder="Age of the model" onChange={(e)=>{
                    setAge(e.target.value)
                }}/>

            </div>
            <div className="flex gap-4">
            <div className="flex flex-col space-y-1.5 flex-1">
              <Label htmlFor="name">Type</Label>
                <Select onValueChange={(value)=>{
                    setType(value)
                }}>
                    <SelectTrigger id="name">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Man">Man</SelectItem>
                        <SelectItem value="Woman">Woman</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                        
                    </SelectContent>
                </Select>
           </div>
            </div>
           
            
            
            <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="name">Ethnicity</Label>
            <Select onValueChange={(value)=>{
                setEthenecity(value)
            }}>
                <SelectTrigger id="name">
                     <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">Asian American</SelectItem>
                    <SelectItem value="East_Asian">East Asian</SelectItem>
                    <SelectItem value= "South_East_Asian">South East Asian</SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                </SelectContent>   
            </Select>
            </div>
            </div>
           <div className="flex flex-col space-y-1.5">
               <Label htmlFor="name">Eye Color</Label>
               <Select onValueChange={(value) => {
                            setEyeColor(value)
                        }}>
                <SelectTrigger id="name">
                        <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                </SelectContent>   
               </Select>
           </div>
           <div className="flex flex-col space-y-1.5">
             <Label htmlFor="name">Bald</Label>
               <Switch onClick={(e) => {
                            setBald(!bald)}}/>
           </div>
           <UploadModal onUploadDone={(zipUrl)=> {
                setZipUrl(zipUrl)
           }}/>
          </div>
        
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={()=>{
            router.push("/")
        }}>Cancel</Button>
        <Button disabled={!zipUrl || !type || !age || !ethnicity || !eyeColor || !bald} onClick={trainModal}>Create Model</Button>
      </CardFooter>
    </Card>
        </div>
    )
}