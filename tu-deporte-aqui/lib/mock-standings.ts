export interface MockStandings{
    id: string
    team_id : string
    league: string
    season : string
    wins : number
    losses: number

}
export const mockStandings : MockStandings[] =[
    //team 1
    //Indios de Mayaguez
    {id: "1",
    team_id : "team-1",
    league: "LBPRC",
    season: "2026",
    wins: 12,
    losses: 21,
    }, 
//Team 2
//Criollos de Caguas
    {id: "2",
    team_id : "team-2",
    league: "LBPRC",
    season: "2026",
    wins: 20,
    losses: 20,
    }, 

// team 3
//Leones de Ponce
    {id: "3",
    team_id : "team-3",
    league: "LBPRC",
    season: "2026",
    wins: 23,
    losses: 17,
    }, 


// team 4
// Gigantes de Carolina
    {id: "4",
    team_id : "team-4",
    league: "LBPRC",
    season: "2026",
    wins: 19,
    losses: 21,
    }, 

// team 5
//Cangrejeros de Santurce
    {id: "5",
    team_id : "team-5",
    league: "LBPRC",
    season: "2026",
    wins: 28,
    losses: 12,
    }, 
]