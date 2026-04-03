import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { AboutRoute } from './routes/AboutRoute'
import { DashboardRoute } from './routes/DashboardRoute'
import { HistoryRoute } from './routes/HistoryRoute'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardRoute />} />
        <Route path="/history" element={<HistoryRoute />} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
