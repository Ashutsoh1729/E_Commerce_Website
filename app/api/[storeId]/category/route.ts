import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        
    } catch (error) {
        console.log(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}