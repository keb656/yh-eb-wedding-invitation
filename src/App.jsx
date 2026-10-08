import Account from './components/Account'
import Event from './components/Event'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Location from './components/Location'
import Menu from './components/Menu'
import OurStory from './components/OurStory'
import QuickView from './components/QuickView'
import Transport from './components/Transport'
import WeddingDay from './components/WeddingDay'
import { couple, wedding } from './data/wedding'
import './App.css'

function App() {
  return (
    <>
      <Menu />
      <QuickView />

      <main className="site">
        <Hero />
        <Invitation />
        <WeddingDay />
        <Location />
        <Transport />
        <Account />
        <Event />
        <OurStory />
      </main>

      <footer className="footer">
        <p>
          {couple.groom.nameEn} &amp; {couple.bride.nameEn}
        </p>
        <p>{wedding.dateEn}</p>
        <p className="footer__thanks">THANK YOU</p>
      </footer>
    </>
  )
}

export default App
