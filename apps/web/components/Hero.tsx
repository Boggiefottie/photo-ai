"use client"
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation'

export function Hero()  {
    const router = useRouter()
  return (
    <div className="flex justify-center">
        <div className="max-w-4xl">
        <h1 className="text-6xl p-2 text-center pb-2">
        Generate Images for yourself and your family
        </h1>
        <Carousel>
  <CarouselContent >
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726230043-3e324960f58207e461536870caddf422-4.png" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726178755-9f7972c92244429208d500c856fea798-3.png"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1738958440-fd64af31e47902a720026225adc2f4af-1.png"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1725212295-f6b06d5a18a0dc06d192724e09576035-3.png" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726223549-b9430e254898a2ebc041c40876a4f0ee-3.png" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726229749-33d7a0159a787c9853ba0424bd7104d6-2.png" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1749316067-53d9117674de9a783aa896ae6025f30f-3.png" /></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
 </Carousel>
 <div className="flex justify-center">
 <SignedIn>
 <Button onClick={()=>{
     router.push("/dashboard")
 }} className="mt-4 px-16 py-6" size={"lg"} variant={"secondary"}>Dashboard</Button>
 </SignedIn>
 <SignedOut>
 <Button 
  className="mt-4 px-16 py-6" size={"lg"} variant={"secondary"}><SignInButton/>
  </Button>
 </SignedOut>
 
 
 </div> 
 </div>
    </div>
  )
}

export default Hero