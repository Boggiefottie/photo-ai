import express from "express"
import {TrainModel, GenerateImage, GenerateImagesFromPack} from "common/types"
import { prismaClient } from "db"
import { S3Client } from "bun"
import { FalAIModel } from "./models/FalAIModel"

import cors from "cors"
import { authMiddleware } from "./middleware"






const PORT = process.env.PORT || 8080

const falAiModel = new FalAIModel()



const app = express()
app.use(express.json())
app.use(cors())


const bucket = new S3Client({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    bucket: process.env.BUCKET_NAME,
    endpoint: process.env.ENDPOINT,
  });
  
  app.get("/pre-signed-url", async (req, res) => {
    try {
      const key = `models/${Date.now()}_${Math.random()}.zip`;
      
      const url = bucket.presign(key, {
        method: "PUT",
        expiresIn: 60 * 5, // 5 minutes
        type: "application/zip",
      });
  
      res.json({ url, key });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

app.get("/", (req, res) => {
    res.send("Hello World!")
})



// app.post("/ai/training",authMiddleware ,async(req, res) => {
//    try { 
//   const parsedBody = TrainModel.safeParse(req.body)
//   const images = req.body.images as string
//     console.log(req.userId)
//     if (!parsedBody.success) {  
//         res.status(411).json({ 
//            message : "Input Incorrect"
//         })
//         return
//     }
//   const{request_id , response_url} =  await falAiModel.trainModel(parsedBody.data.zipUrl,parsedBody.data.name)
//     const data = await prismaClient.model.create({
//         data: {
//             name: parsedBody.data.name,
//             type:  parsedBody.data.type,
//             age:  parsedBody.data.age,
//             ethnicity:  parsedBody.data.ethnicity,
//             eyeColor:  parsedBody.data.eyeColor,
//             bald:  parsedBody.data.bald,
//             userId: req.userId!,
//             zipUrl: parsedBody.data.zipUrl,
//             falAiRequestId: request_id,

//         }
//     })
//     res.status(200).json({
//         modelId: data.id,
//     })
// } catch (error) {
//     console.error("Error in training model:", error);
// }
    
// })
app.post("/ai/training", authMiddleware, async (req, res) => {
    try {
      const parsedBody = TrainModel.safeParse(req.body);
      const images = req.body.images as string;
  
      console.log(req.userId);
  
      if (!parsedBody.success) {
        res.status(411).json({
          message: "Input Incorrect"
        });
        return;
      }
  
      const useMock = process.env.NODE_ENV === "development";
  
      const { request_id, response_url } = useMock
        ? {
            request_id: "mocked_train_" + Date.now(),
            response_url: "https://placehold.co/600x400?text=Training+Preview",
          }
        : await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name);
  
      const data = await prismaClient.model.create({
        data: {
          name: parsedBody.data.name,
          type: parsedBody.data.type,
          age: parsedBody.data.age,
          ethnicity: parsedBody.data.ethnicity,
          eyeColor: parsedBody.data.eyeColor,
          bald: parsedBody.data.bald,
          userId: req.userId!,
          zipUrl: parsedBody.data.zipUrl,
          falAiRequestId: request_id,
        }
      });
  
      res.status(200).json({
        modelId: data.id,
      });
    } catch (error) {
      console.error("Error in training model:", error);
      res.status(500).json({
        message: "Something went wrong during model training",
        error: error instanceof Error ? error.message : error,
      });
    }
  });
  

app.post("/ai/generate",authMiddleware , async(req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body)
    if (!parsedBody.success) {
        res.status(411).json({ 
            message : "Input Incorrect"
        })
        return
    }
    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.data.modelId,
        }
    })
    if (!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model not found"
        })
        return
    }

    const {request_id, response_url} = await falAiModel.generateImage(parsedBody.data.prompt, model?.tensorPath)


    const data = await prismaClient.outputImages.create({
        data: {
            prompt : parsedBody.data.prompt,
            userId : req.userId!,
            modelId : parsedBody.data.modelId,
            imageUrl: "",
            falAiRequestId: request_id,

        }
    })
    res.json({
        imageId: data.id,
    })
})
app.post("/pack/generate",authMiddleware , async(req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body)
    if (!parsedBody.success) {
        res.status(411).json({ 
            message : "Input Incorrect"
        })
        return
    }
    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId,
           
        }
    })
    
    

    let requestIds: {request_id :   string}[] =  await Promise.all(prompts.map(async(prompt) =>  await falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId)))


    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt, index) => ({
            prompt: prompt.prompt,
            userId: req.userId!,
            modelId: parsedBody.data.modelId,
            imageUrl: "",
            falAiRequestId: requestIds[index]?.request_id
        }))
    })
    res.json({
        imageId: images.map((image) => image.id),
    })
    
})
app.get("/pack/bulk", async(req, res) => {
    const packs = await prismaClient.packs.findMany({})
    res.json({
        packs: packs
    })
})
app.get("/image/bulk",authMiddleware ,async (req, res) => {
    const ids = req.query.images as string[]
    const limit = req.query.limit as string ?? "10"
    const offset = req.query.offset as string ?? "0"

    console.log(ids)

    const imagesData = await prismaClient.outputImages.findMany({
       where: {
        id: {in: ids},
        userId: req.userId!,
       },
    skip: parseInt(offset),
    take: parseInt(limit)
    })
    res.json({
        images: imagesData
    })
})
app.post("/fal-ai/webhook/train", async (req, res) => {
    const requestId = req.body.request_id as string
    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: requestId,
        },
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path,
        }
    })
    res.status(200).json({
        message: "Webhook received"
    })
})
app.post("/fal-ai/webhook/image", async (req, res) => {
    const requestId = req.body.request_id
    

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: requestId,
        },
        data: {
           
          status: "Generated",
          imageUrl: req.body.image_url,
        }
    })

    res.status(200).json({
        message: "Webhook received"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
