export function TechStackChips({ items }: { items: string[] }) {
  if (!items?.length) {
    return (
      <div className="text-sm text-zinc-500">Insufficient data for tech stack.</div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-200"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

