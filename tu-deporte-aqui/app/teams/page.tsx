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
import { useState } from "react"

type Sport = "Basketball" | "Baseball" | "Volleyball";

export default function Page() {
  const [chosenSport, setChosenSport] = useState<Sport>("Basketball")

  const backgrounds: Record<Sport, string> = {
    Basketball: "bg-[url('/backgrounds/basketball.jpg')]",
    Baseball: "bg-[url('/backgrounds/baseball.jpg')]",
    Volleyball: "bg-[url('/backgrounds/volleyball.jpg')]"
  }

  const handleSportChange = (sport: Sport) => {
    setChosenSport(sport);
  }

  return (
    <div className={`flex h-screen flex-col items-center ${backgrounds[chosenSport]} bg-cover`}>
      <SelectSport handleChange={handleSportChange} />
      <Teams />
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

function Teams() {
  return (
    <ScrollArea className="backdrop-blur-md overflow-hidden rounded-2xl my-2 not-sm:w-full">
      <div className="w-full p-10 flex flex-col gap-5 items-center">
        {[...Array(20)].map((_, i) => <TeamCard key={i} />)}
      </div>
    </ScrollArea>
  )
}

function TeamCard() {
  return (
    <Card className="sm:w-100">
      <CardContent className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-62.5" />
          <Skeleton className="h-4 w-50" />
        </div>
      </CardContent>
    </Card>
  )
}