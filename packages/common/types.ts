import {z} from "zod"

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Others"]),
    age: z.number(),
    ethnicity: z.enum(["Asian_American","East_Asian" ,"Black", "White", "Hispanic", "South_Asian", "Middle_Eastern", "South_East_Asian", "Pacific"]),
    eyeColor: z.enum(["Brown", "Blue", "Green", "Gray", "Hazel"]),
    bald: z.boolean(),
    zipUrl : z.string()
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})

export const GenerateImagesFromPack = z.object({
    modelId : z.string(),
    packId : z.string()
})

