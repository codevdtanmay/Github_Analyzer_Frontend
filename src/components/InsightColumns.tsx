function ListCard({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'good' | 'bad' | 'neutral'
}) {
  const toneStyles =
    tone === 'good'
      ? 'border-emerald-500/30 bg-emerald-500/5'
      : tone === 'bad'
        ? 'border-rose-500/30 bg-rose-500/5'
        : 'border-zinc-800 bg-zinc-950/50'

  return (
    <div className={`rounded-2xl border p-4 ${toneStyles}`}>
      <div className="text-sm font-semibold text-zinc-50">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {(items?.length ? items : ['Insufficient data']).map((it, idx) => (
          <li key={`${title}-${idx}`} className="flex gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-zinc-500" />
            <span className="min-w-0">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function InsightColumns({
  strengths,
  weaknesses,
  suggestions,
}: {
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ListCard title="Strengths" items={strengths} tone="good" />
      <ListCard title="Weaknesses" items={weaknesses} tone="bad" />
      <ListCard title="Suggestions" items={suggestions} tone="neutral" />
    </div>
  )
}

