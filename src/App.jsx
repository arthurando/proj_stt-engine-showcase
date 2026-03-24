import { LangProvider } from './i18n'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import ArchitectureSection from './components/ArchitectureSection'
import FeaturesSection from './components/FeaturesSection'
import OrchestrationSection from './components/OrchestrationSection'
import CostCalculator from './components/CostCalculator'
import CaseStudy from './components/CaseStudy'
import InfraSection from './components/InfraSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0a0e1a] text-gray-200">
        <Navigation />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ArchitectureSection />
        <FeaturesSection />
        <OrchestrationSection />
        <CostCalculator />
        <CaseStudy />
        <InfraSection />
        {/* <PricingSection /> */}
        {/* <CTASection /> */}
        <Footer />
      </div>
    </LangProvider>
  )
}
