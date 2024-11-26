"use client";
import React, { useState } from 'react'
import axios from "axios"

function ImageQuery() {

    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [response, setResponse] = useState(null)
    const [message, setMessage] = useState(null)
    const [n, setN] = useState(2)

    const handleImageChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const fileType = file.type.split('/')[1];

            if (file.type.split('/')[1] !== 'jpeg' && file.type.split('/')[1] !== 'png' && file.type.split('/')[1] !== 'jpg') {
                setMessage("Invalid file type. Please upload a jpeg, jpg or png file");
                setImage(null);
                setImagePreview(null);
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setMessage(null);
        }
    }

    const handleSubmit = async () => {
        if (!image) {
            return;
        }

        if (n <= 0) {
            setMessage("Invalid number of results. Please enter a number greater than 0");
            setResponse(null);
            return;
        } else {
            setMessage(null);
        }

        const formData = new FormData()
        formData.append('file', image)


        try {
            const res = await axios.post(`http://localhost:8000/query_with_image?n=${parseInt(n, 10)}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });
            setResponse(res.data);
        } catch (error) {
            console.error("Error uploading image: ", error);
            setResponse("Error uploading image");
        }
    }

    return (
        <div className='border py-4 px-12'>
            <h2 className='text-2xl text-orange-300 my-2 font-bold'>Query for Sources with Images</h2>
            <div className=''>
                <div>
                    <label className="block  text-sm font-bold mb-2" >
                        Upload Image
                    </label>
                    <input className='' type="file" accept='image/*' onChange={handleImageChange} />

                </div>
                <div>
                    <label className="block text-gray-300 text-sm font-bold mb-2 mt-4" >
                        Number of Results
                    </label>
                    <input className='shadow shadow-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" value={n} onChange={(e) => setN(e.target.value)} />
                </div>
            </div>
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4' onClick={handleSubmit}>Upload</button>
            <div className='my-2'>
                {message && <p>{message}</p>}
            </div>
            <div className='my-2'>
                {response && <p className='my-4'>Read these sources to know more about the image</p>}
                {response && response.result_ids.map((result, index) => {
                    return (
                        <div key={index} className='border p-4'>
                            <p>Source {index + 1} <a className='text-red-500 hover:underline hover:underline-offset-4' href={result} target='_blank'>{result}</a></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ImageQuery