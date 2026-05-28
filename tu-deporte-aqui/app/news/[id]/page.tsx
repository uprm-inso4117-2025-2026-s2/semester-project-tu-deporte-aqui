import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, MessageCircle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type NewsDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params

  const { data: news, error: newsError } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (newsError) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 font-semibold text-[#337F25] hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-red-600">
              Supabase query error
            </h1>

            <pre className="mt-4 overflow-auto rounded-xl bg-gray-100 p-4 text-sm">
              {JSON.stringify(newsError, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    )
  }

  if (!news) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 font-semibold text-[#337F25] hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              News not found
            </h1>

            <p className="mt-2 text-gray-500">
              No news article was found for this ID.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("news_id", id)
    .order("published_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 font-semibold text-[#337F25] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <article className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {news.league && (
              <span className="rounded-full bg-[#043058] px-3 py-1 text-xs font-bold text-white">
                {news.league}
              </span>
            )}

            {news.published_at && (
              <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} />
                {new Date(news.published_at).toLocaleDateString()}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black leading-tight text-gray-900">
            {news.title}
          </h1>

          <p className="mt-5 whitespace-pre-line leading-relaxed text-gray-700">
            {news.content}
          </p>

          {news.source && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              {news.source_url ? (
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#337F25] hover:underline"
                >
                  Source: {news.source}
                  <ExternalLink size={14} />
                </a>
              ) : (
                <p className="text-sm text-gray-500">
                  Source: {news.source}
                </p>
              )}
            </div>
          )}
        </article>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <MessageCircle
              size={22}
              className="text-[#337F25]"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Comments
            </h2>
          </div>

          {commentsError && (
            <p className="font-medium text-red-500">
              Unable to load comments.
            </p>
          )}

          {!commentsError &&
            (!comments || comments.length === 0) && (
              <p className="text-gray-500">
                No comments yet.
              </p>
            )}

          {!commentsError &&
            comments &&
            comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <p className="text-gray-700">
                      {comment.content}
                    </p>

                    {comment.published_at && (
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(comment.published_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  )
}