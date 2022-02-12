import type { NextPage } from 'next'
import { HomeSection } from '../components/HomeSection'
import { InfoSection } from '../components/InfoSection'

const Home: NextPage = () => {
  return (
    <>
      <HomeSection />
      <InfoSection />
    </>
  )
}

export default Home
