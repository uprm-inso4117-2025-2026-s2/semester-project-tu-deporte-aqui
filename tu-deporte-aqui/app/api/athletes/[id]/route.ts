import { NextResponse } from "next/server";

const nbaPlayers = [
  { id: "nba-001", first_name: "LeBron", last_name: "James", position: "Forward", number: 23, team: "Los Angeles Lakers", league: "NBA", city: "Los Angeles" },
  { id: "nba-002", first_name: "Stephen", last_name: "Curry", position: "Guard", number: 30, team: "Golden State Warriors", league: "NBA", city: "San Francisco" },
  { id: "nba-003", first_name: "Kevin", last_name: "Durant", position: "Forward", number: 35, team: "Phoenix Suns", league: "NBA", city: "Phoenix" },
  { id: "nba-004", first_name: "Giannis", last_name: "Antetokounmpo", position: "Forward", number: 34, team: "Milwaukee Bucks", league: "NBA", city: "Milwaukee" },
  { id: "nba-005", first_name: "Nikola", last_name: "Jokic", position: "Center", number: 15, team: "Denver Nuggets", league: "NBA", city: "Denver" },
  { id: "nba-006", first_name: "Luka", last_name: "Doncic", position: "Guard", number: 77, team: "Dallas Mavericks", league: "NBA", city: "Dallas" },
  { id: "nba-007", first_name: "Jayson", last_name: "Tatum", position: "Forward", number: 0, team: "Boston Celtics", league: "NBA", city: "Boston" },
  { id: "nba-008", first_name: "Joel", last_name: "Embiid", position: "Center", number: 21, team: "Philadelphia 76ers", league: "NBA", city: "Philadelphia" },
  { id: "nba-009", first_name: "Anthony", last_name: "Davis", position: "Forward/Center", number: 3, team: "Los Angeles Lakers", league: "NBA", city: "Los Angeles" },
  { id: "nba-010", first_name: "Shai", last_name: "Gilgeous-Alexander", position: "Guard", number: 2, team: "Oklahoma City Thunder", league: "NBA", city: "Oklahoma City" },
  { id: "nba-011", first_name: "Victor", last_name: "Wembanyama", position: "Center", number: 1, team: "San Antonio Spurs", league: "NBA", city: "San Antonio" },
  { id: "nba-012", first_name: "Anthony", last_name: "Edwards", position: "Guard", number: 5, team: "Minnesota Timberwolves", league: "NBA", city: "Minnesota" },
  { id: "nba-013", first_name: "Devin", last_name: "Booker", position: "Guard", number: 1, team: "Phoenix Suns", league: "NBA", city: "Phoenix" },
  { id: "nba-014", first_name: "Ja", last_name: "Morant", position: "Guard", number: 12, team: "Memphis Grizzlies", league: "NBA", city: "Memphis" },
  { id: "nba-015", first_name: "Damian", last_name: "Lillard", position: "Guard", number: 0, team: "Milwaukee Bucks", league: "NBA", city: "Milwaukee" },
  { id: "nba-016", first_name: "Bam", last_name: "Adebayo", position: "Center", number: 13, team: "Miami Heat", league: "NBA", city: "Miami" },
  { id: "nba-017", first_name: "Jimmy", last_name: "Butler", position: "Forward", number: 22, team: "Miami Heat", league: "NBA", city: "Miami" },
  { id: "nba-018", first_name: "Kyrie", last_name: "Irving", position: "Guard", number: 11, team: "Dallas Mavericks", league: "NBA", city: "Dallas" },
  { id: "nba-019", first_name: "Kawhi", last_name: "Leonard", position: "Forward", number: 2, team: "LA Clippers", league: "NBA", city: "Los Angeles" },
  { id: "nba-020", first_name: "Paul", last_name: "George", position: "Forward", number: 8, team: "Philadelphia 76ers", league: "NBA", city: "Philadelphia" },
  { id: "nba-021", first_name: "Donovan", last_name: "Mitchell", position: "Guard", number: 45, team: "Cleveland Cavaliers", league: "NBA", city: "Cleveland" },
  { id: "nba-022", first_name: "Jalen", last_name: "Brunson", position: "Guard", number: 11, team: "New York Knicks", league: "NBA", city: "New York" },
  { id: "nba-023", first_name: "Tyrese", last_name: "Haliburton", position: "Guard", number: 0, team: "Indiana Pacers", league: "NBA", city: "Indiana" },
  { id: "nba-024", first_name: "Jaylen", last_name: "Brown", position: "Guard/Forward", number: 7, team: "Boston Celtics", league: "NBA", city: "Boston" },
  { id: "nba-025", first_name: "Zion", last_name: "Williamson", position: "Forward", number: 1, team: "New Orleans Pelicans", league: "NBA", city: "New Orleans" },
  { id: "nba-026", first_name: "Trae", last_name: "Young", position: "Guard", number: 11, team: "Atlanta Hawks", league: "NBA", city: "Atlanta" },
  { id: "nba-027", first_name: "LaMelo", last_name: "Ball", position: "Guard", number: 1, team: "Charlotte Hornets", league: "NBA", city: "Charlotte" },
  { id: "nba-028", first_name: "Paolo", last_name: "Banchero", position: "Forward", number: 5, team: "Orlando Magic", league: "NBA", city: "Orlando" },
  { id: "nba-029", first_name: "Chet", last_name: "Holmgren", position: "Forward/Center", number: 7, team: "Oklahoma City Thunder", league: "NBA", city: "Oklahoma City" },
  { id: "nba-030", first_name: "Jamal", last_name: "Murray", position: "Guard", number: 27, team: "Denver Nuggets", league: "NBA", city: "Denver" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const player = nbaPlayers.find((player) => player.id === id);

  if (!player) {
    return NextResponse.json(
      { data: null, error: "Athlete not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: {
      id: player.id,
      team_id: null,
      first_name: player.first_name,
      last_name: player.last_name,
      position: player.position,
      number: player.number,
      teams: {
        id: null,
        name: player.team,
        league: player.league,
        city: player.city,
        logo_url: null,
      },
    },
    error: null,
  });
}