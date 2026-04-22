'use client'

import { TeamInfo, League, teamInfosBSN, teamInfosBaseLBP, teamInfosLAI, Player, PastSeasonStats } from '../teamInfo'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Frown, LocateFixed, Medal, Ruler } from 'lucide-react'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"

const Teams: Record<League, TeamInfo[]> = {
  "BSN": teamInfosBSN,
  "LBP": teamInfosBaseLBP,
  "LAI": teamInfosLAI
}
 
export default function LocaleSwitcher() {
  const pathname = usePathname()
  const league = decodeURI(pathname.substring(pathname.indexOf("/",1)+1, pathname.indexOf('-'))) as League
  const team = decodeURI(pathname.substring(pathname.indexOf("-") + 1))
  const teamInfo: TeamInfo = Teams[league].filter((teamInfo) => teamInfo.name == team)[0]
  const pastSeason = teamInfo.pastSeasonStats && teamInfo.pastSeasonStats[0]

  return (
    <div className='flex flex-col gap-5 m-10'>
      <div className='mb-20'>
        <CardTitle className='text-6xl font-bold text-center mb-4'>{teamInfo.name}</CardTitle>
        <CardContent className='flex flex-col items-center gap-10'>
          <Image src={teamInfo.image} alt="team image" width={200} height={200}/>
          <div className='flex gap-20'>
            <p className='flex gap-1'><Medal /> Wins: {teamInfo.wins}</p>
            <p className='flex gap-1'><Frown /> Losses: {teamInfo.losses}</p>
          </div>
          <div className='bg-red-500 h-4 rounded-sm overflow-clip w-[30%]'>
            <div style={{width: `${Math.floor(teamInfo.wins/(teamInfo.wins + teamInfo.losses) * 100)}%`}} className={`bg-green-500 h-4`}></div>
          </div>
        </CardContent>
      </div>
      {teamInfo.coaches?.map((coach) =>
        <Card key={coach.name}>
          <CardTitle className='text-xl font-bold text-center'>{coach.role}</CardTitle>
          <CardContent className='text-center'>
            {coach.name}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardTitle className='text-xl font-bold text-center'>Players</CardTitle>
        <CardContent className='flex gap-10 flex-wrap justify-center'>
          {
            teamInfo.players?.map((player: Player) => 
              <Card key={player.name + player.height + player.position} className='bg-accent relative w-100'>
                <CardTitle className='text-xl mx-2 flex justify-between'>
                  {player.name}
                  {player.isImport && <Badge className='-translate-y-2'>Import</Badge>}
                </CardTitle>
                <CardContent>
                  <p className='flex gap-2'><Ruler/> Height: {player.height}</p>
                  <p className='flex gap-2'><LocateFixed/> Position: {player.position}</p>
                </CardContent>
              </Card>
            )
          }
        </CardContent>
      </Card>

      <div className='flex gap-5'>
        { pastSeason &&
          <Card className='relative flex-1'>
            <CardTitle className='text-xl mx-2 flex justify-between font-bold'>
              {pastSeason.season} Season
            </CardTitle>
            <CardContent className='flex flex-col gap-4'>
              <p className='flex gap-1'><Medal/> Wins: {pastSeason.wins}</p>
              <p className='flex gap-1'><Frown/> Losses: {pastSeason.losses}</p>
              <div className='bg-red-500 h-4 rounded-sm overflow-clip max-w-100'>
                <div style={{width: `${Math.floor(pastSeason.wins/(pastSeason.wins + pastSeason.losses) * 100)}%`}} className={`bg-green-500 h-4`}></div>
              </div>
            </CardContent>
            {pastSeason.notes &&
              <CardFooter>
                {pastSeason.notes}
              </CardFooter>
            }
          </Card>
        }
        {!pastSeason &&
          <Card className='relative flex-1'>
            <CardTitle className='text-xl mx-2 flex justify-between font-bold'>
              Previous Season
            </CardTitle>
            <CardContent>
              No data
            </CardContent>
          </Card>
        }
        <Card className='flex-1'>
          <CardTitle className='text-xl font-bold text-center'>Team Links</CardTitle>
          <CardContent className='flex gap-24 justify-center items-center h-full'>
            {!teamInfo.socialLinks && <p>No data</p>}
            {teamInfo.socialLinks &&
              Object.entries(teamInfo.socialLinks)?.map(([platform, link]) =>
                <Link target='_blank' className='text-blue-600' key={platform} href={link}>{platform}</Link>
              )
            }
          </CardContent>
        </Card>
      </div>
    </div>
  )
}