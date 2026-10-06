import { useEffect, useMemo, useRef, useState } from 'react'
import { cities } from '../data/cities.js'

const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function CitySelect({ label, value, onChange, excludeId }) {
  const [query, setQuery] = useState(value ? value.name : '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)

  const matches = useMemo(() => {
    const q = normalize(query.trim())
    return cities
      .filter((c) => c.id !== excludeId)
      .filter((c) => !q || normalize(`${c.name} ${c.country}`).includes(q))
      .slice(0, 50)
  }, [query, excludeId])

  useEffect(() => {
    const close = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
        setQuery(value ? value.name : '')
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [value])

  const pick = (city) => {
    onChange(city)
    setQuery(city.name)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((a) => Math.min(a + 1, matches.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && open && matches[active]) {
      e.preventDefault()
      pick(matches[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="select" ref={rootRef}>
      <label className="select-label">{label}</label>
      <input
        className="select-input"
        type="text"
        placeholder="Search a city…"
        value={query}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        onFocus={(e) => {
          setOpen(true)
          e.target.select()
        }}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setActive(0)
          if (value) onChange(null)
        }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul className="select-list" role="listbox">
          {matches.length === 0 && <li className="select-empty">No city found</li>}
          {matches.map((c, i) => (
            <li
              key={c.id}
              role="option"
              aria-selected={i === active}
              className={i === active ? 'active' : ''}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                pick(c)
              }}
            >
              <span>{c.name}</span>
              <small>{c.country}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
