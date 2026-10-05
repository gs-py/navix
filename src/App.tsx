import { CursorProvider, Preloader } from './components/common'
import {
  Navbar,
  Hero,
  XTicker,
  About,
  Founder,
  Services,
  Process,
  ClientMarquee,
  Testimonials,
  SelectedWork,
  WhyNavix,
  LargeCTA,
  Insights,
  Contact,
  FAQ,
  Footer,
} from './components/sections'
import { useLenis } from './hooks'

// Only two pages, so the path is matched directly instead of pulling in a router.
const isAboutPage = window.location.pathname.replace(/\/$/, '') === '/about'
if (isAboutPage) document.title = 'About | Navix'

function App() {
  useLenis()

  return (
    <CursorProvider>
      <Preloader />
      <Navbar />
      {isAboutPage ? (
        <main className="pt-20">
          <Founder />
        </main>
      ) : (
      <main>
        <Hero />
        <XTicker />
        <About />
        <Services />
        <Process />
        <ClientMarquee />
        <Testimonials />
        <SelectedWork />
        <WhyNavix />
        <LargeCTA />
        <Insights />
        <Contact />
        <FAQ />
      </main>
      )}
      <Footer />
      <div className="grain" aria-hidden="true" />
    </CursorProvider>
  )
}

export default App
