"use client"

import { AngryIcon, FrownIcon, MehIcon, SmileIcon, LaughIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Children } from 'react';
import { Button } from "../ui/button";
import Image from "next/image";

export default function RateInstall() {
  const [isPWA, setIsPWA] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(true);
  const [choice, setChoice] = useState<string>("");

  useEffect(() => {
    const mql = window.matchMedia('(display-mode: standalone)');

    (() => {
      setIsPWA(mql.matches)

      const isDismissed: string | null = localStorage.getItem("dismissed-install-rating");
      if (isDismissed == null) {
        setDismissed(false)
      }
    })();

  }, [])

  const handleOptionChange = (value: string) => {
    setChoice(value);
  }

  const handleSubmission = (value: string) => {
    setDismissed(true);
    localStorage.setItem("dismissed-install-rating", "true");
  }

  if (/*!isPWA || */dismissed) return

  return (
    <Card className="w-full max-w-sm fixed bottom-0 left-1/2 -translate-x-1/2">
      <CardHeader>
        <CardTitle>How easy was it to add this app to your home screen?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between">
          <RatingOption onUserChange={handleOptionChange} choice={choice} value="Very bad"><AngryIcon className="w-full" size={30} /></RatingOption>
          <RatingOption onUserChange={handleOptionChange}choice={choice} value="Bad"><FrownIcon className="w-full" size={30} /></RatingOption>
          <RatingOption onUserChange={handleOptionChange}choice={choice} value="Ok"><MehIcon className="w-full" size={30} /></RatingOption>
          <RatingOption onUserChange={handleOptionChange}choice={choice} value="Good"><SmileIcon className="w-full" size={30} /></RatingOption>
          <RatingOption onUserChange={handleOptionChange} choice={choice} value="Great"><LaughIcon className="w-full" size={30} /></RatingOption>
        </div>

      </CardContent>

      <CardContent className="flex justify-between">
        <Button onClick={() => handleSubmission("dismissed")} variant="destructive">Dismiss</Button>
        <Button onClick={() => handleSubmission(choice)} type="submit" disabled={!choice}>Submit</Button>
      </CardContent>
    </Card>
  )
}

function RatingOption({value, choice, onUserChange, children} : {value: string, choice: string, onUserChange: (value: string) => void, children: React.ReactNode}) {
  return (
    <label className="w-16 cursor-pointer">
      <div className={`select-none hover:brightness-100 brightness-${choice == value? '100' : '50'}`}>
        {children}
      </div>
      <p className="text-xs text-center mt-2">{value}</p>
      <input onChange={() => onUserChange(value)} value={value} name="pwa-install-rating" type="radio" className="hidden" />
    </label>
  )
}