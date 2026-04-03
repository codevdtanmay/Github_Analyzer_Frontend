import { useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { analyzeRepo, type ApiError } from '../lib/api'
import type { AnalyzeResponse } from '../lib/schemas'

const examples = [
  'https://github.com/facebook/react',
  'https://github.com/vercel/next.js',
  'https://github.com/tailwindlabs/tailwindcss',
]

function isValidGithubRepoUrl(input: string) {
  try {
    const u = new URL(input.trim())
    if (u.hostname !== 'github.com') return false
    const parts = u.pathname.split('/').filter(Boolean)
    return parts.length >= 2
  } catch {
    return false
  }
}

export function RepoUrlForm({
  onSuccess,
}: {
  onSuccess?: (data: AnalyzeResponse, repoUrl: string) => void
}) {
  const [repoUrl, setRepoUrl] = useState('')
  const isValid = useMemo(() => (repoUrl ? isValidGithubRepoUrl(repoUrl) : true), [repoUrl])

  const mutation = useMutation<AnalyzeResponse, ApiError, string>({
    mutationFn: analyzeRepo,
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables)
    },
  })

  return (
    <form
      className="flex flex-col gap-3 md:flex-row md:items-end"
      onSubmit={(e) => {
        e.preventDefault()
        const value = repoUrl.trim()
        if (!value || !isValid) return
        mutation.mutate(value)
      }}
    >
      <div className="flex-1">
        <label className="text-xs font-medium text-zinc-300">Repository URL</label>
        <input
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/owner/repo"
          className={[
            'mt-1 w-full rounded-xl border bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none',
            'placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500/40',
            isValid ? 'border-zinc-800' : 'border-rose-500/70',
          ].join(' ')}
        />
        {!isValid && (
          <div className="mt-1 text-xs text-rose-300">
            Please enter a valid GitHub repository URL.
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              className="rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 hover:bg-zinc-900"
              onClick={() => setRepoUrl(ex)}
            >
              {ex.replace('https://github.com/', '')}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!repoUrl.trim() || !isValid || mutation.isPending}
        className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? 'Analyzing…' : 'Analyze'}
      </button>

      {mutation.isError && (
        <div className="md:col-span-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
          {mutation.error.message}
        </div>
      )}
    </form>
  )
}

