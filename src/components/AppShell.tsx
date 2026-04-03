import { BarChart3, History, Info, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function NavItem({
  to,
  icon,
  label,
}: {
  to: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
          'hover:bg-zinc-900 hover:text-zinc-50',
          isActive ? 'bg-zinc-900 text-zinc-50' : 'text-zinc-300',
        ].join(' ')
      }
      end={to === '/'}
    >
      <span className="text-zinc-400 group-hover:text-zinc-200">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full bg-[radial-gradient(800px_circle_at_20%_20%,rgba(99,102,241,0.18),transparent_40%),radial-gradient(700px_circle_at_80%_0%,rgba(168,85,247,0.18),transparent_45%)]">
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[260px_1fr]">
          <aside className="hidden h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 backdrop-blur md:flex">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl border border-zinc-800 bg-zinc-950">
                <BarChart3 className="size-5 text-indigo-300" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-zinc-50">
                  GitHub Analyzer
                </div>
                <div className="text-xs text-zinc-400">By Tanmay</div>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <NavItem
                to="/"
                icon={<LayoutDashboard className="size-4" />}
                label="Dashboard"
              />
              <NavItem
                to="/history"
                icon={<History className="size-4" />}
                label="History"
              />
              <NavItem
                to="/about"
                icon={<Info className="size-4" />}
                label="About"
              />
            </div>

            <div className="mt-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-xs text-zinc-400">
              Paste a repo URL, analyze, and explore strengths/weaknesses with AI.
            </div>
          </aside>

          <main className="h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur">
            <div className="flex h-full flex-col">
              <header className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-zinc-50">
                    Repository Insights Dashboard
                  </div>
                  <div className="truncate text-xs text-zinc-400">
                   Get the Repo Report instantly
                  </div>
                </div>
                <div className="hidden text-xs text-zinc-400 md:block">
                  <span className="text-zinc-200"></span>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

