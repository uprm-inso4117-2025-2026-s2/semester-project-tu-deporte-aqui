'use client'

import { TeamInfo, League, teamInfosBSN, teamInfosBaseLBP, teamInfosLAI } from '../teamInfo'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Teams: Record<League, TeamInfo[]> = {
  "BSN": teamInfosBSN,
  "LBP": teamInfosBaseLBP,
  "LAI": teamInfosLAI
}
 
export default function LocaleSwitcher() {
  const pathname = usePathname()
  const league = decodeURI(pathname.substring(pathname.indexOf("/",1)+1, pathname.indexOf('-'))) as League
  const team = decodeURI(pathname.substring(pathname.indexOf("-") + 1))
  const teamInfo: TeamInfo = Teams[league].filter((teamInfo) => teamInfo.name = team)[0]

  return (
    <>
      <Image src={teamInfo.image} alt="team image" width={1400} height={1200} className='h-screen' />
      <p>{teamInfo.name}</p>
      <p>Wins: {teamInfo.wins}</p>
      <p>Losses: {teamInfo.losses}</p>
    </>
  )
}