import Link from "next/link"
import { ArrowLeft, CalendarDays, ChevronRight, Newspaper } from "lucide-react"

const NEWS_ARTICLES = [
  { id: 1, sport: "Basketball", featured: false, live: false, title: "Capitanes de Arecibo Win Championship in Thrilling Overtime", excerpt: "In an electrifying finale, the Capitanes secured their title with a 98-95 victory, bringing Puerto Rico basketball fans to their feet.", time: "2019-01-11", color: "bg-red-500" },
  { id: 2, sport: "Baseball", featured: true, live: false, title: "Criollos Sign Star Pitcher from MLB", excerpt: "The Caguas team makes a major move by signing veteran pitcher Carlos Rivera to strengthen their rotation for the upcoming season.", time: "2025-04-02", color: "bg-blue-500" },
  { id: 3, sport: "Boxing", featured: true, live: true, title: "Local Boxing Champion Prepares for Title Defense", excerpt: 'Miguel "El Tornado" Torres begins training camp for his upcoming WBO title defense in San Juan this summer.', time: "2026-03-17", color: "bg-red-500" },
  { id: 4, sport: "Soccer", featured: false, live: false, title: "Puerto Rico FC Advances to Regional Finals", excerpt: "The soccer club dominated with a 3-0 victory, earning their spot in the Caribbean Cup finals next month.", time: "2026-03-18", color: "bg-green-500" },
] as const

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`))
}

export default function NewsPage() {
  const featuredArticles = NEWS_ARTICLES.filter((article) => article.featured)
  const featuredArticle = featuredArticles[0] ?? NEWS_ARTICLES[0]
  const articles = NEWS_ARTICLES.filter((article) => article.id !== featuredArticle.id)

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.22),_transparent_34%),linear-gradient(180deg,#082f49_0%,#020617_58%,#020617_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/home"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/10"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-200">
              <Newspaper size={16} />
              Tu Deporte Aqui Newsroom
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Daily sports stories, match updates, and community highlights.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Browse the latest headlines from Puerto Rico sports in a clean, easy-to-scan layout with publication dates and quick summaries.
            </p>
          </div>

          
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40">
          <div
            className={`flex min-h-[220px] flex-col justify-between bg-gradient-to-br ${featuredArticle.color} p-8`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Featured
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                {featuredArticle.sport}
              </span>
            </div>
            <div>
              <h2 className="max-w-2xl text-3xl font-black text-white sm:text-4xl">
                {featuredArticle.title}
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-1.5 text-sm text-slate-100">
                <CalendarDays size={15} />
                {formatDate(featuredArticle.time)}
              </div>
            </div>
          </div>
          <div className="p-8">
            <p className="max-w-3xl text-base leading-7 text-slate-300">
              {featuredArticle.excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
              Continue reading
              <ChevronRight size={16} />
            </div>
          </div>
        </article>

        {featuredArticles.length > 1 && (
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-bold text-white">More Featured Stories</h3>
            <div className="mt-5 space-y-4">
              {featuredArticles.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {article.sport}
                    </span>
                    <div className="inline-flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={14} />
                      <span>{formatDate(article.time)}</span>
                    </div>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-white">{article.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{article.excerpt}</p>
                </article>
              ))}
            </div>
          </aside>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">Latest Articles</h2>
            <p className="mt-1 text-sm text-slate-400">
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-slate-900"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${article.color}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    {article.sport}
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    <span>{formatDate(article.time)}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold leading-tight text-white">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                  {article.excerpt}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">
                  Read article
                  <ChevronRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
