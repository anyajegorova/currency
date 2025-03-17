import React, {useState, useEffect} from 'react'
import './styles/RateTable.css'
import axios from 'axios'

const RateTable = () => {
    const [rates, setRates] = useState<{ [key: string]: number } | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      // axios.get('http://localhost:3000/')
      //   .then((response) => {
      //     setLoading(false)
      //     setRates(response.data.data)
      //   })
      //   .catch((error) => {
      //     setError(error.message)
      //     setLoading(false)
      //   })
    }, [])

  return (
    <div>
            <h1>Exchange Rates</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {rates && (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate]: [string, number]) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export {RateTable}
