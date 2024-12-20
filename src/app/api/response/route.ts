
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    const header = await req.json();
    const search = header.search;
    const API_KEY:string = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let prompt = search;
    if(search.length > 10){
        prompt = search  + ".Answer in 4 lines";
    }
    const result = await model.generateContent(prompt);
    const responseText = result.response.text()
    return Response.json({
        responseText
    })
}
