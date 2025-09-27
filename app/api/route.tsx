import { NextRequest, NextResponse } from "next/server";
import { authHandler, AuthResp } from "../../utils/auth";
import { type InitData } from "@tma.js/init-data-node";

export async function POST(request: NextRequest) {
    const authResp: AuthResp = authHandler(request);

    if (authResp.authStatus !== 200) {
        return NextResponse.json({ error: authResp.error }, { status: authResp.authStatus });
    }

    const userData: InitData | undefined = authResp?.userData;

    return NextResponse.json({ 
        status: 200,
        name: userData?.user?.first_name,
        id: userData?.user?.id, 
        photoUrl: userData?.user?.photo_url,
        username: userData?.user?.username
    });
}