import prismadb from "@/lib/prismadb";
import { auth, useAuth } from "@clerk/nextjs";

import { NextResponse } from "next/server";


// It is for the creation of the New Billboard


export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
    ) {
    try {
        
        const body = await req.json();
        const storeId = params.storeId;
        const {
            imageUrl,
            label,
        } = body;

        // console.log(label, imageUrl);
        
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json("The user is not authenticated.",{status: 401})
        }
        if (!imageUrl) {
            return NextResponse.json("ImageURL is required.",{status: 400})
        }
        if (!label) {
            return NextResponse.json("Label is required.",{status: 400})
        }
        if (!storeId) {
            return NextResponse.json("StoreId is required.",{status: 400})
        }

        if (userId == null) { 
            return NextResponse.json("Unauthorized.", { status: 400 })
        }


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId: userId
            }
        })

        if (!storeByUserId) { 
            return NextResponse.json("Unauthorized.", { status: 400 })
        }

        
        const billboard = await prismadb.billboard.create({
            data: {
                imageUrl,
                label,
                storeId
            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("API_BILLBOARD_ROUTE", error);
        return new NextResponse("Internal Server Error", {status: 500})
        
    }
}



export async function GET(req:Request) {
    try {
        
    } catch (error) {
        console.log(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
        
    }
}