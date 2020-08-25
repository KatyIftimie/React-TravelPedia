import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CountryDetails(props) {
    const [details, setDetails] = useState([])
    // console.log("Details", props.match.params.name)
    // console.log(props)
    const name = props.match.params.name
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('https://restcountries.eu/rest/v2/name/' + { name })

            setDetails(res.data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <p>{details.name}</p>
        </div>
    )
}
