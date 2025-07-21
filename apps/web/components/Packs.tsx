import axios from "axios";
import { PackCard, TPack } from "./PackCard";
import { BACKEND_URL } from "@/app/config";

async function getPacks(): Promise<TPack[]> {
    
   const res = await axios.get(`${BACKEND_URL}/pack/bulk`)
   return res.data.packs ?? [];
}

export async function Packs() {   
    const packs = await getPacks();
  return<div className="grid md:grid-cols-3 gap-4 p-4 grid-cols-1">
    {packs.map(p=> <PackCard key={p.name} {...p}/>)}
  </div>
}