import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return NextResponse.json("BillboardId is required", { status: 400 })
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[Billboard_GET]", error);
        return NextResponse.json("Internal Server Error", { status: 500 });

    }
}

// This function is used to update the billboard
export async function PATCH(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) {
    try {

        const { userId } = auth();
        const billboardId = params.billboardId;
        const storeId = params.storeId;
        const body = await req.json();
        const { imageUrl, label } = body;

        if (!userId) {
            return NextResponse.json("Unauthorized",{status:403})
        }
        if (!imageUrl) {
            return NextResponse.json("Image URL is required.",{status:400})
        }
        if (!label) {
            return NextResponse.json("Label is required.",{status:400})
        }
        if (!billboardId) {
            return NextResponse.json("Billboard Id is required.",{status:400})
        }

        const storeByUserId = await prismadb.store.findUnique({
            where: {
                id: storeId
            }
        })

        if (!storeByUserId) {
            return NextResponse.json("Unauthorized",{status:403})
        }

        const billboard = await prismadb.billboard.update({
            where: {
                id: billboardId
            },
            data: {
                label: label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[Billboard_PATCH]", error);
        return NextResponse.json("Internal Server Error", { status: 500 });

    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string, storeId: string } }
) {
    try {

        const { userId } = auth();
        const billboardId = params.billboardId;
        if (!params.billboardId) {
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
        const billboard = await prismadb.billboard.delete({
            where: {
                id: billboardId,
            }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log(error);
        return NextResponse.json("Internal Server Error", { status: 500 });

    }
}





