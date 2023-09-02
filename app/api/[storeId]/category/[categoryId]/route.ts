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
    { params }: { params: { categoryId: string, storeId: string } }
) {
    try {
        const { userId } = auth();
        const categoryId = params.categoryId;
        const storeId = params.storeId;
        const body = await req.json();

        const {
            name,
            billboardId
        } = body;


        if (!userId) {
            return NextResponse.json("Unauthorized", { status: 403 })
        }
        if (!name) {
            return NextResponse.json("Name is required.", { status: 400 })
        }
        if (!billboardId) {
            return NextResponse.json("Billboard Name is required.", { status: 400 })
        }
        if (!categoryId) {
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

        const billboard = await prismadb.category.update({
            where: {
                id: categoryId
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string, storeId: string } }
) {
    try {

        const { userId } = auth();
        const categoryId = params.categoryId;
        const storeId = params.storeId;

        if (!categoryId) {
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

        const category = await prismadb.category.delete({
            where: {
                id: categoryId,
            }
        })
        return NextResponse.json(category)

        
    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}