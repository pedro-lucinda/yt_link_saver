import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/config/variables";

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  try {
    console.log({ API_URL });
    const response = await fetch(`${API_URL}/links/`, {
      method: "GET",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to get Links list",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(`${API_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to create Link",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
