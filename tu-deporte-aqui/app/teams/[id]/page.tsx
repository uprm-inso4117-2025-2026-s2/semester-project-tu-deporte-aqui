'use client'

import { TeamInfo, League, teamInfosBSN, teamInfosBaseLBP, teamInfosLAI } from '../teamInfo'
import { usePathname } from 'next/navigation'

const Teams: Record<League, TeamInfo[]> = {
  "Baloncesto Superior Nacional": teamInfosBSN,
  "Liga de Baloncesto Puertorriqueña": teamInfosBaseLBP,
  "Liga Atlética Interuniversitaria": teamInfosLAI
}
 
export default function LocaleSwitcher() {
  const pathname = usePathname()
 
  return (
    <>
      {pathname}
    </>
  )
}