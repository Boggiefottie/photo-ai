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
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/tiger/Dtvy54RgSlk3g97Vwf8wU_1cd17d8fb03d4b37b4b16160407b6263.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/kangaroo/o5gVN99Ocyxu_TDbpLaQj_9b1993bbfae643ad903f0c2096c037b9.jpg"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/kangaroo/oICOlKFFFDSjLA4TIR3a9_7d0f4f005cc4435f84424dd20d25ffda.jpg"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/zebra/yv5RHfp3BG7a_TD9YjpMC_3b9b5730d3eb44b19643d2f0788781cc.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/zebra/gvDe3RU4V7QNQdD1NVIAm_ec07b2eaf2ca4bb89addc7598b4dafc4.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/monkey/_J8hgsrTwO2mSqU7gQg0f_220b74e36a614db9a7aee657243c1a90.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://v3.fal.media/files/rabbit/FE_6o-LVq0bvcgWlZBAZ5_7e185349f35040aa845688e2f37e2681.jpg" /></CarouselItem>
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