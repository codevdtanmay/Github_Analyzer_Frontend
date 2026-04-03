export function AboutRoute() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6">
        <div className="text-sm font-semibold text-zinc-50">About</div>
        <div className="mt-2 space-y-2 text-sm text-zinc-400">
          <p className="text-balance">
            This project analyzes a GitHub repository using repository metadata +
            a file list from the GitHub API, then generates an AI review (summary,
            tech stack, score, strengths, weaknesses, and suggestions).
          </p>
          <p className="text-balance">
            Frontend: React SPA dashboard. Backend: Express endpoint{' '}
            <span className="text-zinc-200">POST /api/analyze</span> calling GitHub
            API + Gemini.
          </p>
        </div>
      </div>
    </div>
  )
}

