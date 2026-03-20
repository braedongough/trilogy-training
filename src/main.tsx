import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Plans } from './pages/Plans'
import { Contact } from './pages/Contact'

const pages: Record<string, React.ComponentType> = {
  home: Home,
  about: About,
  plans: Plans,
  contact: Contact,
}

const root = document.getElementById('root')!
const pageName = root.getAttribute('data-page') || 'home'
const PageComponent = pages[pageName] || Home

createRoot(root).render(
  <StrictMode>
    <Layout>
      <PageComponent />
    </Layout>
  </StrictMode>,
)
