import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitySelect from '../components/CitySelect.jsx'

const features = [
  ['01', 'Surface area', 'Overlay two cities and see how many times one fits in the other.'],
  ['02', 'Population density', 'Understand how crowded, or how spacious, each place really is.'],
  ['03', 'Skyline scale', 'Compare footprints, districts and distances at a glance.'],
  ['04', 'Instant verdict', 'Pick two cities, hit compare, get the answer.'],
]

export default function Home() {
  const [a, setA] = useState(null)
  const [b, setB] = useState(null)
  const navigate = useNavigate()
  const ready = a && b

  return (
    <div className="home">
      <div className="grid-bg" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <header className="nav">
        <span className="logo">CITY<b>SIZE</b></span>
        <span className="tag">v0.1 · urban scale engine</span>
      </header>

      <main className="hero">
        <p className="eyebrow">// compare the world's cities</p>
        <h1>
          How big is <span className="glow">your city</span>
          <br />
          next to <span className="glow alt">another</span>?
        </h1>
        <p className="lead">
          Select two cities and let the engine measure them against each other.
        </p>

        <div className="panel">
          <CitySelect label="City A" value={a} onChange={setA} excludeId={b?.id} />
          <div className="vs">VS</div>
          <CitySelect label="City B" value={b} onChange={setB} excludeId={a?.id} />
          <button
            className="compare"
            disabled={!ready}
            onClick={() => navigate('/result')}
          >
            Compare
          </button>
        </div>
      </main>

      <section className="features">
        {features.map(([n, title, text]) => (
          <article key={n} className="card">
            <span className="num">{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
