import { CursorProvider } from './components/common'
import {
  Navbar,
  Hero,
  ClientMarquee,
  About,
  Services,
  MotionInterlude,
  SelectedWork,
  Process,
  Impact,
  Testimonials,
  WhyNavix,
  Insights,
  LargeCTA,
  Contact,
  Footer,
} from './components/sections'

function App() {
  return (
    <CursorProvider>
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <About />
        <Services />
        <MotionInterlude />
        <SelectedWork />
        <Process />
        <Impact />
        <Testimonials />
        <WhyNavix />
        <Insights />
        <LargeCTA />
        <Contact />
      </main>
      <Footer />
    </CursorProvider>
  )
}

export default App
