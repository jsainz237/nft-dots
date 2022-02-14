import type { NextPage } from 'next'
import { HomeSection } from '../components/HomeSection'
import { InfoSection } from '../components/InfoSection'
import { InvestSection } from '../components/InvestSection'

const Home: NextPage = () => {
  return (
    <>
      <HomeSection />
      <InfoSection />
      <InvestSection />
    </>
  )
}

export default Home
