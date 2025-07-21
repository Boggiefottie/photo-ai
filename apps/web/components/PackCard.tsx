
export interface TPack {
  name: string; 
  imageUrl1:string;
  imageUrl2:string;
  description: string;
}


export function PackCard(props : TPack) 
 {
  return <div className=" rounded-xl hover:border-red-300 border-2 p-2 cursor-pointer">
        
  <div className="flex p-4 gap-4">
 <img src={props.imageUrl1} width="50%" className="rounded"/>
 <img src={props.imageUrl2} width="50%" className="rounded"/>
 </div>
 <div className="text-xl font-bold pb-2">
   {props.name}
 </div>
 <div>
   {props.description}
 </div>
</div>
    
    
} 