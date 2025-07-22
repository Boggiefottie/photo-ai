import { Button } from "./ui/button";

import { Textarea } from "./ui/textarea";

export function GenerateImage(){
    return <div className="h-[80vh] items-center justify-center flex">
        <div>
        
        <Textarea  className="py-8 px-4 w-2xl border"></Textarea>
        <div className="flex justify-center pt-4">
        <Button variant={"secondary"}>Create Image</Button>
        </div>
        </div>
    </div>
}