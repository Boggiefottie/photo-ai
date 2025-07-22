import { GenerateImage } from "@/components/GenerateImage"
import { Packs } from "@/components/Packs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Train} from "@/components/Train"
import { Camera } from "@/components/Camera"
export default function Dashbaord() {
    return <div className="flex justify-center">
        <div className="max-w-6xl">
        <div className="flex justify-center">
        <Tabs defaultValue="camera">
  <div className="flex justify-center">
  <TabsList>
  <TabsTrigger value="camera">Camera</TabsTrigger>
    <TabsTrigger value="generate">Generate Image</TabsTrigger>
    <TabsTrigger value="train">Train a model</TabsTrigger>
    <TabsTrigger value="packs">Packs</TabsTrigger>
    
  </TabsList>
  </div>
  
  <TabsContent value="generate"><GenerateImage/></TabsContent>
  <TabsContent value="train"><Train/></TabsContent>
  <TabsContent value="packs"><Packs/></TabsContent>
  <TabsContent value="camera"><Camera/></TabsContent>
</Tabs>
</div>
    </div>
    </div>
}    