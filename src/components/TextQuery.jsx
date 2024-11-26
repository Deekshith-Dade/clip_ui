"use client";
import React, { useState } from 'react'
import axios from "axios"
import Image from 'next/image'

function TextQuery() {

    const [query, setQuery] = useState("Red Planet")
    const [response, setResponse] = useState(null)
    const [n, setN] = useState(2)

    const handleSubmit = async () => {

        try {
            const res = await axios.post(`http://localhost:8000/query_with_text?q=${query}&n=${n}`, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            setResponse(res.data);
        } catch (error) {
            console.error("Error With Query: ", error);
            setResponse("Error with Query");
        }
    }

    return (
        <div className='border py-4 px-12'>
            <h2 className='text-2xl text-orange-300 my-2 font-bold'>Query with Text for Images</h2>
            <div className=''>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        Query
                    </label>
                    <input className='shadow shadow-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2 mt-4" >
                        Number of Results
                    </label>
                    <input className='shadow shadow-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={n} onChange={(e) => setN(e.target.value)} />
                </div>
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4' onClick={handleSubmit}>Submit</button>

            <div className='my-2'>
                {response && response.results.map((result, index) => {
                    return (
                        <div key={index} className='border p-4'>
                            {/* <p>{index} Text = {JSON.stringify(result)}</p> */}
                            <a href={result.source}>Source</a>

                            <Image
                                src={result.url}
                                alt={result.source}
                                width={500}
                                height={500}
                                className=''
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TextQuery