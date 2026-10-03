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

function App() {
  useLenis()

  return (
    <CursorProvider>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <XTicker />
        <About />
        <Founder />
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
      <Footer />
      <div className="grain" aria-hidden="true" />
    </CursorProvider>
  )
}

export default App
