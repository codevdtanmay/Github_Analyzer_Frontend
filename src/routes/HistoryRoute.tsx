import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadHistory, saveLast, type StoredAnalysis } from '../lib/storage'

function formatTime(ts: number) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(ts))
  } catch {
    return new Date(ts).toLocaleString()
  }
}

export function HistoryRoute() {
  const navigate = useNavigate()
  const [items] = useState<StoredAnalysis[]>(() => loadHistory())
  const has = items.length > 0

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.createdAt - a.createdAt),
    [items],
  )

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
      <div className="text-sm font-semibold text-zinc-50">History</div>
      <div className="mt-1 text-sm text-zinc-400">
        Your recent analyses will appear here (local to this browser).
      </div>

      {!has ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500">
          No history yet.
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {sorted.map((h) => (
            <button
              key={h.id}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left transition hover:bg-zinc-900"
              onClick={() => {
                saveLast(h)
                navigate('/')
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-zinc-50">
                    {h.data.repo?.name || h.repoUrl}
                  </div>
                  <div className="truncate text-xs text-zinc-400">{h.repoUrl}</div>
                </div>
                <div className="shrink-0 text-xs text-zinc-400">
                  {formatTime(h.createdAt)}
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-400">
                Score:{' '}
                <span className="font-semibold text-zinc-200">
                  {h.data.analysis?.score ?? 1}/10
                </span>
                {h.data.repo?.language ? (
                  <>
                    <span className="mx-2 text-zinc-600">•</span>
                    <span>{h.data.repo.language}</span>
                  </>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

