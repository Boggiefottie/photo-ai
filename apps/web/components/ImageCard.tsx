import { Skeleton } from "./ui/skeleton";

export interface TImage {
    id : string
    status : string
    imageUrl: string
}

export function ImageCard(props : TImage) 
 {
    return <div className=" rounded-xl  border-2 max-w-[400px] p-2 cursor-pointer">
        
    <div className="flex p-4 gap-4">
   {props.status === "Generated" ? <img src={props.imageUrl}  className="rounded"/> : <Skeleton className=" w-full rounded" />}
   
   </div>
   
 </div>
    
} 
export function ImageCardSkeleton() {
    return (
      <div className="rounded-none mb-4 overflow-hidden max-w-[400px] cursor-pointer">
        <div className="flex gap-4 min-h-32">
          <Skeleton className={`w-full h-[300px] rounded-none`} />
        </div>
      </div>
    );
  }