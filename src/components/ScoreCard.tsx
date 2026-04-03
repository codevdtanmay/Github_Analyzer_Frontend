import { TrendingUp } from 'lucide-react'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function ScoreCard({ score }: { score: number }) {
  const s = clamp(score || 1, 1, 10)
  const pct = (s / 10) * 100

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-zinc-400">Code quality</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-50">
            {s}
            <span className="text-sm text-zinc-400">/10</span>
          </div>
        </div>
        <div className="grid size-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-950">
          <TrendingUp className="size-5 text-indigo-300" />
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-zinc-400">
        Higher scores generally indicate clearer structure and better hygiene.
      </div>
    </div>
  )
}

