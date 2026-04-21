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
import { TeamInfo, League, teamInfosBSN, teamInfosBaseLBP, teamInfosLAI } from './teamInfo'



export default function Page() {
  const [chosenLeague, setChosenLeague] = useState<League>("BSN")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currTeamsInfo, setCurrTeamsInfo] = useState<TeamInfo[]>(teamInfosBSN)

  // simulating time it takes to load content
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [chosenLeague])

  const backgrounds: Record<League, string> = {
    "BSN": "bg-[url('/backgrounds/BSN.jpg')]",
    "LBP": "bg-[url('/backgrounds/LBP.jpg')]",
    "LAI": "bg-[url('/backgrounds/LAI.jpg')]"
  }

  const handleLeagueChange = (league: League) => {
    setIsLoading(true);
    setChosenLeague(league);

    setCurrTeamsInfo({
      "BSN": teamInfosBSN,
      "LBP": teamInfosBaseLBP,
      "LAI": teamInfosLAI
    }[league])
  }

  return (
    <div className={`flex h-screen flex-col items-center ${backgrounds[chosenLeague]} bg-cover`}>
      <SelectLeague handleChange={handleLeagueChange} />
      <h1 className="text-white text-2xl font-bold text-shadow-lg">This Season</h1>
      <Teams isLoading={isLoading} teamsInfo={currTeamsInfo} league={chosenLeague} />
    </div>
  )
}


function SelectLeague({handleChange} : { handleChange: (league: League) => void }) {
  return (
    <div className="pt-5 pb-10 bg-cover w-full flex justify-center">
      <Select defaultValue="BSN" onValueChange={handleChange}>
        <SelectTrigger className="w-full max-w-48 bg-background">
          <SelectValue placeholder="Select a League" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Leagues</SelectLabel>
            <SelectItem value="BSN">BSN (Baloncesto Superior Nacional)</SelectItem>
            <SelectItem value="LBP">LBP (Liga de Baloncesto Puertorriqueña)</SelectItem>
            <SelectItem value="LAI">LAI (Liga Atlética Interuniversitaria)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function Teams(props: {isLoading: boolean, teamsInfo: TeamInfo[], league: League}) {
  return (
    <ScrollArea className="backdrop-blur-md overflow-hidden rounded-2xl my-2 not-sm:w-full">
      <div className="w-full p-10 flex flex-col gap-5 items-center">
        {props.teamsInfo.sort((a: TeamInfo, b: TeamInfo) => (b.wins-b.losses) - (a.wins-a.losses)).map((_, i) =>
        <TeamCard key={i} isLoading={props.isLoading} teamInfo={props.teamsInfo[i]} league={props.league} />)}
      </div>
    </ScrollArea>
  )
}

function TeamCard(props: {isLoading: boolean, teamInfo: TeamInfo, league: League}) {
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
      <Link href={`teams/${props.league.toLowerCase()}-${props.teamInfo.name.toLowerCase().replace(/\s/g, '-')}`}>
        <Card className="sm:w-100 h-22">
          <CardContent className="flex items-center gap-4">
            <Image width={100} height={100} className="h-12 w-12 rounded-full" alt="Team Image" src={props.teamInfo.image}/>
            <div className="space-y-2 grow-0 overflow-hidden">
              <div className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">{props.teamInfo.name}</div>
              <div className="flex justify-between gap-4">
                <div>Games: {props.teamInfo.wins + props.teamInfo.losses}</div>
              </div>
            </div>
            <div className="flex flex-col justify-between ml-auto gap-2 ">
              <p className="bg-green-300 px-3 rounded-sm">{props.teamInfo.wins}</p>
              <p className="bg-red-300 px-3 rounded-sm">{props.teamInfo.losses}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
}