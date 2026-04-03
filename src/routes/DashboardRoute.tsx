import { useEffect, useMemo, useState } from 'react'
import { InsightColumns } from '../components/InsightColumns'
import { RepoUrlForm } from '../components/RepoUrlForm'
import { ScoreCard } from '../components/ScoreCard'
import { TechStackChips } from '../components/TechStackChips'
import type { AnalyzeResponse } from '../lib/schemas'
import { loadLast, newStoredAnalysis, pushToHistory, saveLast } from '../lib/storage'

export function DashboardRoute() {
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [meta, setMeta] = useState<{ repoUrl: string; createdAt: number } | null>(
    null,
  )
  const repo = result?.repo
  const analysis = result?.analysis

  const title = useMemo(() => {
    if (!repo?.name) return 'Analysis results'
    return `${repo.name} — AI Review`
  }, [repo?.name])

  useEffect(() => {
    const last = loadLast()
    if (last?.data) {
      setResult(last.data)
      setMeta({ repoUrl: last.repoUrl, createdAt: last.createdAt })
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
        <div className="text-sm font-semibold text-zinc-50">Analyze a repo</div>
        <div className="mt-1 text-xs text-zinc-400">
          Paste any public GitHub repository URL. We’ll summarize the repo and
          generate an AI review from metadata + file list.
        </div>
        <div className="mt-4">
          <RepoUrlForm
            onSuccess={(data, repoUrl) => {
              setResult(data)
              setMeta({ repoUrl, createdAt: Date.now() })
              const entry = newStoredAnalysis(repoUrl, data)
              saveLast(entry)
              pushToHistory(entry)
            }}
          />
        </div>
      </div>

      {!result ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 text-center text-sm text-zinc-400">
          Run an analysis to see the dashboard here.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="text-sm font-semibold text-zinc-50">{title}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {repo?.description || 'No description provided.'}
              </div>
              {meta?.repoUrl ? (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <a
                    className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-200 hover:bg-zinc-900"
                    href={meta.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open repo
                  </a>
                  <button
                    className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-200 hover:bg-zinc-900"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(meta.repoUrl)
                      } catch {
                        // ignore
                      }
                    }}
                    type="button"
                  >
                    Copy link
                  </button>
                  <button
                    className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-200 hover:bg-zinc-900"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(result, null, 2)], {
                        type: 'application/json',
                      })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${repo?.name || 'analysis'}.json`
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    type="button"
                  >
                    Export JSON
                  </button>
                </div>
              ) : null}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-xs text-zinc-400">Primary language</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">
                    {repo?.language || '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-xs text-zinc-400">Stars</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">
                    {repo?.stars ?? '—'}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="text-xs text-zinc-400">Files scanned</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">
                    {repo?.files?.length ?? '—'}
                  </div>
                </div>
              </div>
            </div>

            <ScoreCard score={analysis?.score ?? 1} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="text-sm font-semibold text-zinc-50">Summary</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {analysis?.summary || 'Insufficient data'}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
              <div className="text-sm font-semibold text-zinc-50">Tech stack</div>
              <div className="mt-3">
                <TechStackChips items={analysis?.techStack ?? []} />
              </div>
            </div>
          </div>

          <InsightColumns
            strengths={analysis?.strengths ?? []}
            weaknesses={analysis?.weaknesses ?? []}
            suggestions={analysis?.suggestions ?? []}
          />
        </div>
      )}
    </div>
  )
}

