"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

type Sport = "Basketball" | "Baseball" | "Volleyball";

interface TeamInfo {
  name: string,
  image: string,
  wins: number,
  losses: number
}

const teamInfosBB: TeamInfo[] = [
  {
    "name": "Metro Stars",
    "image": "/team-images/basketball/t1.jpeg",
    "wins": 3,
    "losses": 0
  },
  {
    "name": "Coastline Breakers",
    "image": "/team-images/basketball/t2.jpeg",
    "wins": 3,
    "losses": 2
  },
  {
    "name": "Summit Peaks",
    "image": "/team-images/basketball/t3.jpeg",
    "wins": 0,
    "losses": 2
  },
  {
    "name": "Harbor Giants",
    "image": "/team-images/basketball/t4.jpeg",
    "wins": 2,
    "losses": 2
  },
  {
    "name": "Empire Archers",
    "image": "/team-images/basketball/t5.jpeg",
    "wins": 1,
    "losses": 3
  },
  {
    "name": "Canyon Coyotes",
    "image": "/team-images/basketball/t6.jpeg",
    "wins": 2,
    "losses": 3
  },
  {
    "name": "Iron City Forge",
    "image": "/team-images/basketball/t7.jpeg",
    "wins": 4,
    "losses": 1
  },
  {
    "name": "Bay Area Pilots",
    "image": "/team-images/basketball/t8.jpeg",
    "wins": 1,
    "losses": 1
  },
  {
    "name": "Ridge Rebels",
    "image": "/team-images/basketball/t9.jpeg",
    "wins": 0,
    "losses": 2
  },
  {
    "name": "Skyline Comets",
    "image": "/team-images/basketball/t1.jpeg",
    "wins": 3,
    "losses": 3
  }
]

const teamInfosBaseB: TeamInfo[] = [
  {
    "name": "Midtown Blue Sox",
    "image": "/team-images/baseball/t1.jpeg",
    "wins": 12,
    "losses": 4
  },
  {
    "name": "Coastal Otters",
    "image": "/team-images/baseball/t2.jpeg",
    "wins": 9,
    "losses": 7
  },
  {
    "name": "Mountain Cats",
    "image": "/team-images/baseball/t3.jpeg",
    "wins": 5,
    "losses": 11
  },
  {
    "name": "Bayside Mariners",
    "image": "/team-images/baseball/t4.jpeg",
    "wins": 10,
    "losses": 6
  },
  {
    "name": "Capital Senators",
    "image": "/team-images/baseball/t5.jpeg",
    "wins": 8,
    "losses": 8
  },
  {
    "name": "Desert Rattlers",
    "image": "/team-images/baseball/t6.jpeg",
    "wins": 7,
    "losses": 9
  },
  {
    "name": "Steel Mill Grays",
    "image": "/team-images/baseball/t7.jpeg",
    "wins": 14,
    "losses": 2
  },
  {
    "name": "Pacific Aviators",
    "image": "/team-images/baseball/t8.jpeg",
    "wins": 11,
    "losses": 5
  },
  {
    "name": "Valley Vipers",
    "image": "/team-images/baseball/t9.jpeg",
    "wins": 3,
    "losses": 13
  },
  {
    "name": "Skyline Redwings",
    "image": "/team-images/baseball/t1.jpeg",
    "wins": 6,
    "losses": 10
  }
]

const teamInfosVB: TeamInfo[] = [
  {
    "name": "Metro High-Risers",
    "image": "/team-images/volleyball/t1.jpeg",
    "wins": 15,
    "losses": 3
  },
  {
    "name": "Coastal Wave",
    "image": "/team-images/volleyball/t2.jpeg",
    "wins": 12,
    "losses": 6
  },
  {
    "name": "Summit Peaks",
    "image": "/team-images/volleyball/t3.jpeg",
    "wins": 4,
    "losses": 14
  },
  {
    "name": "Bayside Breakers",
    "image": "/team-images/volleyball/t4.jpeg",
    "wins": 10,
    "losses": 8
  },
  {
    "name": "Capital Impact",
    "image": "/team-images/volleyball/t5.jpeg",
    "wins": 9,
    "losses": 9
  },
  {
    "name": "Desert Heat",
    "image": "/team-images/volleyball/t6.jpeg",
    "wins": 7,
    "losses": 11
  },
  {
    "name": "Iron City Spikes",
    "image": "/team-images/volleyball/t7.jpeg",
    "wins": 17,
    "losses": 1
  },
  {
    "name": "Pacific Flight",
    "image": "/team-images/volleyball/t8.jpeg",
    "wins": 11,
    "losses": 7
  },
  {
    "name": "Valley Volleys",
    "image": "/team-images/volleyball/t9.jpeg",
    "wins": 2,
    "losses": 16
  },
  {
    "name": "Skyline Storm",
    "image": "/team-images/volleyball/t1.jpeg",
    "wins": 8,
    "losses": 10
  }
]

export default function Page() {
  const [chosenSport, setChosenSport] = useState<Sport>("Basketball")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currTeamsInfo, setCurrTeamsInfo] = useState<TeamInfo[]>(teamInfosBB)

  // simulating time it takes to load content
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [chosenSport])

  const backgrounds: Record<Sport, string> = {
    Basketball: "bg-[url('/backgrounds/basketball.jpg')]",
    Baseball: "bg-[url('/backgrounds/baseball.jpg')]",
    Volleyball: "bg-[url('/backgrounds/volleyball.jpg')]"
  }

  const handleSportChange = (sport: Sport) => {
    setIsLoading(true);
    setChosenSport(sport);

    setCurrTeamsInfo({
      "Basketball": teamInfosBB,
      "Baseball": teamInfosBaseB,
      "Volleyball": teamInfosVB
    }[sport])
  }

  return (
    <div className={`flex h-screen flex-col items-center ${backgrounds[chosenSport]} bg-cover`}>
      <SelectSport handleChange={handleSportChange} />
      <h1 className="text-white text-2xl font-bold text-shadow-lg">This Season</h1>
      <Teams isLoading={isLoading} teamsInfo={currTeamsInfo} sport={chosenSport} />
    </div>
  )
}


function SelectSport({handleChange} : { handleChange: (sport: Sport) => void }) {
  return (
    <div className="pt-5 pb-10 bg-cover w-full flex justify-center">
      <Select defaultValue="Basketball" onValueChange={handleChange}>
        <SelectTrigger className="w-full max-w-48 bg-background">
          <SelectValue placeholder="Select a Sport" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sports</SelectLabel>
            <SelectItem value="Basketball">Basketball</SelectItem>
            <SelectItem value="Baseball">Baseball</SelectItem>
            <SelectItem value="Volleyball">Volleyball</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function Teams(props: {isLoading: boolean, teamsInfo: TeamInfo[], sport: Sport}) {
  return (
    <ScrollArea className="backdrop-blur-md overflow-hidden rounded-2xl my-2 not-sm:w-full">
      <div className="w-full p-10 flex flex-col gap-5 items-center">
        {props.teamsInfo.sort((a: TeamInfo, b: TeamInfo) => (b.wins-b.losses) - (a.wins-a.losses)).map((_, i) =>
        <TeamCard key={i} isLoading={props.isLoading} teamInfo={props.teamsInfo[i]} sport={props.sport} />)}
      </div>
    </ScrollArea>
  )
}

function TeamCard(props: {isLoading: boolean, teamInfo: TeamInfo, sport: Sport}) {
  if (props.isLoading)
    return (
      <Card className="sm:w-100 h-22">
        <CardContent className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-50" />
          </div>
        </CardContent>
      </Card>
    )
  else 
    return (
      <Link href={`teams/${props.sport.toLowerCase()}-${props.teamInfo.name.toLowerCase().replace(/\s/g, '-')}`}>
        <Card className="sm:w-100 h-22">
          <CardContent className="flex items-center gap-4">
            <Image width={100} height={100} className="h-12 w-12 rounded-full" alt="Team Image" src={props.teamInfo.image}/>
            <div className="space-y-2">
              <div className="text-xl">{props.teamInfo.name}</div>
              <div className="flex justify-between gap-4">
                <div>Games: {props.teamInfo.wins + props.teamInfo.losses}</div>
              </div>
            </div>
            <div className="flex flex-col justify-between ml-auto gap-2">
              <p className="bg-green-300 px-3 rounded-sm">{props.teamInfo.wins}</p>
              <p className="bg-red-300 px-3 rounded-sm">{props.teamInfo.losses}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
}