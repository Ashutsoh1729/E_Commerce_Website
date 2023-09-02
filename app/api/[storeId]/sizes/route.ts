import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const storeId = params.storeId;
        const { userId } = auth();
        const body = await req.json()

        const {
            name,
            value
        } = body;

        if (!userId) {
            return NextResponse.json("The user is not authenticated.", { status: 401 })
        }
        if (!name) {
            return NextResponse.json("Name is required.", { status: 401 })
        }
        if (!value) {
            return NextResponse.json("Billboard Id is required.", { status: 401 })
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

        const size = await prismadb.size.create({
            data: {
                name: name,
                value: value,
                storeId: storeId
            }
        })

        return NextResponse.json(size)



    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}