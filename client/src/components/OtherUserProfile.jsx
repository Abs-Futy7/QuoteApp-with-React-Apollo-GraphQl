import { useQuery } from "@apollo/client";
import React from "react";
import {GET_USER_BY_ID } from "../gqlOperations/queries";
import { useParams } from "react-router-dom";

const OtherUserProfile = () => {

    const {userid} = useParams()
    const {loading,error,data} = useQuery(GET_USER_BY_ID,{
        variables:{userid}
    })

    if(loading) return <h2>Profile is loading</h2>
    if(error){
        console.log(error)
    }

  return (
    <div className="flex flex-col items-center min-h-screen text-white">
      <div className="">
        <img
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
          className="flex w-60 h-60 rounded-full  border-4 border-orange-600 mt-20"
        />
        <h5 className="text-3xl font-bold mt-3">
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6 className="text-2xl mb-5">{data.user.email}</h6>
      </div>
      <h3 className="text-2xl font-semibold text-orange-500">Your quotes: </h3>
      {data.user.quotes.map((quo) => {
        return (
          <blockquote
            key={quo.name}
            className="text-2xl font-semibold text-gray-500"
          >
            <h6>{quo.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default OtherUserProfile;