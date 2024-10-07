import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/config/variables";

export const maxDuration = 120;

export async function DELETE(
  req: NextRequest,
  { params }: { params: { link_id: string } },
) {
  const link_id = params.link_id;
  if (!link_id) {
    return NextResponse.json({ error: "Missing link_id" }, { status: 422 });
  }

  try {
    const response = await fetch(`${API_URL}/links/${link_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to delete Link",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
