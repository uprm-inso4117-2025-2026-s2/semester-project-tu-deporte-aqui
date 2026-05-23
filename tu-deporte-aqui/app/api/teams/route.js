import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // here goes supabase url
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // here goes the key for the supabase
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("id,name,league,city,logo_url");

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), // catches errors and returns a json of it
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify(data), //return the json file as asked
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }), // catches errors and returns a json of it
      { status: 500 }
    );
  }
}