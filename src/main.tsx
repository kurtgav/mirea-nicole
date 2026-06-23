import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: StrictMode is intentionally omitted — its dev-only double-invoke of
// effects restarts the timed, one-shot envelope intro. The app is otherwise
// effect-clean (all effects have cleanups).
createRoot(document.getElementById('root')!).render(<App />)
