import type { AnalyzeResponse } from './schemas'

export type StoredAnalysis = {
  id: string
  repoUrl: string
  createdAt: number
  data: AnalyzeResponse
}

const KEY_LAST = 'gha:last'
const KEY_HISTORY = 'gha:history'
const MAX_HISTORY = 12

export function loadLast(): StoredAnalysis | null {
  try {
    const raw = localStorage.getItem(KEY_LAST)
    if (!raw) return null
    return JSON.parse(raw) as StoredAnalysis
  } catch {
    return null
  }
}

export function saveLast(entry: StoredAnalysis) {
  localStorage.setItem(KEY_LAST, JSON.stringify(entry))
}

export function loadHistory(): StoredAnalysis[] {
  try {
    const raw = localStorage.getItem(KEY_HISTORY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredAnalysis[]) : []
  } catch {
    return []
  }
}

export function saveHistory(items: StoredAnalysis[]) {
  localStorage.setItem(KEY_HISTORY, JSON.stringify(items.slice(0, MAX_HISTORY)))
}

export function pushToHistory(entry: StoredAnalysis) {
  const existing = loadHistory()
  const next = [entry, ...existing.filter((x) => x.id !== entry.id)].slice(0, MAX_HISTORY)
  saveHistory(next)
}

export function newStoredAnalysis(repoUrl: string, data: AnalyzeResponse): StoredAnalysis {
  const now = Date.now()
  return {
    id: `${now}:${Math.random().toString(16).slice(2)}`,
    repoUrl,
    createdAt: now,
    data,
  }
}

