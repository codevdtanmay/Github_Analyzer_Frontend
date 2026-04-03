import { z } from 'zod'

export const RepoSchema = z.object({
  name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  stars: z.number().int().nonnegative().optional(),
  language: z.string().nullable().optional(),
  files: z.array(z.string()).optional(),
})

export const AnalysisSchema = z.object({
  summary: z.string().catch(''),
  techStack: z.array(z.string()).catch([]),
  score: z.number().min(1).max(10).catch(1),
  strengths: z.array(z.string()).catch([]),
  weaknesses: z.array(z.string()).catch([]),
  suggestions: z.array(z.string()).catch([]),
})

export const AnalyzeResponseSchema = z.object({
  success: z.boolean(),
  repo: RepoSchema,
  analysis: AnalysisSchema,
})

export type Repo = z.infer<typeof RepoSchema>
export type Analysis = z.infer<typeof AnalysisSchema>
export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>

