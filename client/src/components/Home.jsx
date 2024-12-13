import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_QUOTES } from '../gqlOperations/queries'
import { Link } from 'react-router-dom'


const Home = () => {
  const {loading, error, data} = useQuery(GET_ALL_QUOTES)
  if(loading) return <p>Loading...</p>
  if(error){
    console.log(error)
    return <p>Error</p>
  }
  if(data.quotes.length === 0) return <p
  className='text-[40px] font-semibold text-gray-500 justify-center text-center items-center mt-10'>No quotes available</p>
  return (

    <div className=''>
        <h3 className='text-2xl font-semibold text-orange-500'>Your quotes: </h3>
        {
           data.quotes.map(quote =>{
            return(
              <blockquote>
                   <h6>{quote.name}</h6>
                   <Link to = {`/profile/${quote.by._id}`}><p className="right-align">~{quote.by.firstName}</p></Link>
               </blockquote>
            )
        })
        }
    </div>
  )
}

export default Home