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
    Basketball: 'basketball.jpg',
    Baseball: 'baseball.jpg',
    Volleyball: 'volleyball.jpg'
  }

  const handleSportChange = (sport: Sport) => {
    setChosenSport(sport);
  }

  return (
    <div className={`flex h-screen flex-col items-center gap-10 pt-5 bg-[url('/backgrounds/${backgrounds[chosenSport]}')] bg-cover`}>
      <SelectSport handleChange={handleSportChange} />
      <Teams />
    </div>
  )
}


function SelectSport({handleChange} : { handleChange: (sport: Sport) => void }) {
  return (
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
  )
}

function Teams() {
  return (
    <ScrollArea className="bg-foreground overflow-hidden rounded-2xl">
      <div className="w-full p-10 flex flex-col gap-5 items-center">
        {[...Array(20)].map((_, i) => <TeamCard key={i} />)}
      </div>
    </ScrollArea>
  )
}

function TeamCard() {
  return (
    <Card className="w-100">
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