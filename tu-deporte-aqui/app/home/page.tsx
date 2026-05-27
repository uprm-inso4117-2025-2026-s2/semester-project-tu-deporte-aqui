"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Trophy,
  Radio,
  Newspaper,
  Home,
  Info,
  Search,
  Menu,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ChevronRight,
} from "lucide-react"
import { logoutUser } from "@/lib/auth"
import { supabase } from "@/lib/supabaseClient"

// ─── Mock Data ───────────────────────────────────────────────────────────────

const LIVE_GAMES = [
  { id: 1, sport: "Basketball", team1: "Capitanes", score1: 75, team2: "Vaqueros", score2: 75, time: "3:45 Q4", color: "from-red-400 to-red-600" },
  { id: 2, sport: "Baseball", team1: "Criollos", score1: 5, team2: "Indios", score2: 1, time: "Top 7", color: "from-blue-400 to-blue-600" },
  { id: 3, sport: "Volleyball", team1: "Mets", score1: 2, team2: "Cangrejeros", score2: 1, time: "Set 3", color: "from-purple-400 to-pink-500" },
  { id: 4, sport: "Soccer", team1: "Puerto Rico FC", score1: 1, team2: "Islanders", score2: 3, time: "75'", color: "from-green-400 to-green-600" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#", icon: Home },
  { label: "Live Games", href: "#live-games", icon: Radio },
  { label: "Standings", href: "#standings", icon: Trophy },
  { label: "News", href: "#news", icon: Newspaper },
  { label: "About", href: "#about", icon: Info },
]

function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const meta = user.user_metadata ?? {}

      let username =
        meta.username ||
        meta.display_name ||
        meta.full_name ||
        meta.name ||
        ""

      if (!username) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single()

        username = profile?.display_name || ""
      }

      if (!username && user.email) {
        username = user.email.split("@")[0]
      }

      setDisplayName(username)
    }

    loadUser()
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#">
          <Image src="/logo.png" alt="Tu Deporte Aquí" width={280} height={100} className="object-contain h-24 w-auto" />
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} className="flex items-center gap-1 hover:text-gray-900">
              <Icon size={15} /> {label}
            </a>
          ))}
        </div>

        {/* Search + Menu */}
        <div className="flex items-center gap-3">
          {displayName && (
            <div className="hidden md:block text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
              Signed in as {displayName}
            </div>
          )}

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-sm">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-28 focus:w-44 transition-all"
            />
          </form>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-gray-600 hover:text-gray-900">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {displayName && (
            <div className="py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
              Signed in as {displayName}
            </div>
          )}

          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              <Icon size={15} /> {label}
            </a>
          ))}
          <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2 bg-gray-100 rounded-full px-3 py-2 text-sm">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 flex-1"
            />
          </form>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-[#043058] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE NOW
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            Tu Deporte <span className="text-[#337F25]">Aquí</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("live-games")}
              className="bg-[#337F25] hover:bg-[#286020] text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Explore Live Games
            </button>
            <button
              onClick={() => scrollTo("standings")}
              className="border-2 border-white text-white hover:bg-white hover:text-[#043058] font-bold px-6 py-3 rounded-xl transition-colors"
            >
              View Standings
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Your Go-To Sports Hub for Puerto Rico</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Experience all your favorite sports in one place. From basketball to baseball, volleyball to boxing — we bring you live scores, standings, and the latest news from Puerto Rico&apos;s sports scene.
          </p>
        </div>
      </div>
    </section>
  )
}

function LiveGamesSection() {
  return (
    <section id="live-games" className="py-14 px-6 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Radio className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Live Games</h2>
          </div>
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {LIVE_GAMES.length} LIVE
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-8">Watch the action unfold in real time</p>

        {/* Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
          {LIVE_GAMES.map((game) => (
            <a key={game.id} href={`/games/${game.id}`} className="min-w-[260px] max-w-[280px] snap-start rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
              {/* Image area */}
              <div className={`relative h-40 bg-gradient-to-br ${game.color} flex items-center justify-center`}>
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
                <span className="text-white/40 text-sm font-medium">[Image]</span>
                <span className="absolute bottom-3 left-3 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">{game.sport}</span>
              </div>
              {/* Score */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-800">{game.team1}</span>
                  <span className="font-bold text-[#043058] text-lg">{game.score1}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-800">{game.team2}</span>
                  <span className="font-bold text-[#043058] text-lg">{game.score2}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock size={13} />
                  <span>{game.time}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 text-center">
          <a href="/live-games" className="inline-flex items-center gap-1.5 border-2 border-[#337F25] text-[#337F25] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#337F25] hover:text-white transition-colors">
            View All Games <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

type StandingsRow = {
  team: string
  points: number
  w: number
  l: number
  trend: "up" | "down" | "neutral"
}

type NewsItem = {
  id: string
  sport: string
  featured: boolean
  live: boolean
  title: string
  excerpt: string
  time: string
  color: string
}

function getSportColor(sport: string) {
  const normalized = sport?.toLowerCase()

  if (normalized === "basketball") return "bg-red-500"
  if (normalized === "baseball") return "bg-blue-500"
  if (normalized === "soccer") return "bg-green-500"
  if (normalized === "volleyball") return "bg-purple-500"

  return "bg-[#043058]"
}

function getRelativeTime(dateString?: string) {
  if (!dateString) return "Recently"

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return "Less than 1 hour ago"
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
}


function StandingsSection() {
  const [standingsByLeague, setStandingsByLeague] = useState<Record<string, StandingsRow[]>>({})
  const [active, setActive] = useState("")
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchStandings() {
      setLoading(true)
      setErrorMessage("")

      const { data, error } = await supabase
        .from("standings")
        .select(`
          id,
          league,
          season,
          wins,
          losses,
          teams (
            name,
            city,
            logo_url
          )
        `)
        .order("wins", { ascending: false })

      if (error) {
        console.error("Error loading standings:", error)
        setErrorMessage("Unable to load standings.")
        setLoading(false)
        return
      }

      const grouped: Record<string, StandingsRow[]> = {}

      data?.forEach((row: any) => {
        const league = row.league || "Other"
        const team = Array.isArray(row.teams) ? row.teams[0] : row.teams

        if (!grouped[league]) grouped[league] = []

        grouped[league].push({
          team: team?.city ? `${team.name} de ${team.city}` : team?.name || "Unknown Team",
          points: row.wins * 2,
          w: row.wins,
          l: row.losses,
          trend: "neutral",
        })
      })

      setStandingsByLeague(grouped)

      const firstLeague = Object.keys(grouped)[0]
      if (firstLeague) setActive(firstLeague)

      setLoading(false)
    }

    fetchStandings()
  }, [])

  const tabs = Object.keys(standingsByLeague)
  const rows = active ? standingsByLeague[active] || [] : []

  const RankIcon = ({ rank }: { rank: number }) => {
    if (rank === 1) return <Trophy size={20} className="text-yellow-500" />
    if (rank === 2) return <Trophy size={20} className="text-gray-400" />
    if (rank === 3) return <Trophy size={20} className="text-amber-700" />
    return <span className="font-bold text-gray-600">{rank}</span>
  }

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
    if (trend === "up") return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-green-500 text-green-500">
        <TrendingUp size={14} />
      </span>
    )
    if (trend === "down") return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-red-500 text-red-500">
        <TrendingDown size={14} />
      </span>
    )
    return <Minus size={16} className="text-gray-400" />
  }

  return (
    <section id="standings" className="py-14 px-6 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy size={36} className="text-yellow-500" />
            <h2 className="text-4xl font-black text-gray-900">Team Standings</h2>
          </div>
          <p className="text-gray-500">Track your favorite teams&apos; performance across different leagues</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {loading && <p className="text-center text-gray-500">Loading standings...</p>}

          {!loading && errorMessage && (
            <p className="text-center text-red-500 font-medium">{errorMessage}</p>
          )}

          {!loading && !errorMessage && tabs.length === 0 && (
            <p className="text-center text-gray-500">No standings available.</p>
          )}

          {!loading && !errorMessage && tabs.length > 0 && (
            <>
              <div className="flex gap-3 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                      active === tab
                        ? "bg-[#043058] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 text-sm">
                      <th className="text-left pb-4 w-16">Rank</th>
                      <th className="text-left pb-4">Team</th>
                      <th className="text-center pb-4">Points</th>
                      <th className="text-center pb-4">W</th>
                      <th className="text-center pb-4">L</th>
                      <th className="text-center pb-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.team}
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => window.location.href = `/standings/${active.toLowerCase()}/${encodeURIComponent(row.team)}`}
                      >
                        <td className="py-4 flex items-center justify-center">
                          <RankIcon rank={i + 1} />
                        </td>
                        <td className="py-4 font-medium text-gray-800">{row.team}</td>
                        <td className="py-4 text-center font-bold text-[#043058]">{row.points}</td>
                        <td className="py-4 text-center font-bold text-[#337F25]">{row.w}</td>
                        <td className="py-4 text-center font-bold text-red-500">{row.l}</td>
                        <td className="py-4 text-center">
                          <div className="flex justify-center">
                            <TrendIcon trend={row.trend} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <a href="/standings" className="inline-flex items-center gap-1.5 border-2 border-[#337F25] text-[#337F25] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#337F25] hover:text-white transition-colors">
            View All Standings <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      setErrorMessage("")

      const { data, error } = await supabase
        .from("news")
        .select(`
          id,
          league,
          title,
          content,
          source,
          published_at
        `)
        .order("published_at", { ascending: false })
        .limit(4)
      console.log("RAW NEWS DATA:", data)

      if (error) {
        console.error("Error loading news:", error)
        setErrorMessage("Unable to load news.")
        setLoading(false)
        return
      }

      const formattedNews: NewsItem[] = (data || []).map((item: any, index: number) => ({
      id: item.id,
      sport: item.league || "Sports",
      featured: index === 0,
      live: false,
      title: item.title,
      excerpt: item.content,
      time: getRelativeTime(item.published_at),
      color: getSportColor(item.league || "Sports"),
    }))

      setNewsItems(formattedNews)
      setLoading(false)
    }

    fetchNews()
  }, [])

  return (
    <section id="news" className="py-14 px-6 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Newspaper size={36} className="text-[#337F25]" />
            <h2 className="text-4xl font-black text-gray-900">Latest Sport News</h2>
          </div>
          <p className="text-gray-500">Stay updated with the latest happenings in Puerto Rico sports</p>
        </div>

        {loading && <p className="text-center text-gray-500">Loading news...</p>}

        {!loading && errorMessage && (
          <p className="text-center text-red-500 font-medium">{errorMessage}</p>
        )}

        {!loading && !errorMessage && newsItems.length === 0 && (
          <p className="text-center text-gray-500">No news available.</p>
        )}

        {!loading && !errorMessage && newsItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newsItems.map((item) => (
              <a key={item.id} href={`/news/${item.id}`} className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-gray-300 transition-all">
                <div className={`relative h-44 ${item.color} flex items-center justify-center`}>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.featured && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">FEATURED</span>
                    )}

                    {item.live && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">LIVE</span>
                    )}
                    <span className="bg-[#043058] text-white text-xs font-bold px-2 py-1 rounded-full">{item.sport}</span>
                  </div>

                  <span className="text-white/40 text-sm">[Image]</span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
                    <Clock size={11} />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.excerpt}</p>
                  <span className="mt-3 text-[#337F25] text-xs font-semibold">Read More →</span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <a href="/news" className="inline-flex items-center gap-1.5 border-2 border-[#337F25] text-[#337F25] font-semibold px-6 py-2.5 rounded-xl hover:bg-[#337F25] hover:text-white transition-colors">
            View All News <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section id="about" className="py-16 px-6 bg-gradient-to-r from-[#043058] to-[#337F25] text-white text-center scroll-mt-20">
      <h2 className="text-3xl font-black mb-2">Stay in the Game</h2>
      <p className="text-white/80 mb-8">Subscribe to get the latest sports news and updates delivered to your inbox</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-3 rounded-xl text-gray-800 bg-white focus:outline-none"
        />
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#337F25] hover:bg-[#286020] text-white font-bold px-6 py-3 rounded-xl transition-colors">
          <Mail size={16} /> Subscribe
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#043058] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4 inline-block bg-white rounded-2xl p-3">
            <Image src="/logo.png" alt="Tu Deporte Aquí" width={420} height={160} className="object-contain h-44 w-auto" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Your ultimate destination for all things sports in Puerto Rico. From live scores to breaking news, we bring the passion of Puerto Rican sports to your fingertips.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: "About", links: [
            { label: "About Us", href: "/about" },
            { label: "Our Mission", href: "/about#mission" },
            { label: "Contact Us", href: "/contact" },
            { label: "Careers", href: "/careers" },
          ]},
          { title: "Sports", links: [
            { label: "Basketball", href: "/sports/basketball" },
            { label: "Baseball", href: "/sports/baseball" },
            { label: "Soccer", href: "/sports/soccer" },
            { label: "Volleyball", href: "/sports/volleyball" },
          ]},
          { title: "Legal", links: [
            { label: "Privacy Policy", href: "/legal/privacy" },
            { label: "Terms of Service", href: "/legal/terms" },
            { label: "Cookie Policy", href: "/legal/cookies" },
            { label: "Disclaimer", href: "/legal/disclaimer" },
          ]},
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-white mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-400 text-sm hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-500 text-sm">
          <span>© 2026 Tu Deporte Aquí. All rights reserved.</span>
          <span>Made with ❤️ in Puerto Rico</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LiveGamesSection />
      <StandingsSection />
      <NewsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}