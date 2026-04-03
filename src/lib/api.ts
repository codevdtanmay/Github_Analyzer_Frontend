import { AnalyzeResponseSchema } from './schemas'

export type ApiError = {
  message: string
  status?: number
  details?: unknown
}

const DEFAULT_BASE_URL = 'http://localhost:3000'

function getBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
  return (envUrl || DEFAULT_BASE_URL).replace(/\/+$/, '')
}

export async function analyzeRepo(repoUrl: string) {
  const baseUrl = getBaseUrl()
  const res = await fetch(`${baseUrl}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl }),
  })

  let json: unknown = null
  try {
    json = await res.json()
  } catch {
    // ignore
  }

  if (!res.ok) {
    const msg =
      (json as any)?.error ||
      (json as any)?.message ||
      `Request failed with status ${res.status}`
    const err: ApiError = { message: msg, status: res.status, details: json }
    throw err
  }

  const parsed = AnalyzeResponseSchema.safeParse(json)
  if (!parsed.success) {
    const err: ApiError = {
      message: 'Backend returned unexpected data shape.',
      status: res.status,
      details: parsed.error.flatten(),
    }
    throw err
  }

  return parsed.data
}

