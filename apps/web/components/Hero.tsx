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
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/07/08/47/75/240_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/06/97/64/27/240_F_697642775_508sRZ9i6JastrRkbQsg8Fb6KhAcLmRh.jpg"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/09/46/82/57/240_F_946825756_jddv2NapctwBWjlnIlYtadVx3xuOBN0N.jpg"/></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/07/08/47/75/240_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/07/08/47/75/240_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg" /></CarouselItem>
    <CarouselItem className="basis-1/4"><img src="https://t4.ftcdn.net/jpg/09/46/82/57/240_F_946825756_jddv2NapctwBWjlnIlYtadVx3xuOBN0N.jpg"/></CarouselItem>
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