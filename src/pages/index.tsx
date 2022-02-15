import type { NextPage } from 'next'
import { FAQSection } from '../components/FAQSection'
import { HomeSection } from '../components/HomeSection'
import { InfoSection } from '../components/InfoSection'
import { InvestSection } from '../components/InvestSection'

const Home: NextPage = () => {
  return (
    <>
      <HomeSection />
      <InfoSection />
      <InvestSection />
      <FAQSection />
    </>
  )
}

export default Home
