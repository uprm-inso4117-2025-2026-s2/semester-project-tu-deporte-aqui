"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button";
import Image from "next/image";

export default function RateInstall() {
  const [isPWA, setIsPWA] = useState<boolean>(false);
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(display-mode: standalone)');

    (() => {
      setIsPWA(mql.matches)
    })();
    
  }, [])

  const handleOptionChange = (value: string) => {
    setChoice(value);
  }

  // if (isPWA) {
  //   return (
  //   <div>HELLO</div>
  //   )
  // }
  // else {
  //   return (<></>)
  // }

  return (
    <Card className="w-full max-w-sm fixed bottom-0 left-1/2 -translate-x-1/2">
      <CardHeader>
        <CardTitle>How easy was it to add this app to your home screen?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between">
          <RatingOption onUserChange={handleOptionChange} imgSrc="/icons/very-sad-face.png" choice={choice} value="Very bad"/>
          <RatingOption onUserChange={handleOptionChange} imgSrc="/icons/sad-face.png" choice={choice} value="Bad"/>
          <RatingOption onUserChange={handleOptionChange} imgSrc="/icons/neutral-face.png" choice={choice} value="Ok"/>
          <RatingOption onUserChange={handleOptionChange} imgSrc="/icons/happy-face.png" choice={choice} value="Good"/>
          <RatingOption onUserChange={handleOptionChange} imgSrc="/icons/very-happy-face.png" choice={choice} value="Great"/>
        </div>

      </CardContent>

      <CardContent className="flex justify-between">
        <Button variant="destructive">Dismiss</Button>
        <Button type="submit" disabled={!choice}>Submit</Button>
      </CardContent>
    </Card>
  )
}

function RatingOption({imgSrc, value, choice, onUserChange} : {imgSrc: string, value: string, choice: string | null, onUserChange: (value: string) => void}) {
  return (
    <>
      <label className="w-16 cursor-pointer">
        <Image className={`select-none ml-auto mr-auto hover:brightness-100 brightness-${choice == value? '100' : '50'}`} alt={value} src={imgSrc} height={500} width={500}></Image>
        <p className="text-xs text-center">{value}</p>
        <input onChange={() => onUserChange(value)} value={value} name="pwa-install-rating" type="radio" className="hidden" />
      </label>
    </>
  )
}