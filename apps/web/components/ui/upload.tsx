"use client";
import JSZip from "jszip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import axios from "axios";
import { BACKEND_URL, CLOUDFLARE_URL } from "@/app/config";
export function UploadModal({ onUploadDone} : { 
    onUploadDone: (zipUrl: string) => void
  })  {
  return (
    <Card >
      
      <CardContent  className=
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-all">
       <CloudUploadIcon className="w-16 h-16 text-neutral-400" />
       <Button variant="outline" className="w-full" onClick={()=>{
        
          const input = document.createElement("input");
          // select multiple images

          input.type = "file";
          input.accept = "image/*";
          input.multiple = true;
          input.onchange = async() => {
            console.log(input.files);
            const zip = new JSZip();

            const res = await axios.get(`${BACKEND_URL}/pre-signed-url`)
        
            const key = res.data.key
            const url = res.data.url
            
            if (input.files){
                for (const file of input.files) {
                    const content = await file.arrayBuffer();
                    zip.file(file.name, content);
                } 
                const content = await zip.generateAsync({ type: "blob" });
                const formData = new FormData();
                formData.append("file", content);   
                
                const res = await axios.put(url, formData)
                onUploadDone(`${CLOUDFLARE_URL}/${key}`)

            }

           
          }


        // input.onchange = async () => {
        //     const zip = new JSZip();
        //     const res = await axios.get(`${BACKEND_URL}/pre-signed-url`);
        //     const uploadUrl = res.data.url;
        //     const key = res.data.key;
          
        //     if (input.files) {
        //       for (const file of input.files) {
        //         const content = await file.arrayBuffer();
        //         zip.file(file.name, content);
        //       }
          
        //       const blob = await zip.generateAsync({ type: "blob" });
          
        //       // 🚀 Upload the zip directly using PUT
        //      const data = await axios.put(uploadUrl, blob, {
        //         headers: {
        //           "Content-Type": "application/zip"
        //         }
                
        //       });
        //         console.log("Upload response:", data);
          
        //       console.log("Uploaded successfully to S3:", key);
        //     }
        //   };
          
            input.click();
          
       }}>Select Files</Button>
     </CardContent>
    </Card>
  );
}
function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}