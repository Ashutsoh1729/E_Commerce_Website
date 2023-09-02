import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function GET(req: Request) {
    try {

    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}


export async function PATCH(
    req: Request,
    { params }: { params: { sizeId: string, storeId: string } }
) {
    try {

        const { userId } = auth();
        const sizeId = params.sizeId;
        const storeId = params.storeId;
        const body = await req.json();

        const {
            name,
            value
        } = body;

        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 403 })
        }
        if (!name) {
            return NextResponse.json("Name is required.", { status: 400 })
        }
        if (!value) {
            return NextResponse.json("Billboard Name is required.", { status: 400 })
        }
        if (!sizeId) {
            return NextResponse.json("Category Id is required.", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findUnique({
            where: {
                id: storeId
            }
        })

        if (!storeByUserId) {
            return NextResponse.json("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.update({
            where: {
                id: sizeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)





    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { sizeId: string, storeId: string } }
) {
    try {


        const { userId } = auth();
        const sizeId = params.sizeId;
        const storeId = params.storeId;

        if (!sizeId) {
            return NextResponse.json("BillboardId is required", { status: 400 })
        }
        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 403 })
        }
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return NextResponse.json("Unauthorized", { status: 403 })
        }

        const size = await prismadb.size.delete({
            where: {
                id: sizeId,
            }
        })
        return NextResponse.json(size)

    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}






