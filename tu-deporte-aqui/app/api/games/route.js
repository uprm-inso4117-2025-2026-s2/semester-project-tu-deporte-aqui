// need to install -> 'npm install' y 'npm install @supabase/supabase-js'
// this has to be done in the root of project, in the folder tu-deporte-aqui
// need to install -> 'npm install' y 'npm install @supabase/supabase-js'
// this has to be done in the root of project, in the folder tu-deporte-aqui
// file .env.local also has to be created (in root aswell) with the following content only:
// NEXT_PUBLIC_SUPABASE_URL=https://iehsdbvufggagbjylmwm.supabase.co
// SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaHNkYnZ1ZmdnYWdianlsbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjYxNjksImV4cCI6MjA4ODQwMjE2OX0.PFF5lKopILSuYDClo6v_bV3vn_XJQo1xY1fiaLy2-H8
// After doing all of that, go to the terminal in the root and run "npm run dev"
// And in the browser http://localhost:3000/api/games
// This shows the data thats being collected from the tables in the supabase (if empty then the table in the supabase is probable empty)

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // here goes supabase url
  process.env.SUPABASE_SERVICE_ROLE_KEY // here goes the key for the supabase
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("id,home_team:home_team_id (id,name),away_team:away_team_id (id,name),league,season,game_date,start_time,venue,status,home_score,away_score");

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