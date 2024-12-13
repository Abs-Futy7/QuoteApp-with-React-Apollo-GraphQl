import React, { useState } from 'react'
import icon from '../public/undraw_diary_re_4jpc.svg'
import { useMutation } from '@apollo/client'
import { CREATE_QUOTE } from '../gqlOperations/mutations'

const CreateQuote = () => {
    const [quote,setQuote] = useState("")

    const [createQuote, {data, loading, error}] = useMutation(CREATE_QUOTE, {
        refetchQueries:[
            'getAllQuotes',
            'getMyProfile'
        ]
    })
    if(loading) return <p>Loading...</p>
    if(error){
        console.log(error)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        createQuote({
            variables: {
                name: quote
            }
        })
    }


    return (
        <div className="min-h-screen">
            {
                error && <p className='text-red-500 text-center text-3xl mb-8'>{error.message}</p>
            }
            {
                data && <p className='text-green-500 text-center text-3xl mb-8'>Quote created successfully</p>
            }
            <div className='flex min-h-screen text-white p-5 justify-center'>
            <div>
            <img src={icon} alt="icon" className="flex w-64 h-auto items-center justify-center "/>
            </div>
            
            <div className='ml-20'>
            <div className='text-3xl font-bold my-3'>
                Write Your Quote
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={quote}
                    onChange={e=>setQuote(e.target.value)}
                    placeholder="write your quote here"
                    className='bg-gray-300 rounded-md p-2 my-2 text-black text-xl h-30'
                    />
                 <button className="flex bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-lg mt-2">Create</button>
            </form>
            </div>
            </div>
            
        </div>
    )
}

export default CreateQuote