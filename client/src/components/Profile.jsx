import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqlOperations/queries";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  if (!localStorage.getItem("token")) {
    navigate("/login");
    return (
      <h1 className="text-2xl font-semibold text-gray-500 justify-center text-center items-center mt-10">
        You are not logged in
      </h1>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

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

export default Profile;
