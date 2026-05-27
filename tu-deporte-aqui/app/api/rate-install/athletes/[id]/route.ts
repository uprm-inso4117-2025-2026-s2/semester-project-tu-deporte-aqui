import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { data, error } = await supabase
      .from("athletes")
      .select(`
        id,
        team_id,
        first_name,
        last_name,
        position,
        number,
        teams (
          id,
          name,
          league,
          city,
          logo_url
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}