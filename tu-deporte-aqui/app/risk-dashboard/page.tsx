import * as React from "react"

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bug,
  CheckCircle2,
  ClipboardList,
  Flame,
  Gauge,
  ShieldCheck,
  Target,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ComponentRisk = {
  id: string
  name: string
  area: "Games" | "Standings" | "Athletes" | "Platform"
  impact: number
  likelihood: number
  coverage: number
  severity12: number
  owner: string
  notes: string
  testFocus: string
}

const COMPONENTS: ComponentRisk[] = [
  {
    id: "live-games",
    name: "Live Games feed & scores",
    area: "Games",
    impact: 5,
    likelihood: 4,
    coverage: 62,
    severity12: 2,
    owner: "Ana (QA)",
    notes: "Relies on third‑party  API; (data is incomplete; missing live data).",
    testFocus: "Make tests against score providers",
  },
  {
    id: "standings",
    name: "Standings calculation & tiebreakers",
    area: "Standings",
    impact: 4,
    likelihood: 3,
    coverage: 74,
    severity12: 1,
    owner: "Carlos (QA)",
    notes: "Multiple league formats;  risk when rules change per season. (data is incomplete; missing live data).",
    testFocus: "Test tiebreaker scenarios and data migration tests",
  },
]

const score = (c: ComponentRisk) => c.impact * c.likelihood

const riskBand = (value: number) => {
  if (value >= 16) return { label: "High", tone: "text-red-700 bg-red-50 border-red-100" }
  if (value >= 9) return { label: "Medium", tone: "text-amber-700 bg-amber-50 border-amber-100" }
  return { label: "Low", tone: "text-emerald-700 bg-emerald-50 border-emerald-100" }
}

const averageCoverage = Math.round(
  COMPONENTS.reduce((sum, c) => sum + c.coverage, 0) / COMPONENTS.length
)

const highRisk = COMPONENTS.filter((c) => riskBand(score(c)).label === "High")

export default function RiskDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Risk-Based Testing Dashboard</span>
            </div>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Tu Deporte Aquí Risk Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Blueprint to manage and minimize risk .
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="High risk components"
            value={highRisk.length}
            subtitle="Risk ≥ 16 (impact × likelihood)"
            icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
          />
          <SummaryCard
            title="Test coverage"
            value={`${averageCoverage}%`}
            subtitle="Guardrail: 90% across all components"
            icon={<BarChart3 className="h-4 w-4 text-slate-600" />}
          />
          
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3 bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-slate-700" /> Risk scoring model
              </CardTitle>
              <CardDescription>Risk = impact (customer blast radius) × likelihood (failure probability). 1–5 scale risk management.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div className="flex flex-wrap gap-2">
                {["1 = Minimal", "3 = Noticeable", "5 = Critical"]
                  .map((label) => (
                    <Badge key={label} variant="outline" className="border-slate-200 bg-white text-slate-700">
                      {label}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>


          <Card className="lg:col-span-2 bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gauge className="h-5 w-5 text-slate-700" /> Entry / Exit gates
              </CardTitle>
              <CardDescription>Risk Managed Levels.</CardDescription>
            </CardHeader>
        
          </Card>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-semibold">Component Risk</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.6fr_0.5fr_0.8fr] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span>Component</span>
              <span>Area</span>
              <span>Risk</span>
              <span>Coverage</span>
              <span></span>
              <span>Next test focus</span>
            </div>
            {COMPONENTS.slice(0, 2).map((component) => {
              const band = riskBand(score(component))
              return (
                <div
                  key={component.id}
                  className="grid grid-cols-[1.1fr_0.8fr_0.6fr_0.6fr_0.5fr_0.8fr] items-start gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-800"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{component.name}</p>
                    <p className="text-xs text-slate-500">{component.notes}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Badge variant="outline" className="border-slate-200 text-slate-700">
                      {component.area}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-semibold ${band.tone}`}
                    >
                      {band.label} · {score(component)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full ${component.coverage >= 80 ? "bg-emerald-500" : component.coverage >= 60 ? "bg-amber-400" : "bg-red-400"}`}
                        style={{ width: `${component.coverage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-600">{component.coverage}%</span>
                  </div>
                  <div className="text-xs text-slate-700">{component.testFocus}</div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3 bg-white text-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="h-5 w-5 text-slate-700" /> Impact × Likelihood 
              </CardTitle>
              <CardDescription>Organize by risk level to prioritize testing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "High (16+)", band: "High", tone: riskBand(20).tone },
                { label: "Medium (9-15)", band: "Medium", tone: riskBand(10).tone },
                { label: "Low (≤8)", band: "Low", tone: riskBand(5).tone },
              ].map(({ label, band, tone }) => {
                const items = COMPONENTS.filter((c) => riskBand(score(c)).label === band)
                return (
                  <div key={band} className={`rounded-lg border p-3 text-sm ${tone}`}>
                    <p className="font-semibold">{label}</p>
                    {items.length === 0 ? (
                      <p className="text-xs text-slate-500">No components</p>
                    ) : (
                      <ul className="text-xs font-semibold text-slate-800">
                        {items.map((c) => (
                          <li key={c.id}>{c.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">Testing Plan</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-lg text-black">UI correctness</CardTitle>
                <CardDescription>Criteria: UI correctly displays risk scores.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-black">
              </CardContent>
            </Card>

            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-lg text-black">Risk calculation checks</CardTitle>
                <CardDescription>Criteria: Risk values are calculated correctly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-black">
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

type SummaryCardProps = {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
}

function SummaryCard({ title, value, subtitle, icon }: SummaryCardProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="flex items-start gap-3 px-4 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}
