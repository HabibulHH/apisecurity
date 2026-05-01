import { useEffect, useState } from 'react'

export default function App() {
  const [students, setStudents] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // us
    fetch('http://localhost:4000/students')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setStudents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="landing">
      <h1>Welcome to API Security</h1>

      {loading && <p>Loading students...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} — age {s.age}, {s.major}
          </li>
        ))}
      </ul>
    </div>
  )
}
