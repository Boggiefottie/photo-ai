import { GenerateImage } from "@/components/GenerateImage"
import { Packs } from "@/components/Packs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Train} from "@/components/Train"
export default function Dashbaord() {
    return <div className="flex justify-center">
        <div className="w-2xl">
        <div className="flex justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
  <div className="flex justify-center">
  <TabsList>
    <TabsTrigger value="generate">Generate Image</TabsTrigger>
    <TabsTrigger value="train">Train a model</TabsTrigger>
    <TabsTrigger value="packs">Packs</TabsTrigger>
  </TabsList>
  </div>
  
  <TabsContent value="generate"><GenerateImage/></TabsContent>
  <TabsContent value="train"><Train/></TabsContent>
  <TabsContent value="packs"><Packs/></TabsContent>
</Tabs>
</div>
    </div>
    </div>
}    