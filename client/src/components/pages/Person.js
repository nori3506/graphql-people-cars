import { useQuery } from "@apollo/client";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { GET_CARS, GET_PERSON } from "../../queries";

const Person = () => {
  const people_id = window.location.pathname.split("/people/", 2)[1];
  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id: people_id },
  });
  const cars = useQuery(GET_CARS);

  if (loading || cars.loading) return "loading...";
  if (error || cars.error) return `Error: ${error.message}`;

  return (
    <>
      <h1>
        {data.person.firstName} {data.person.lastName}'s Car
      </h1>
      {cars.data.cars.map((car) => {
        if (car.personId == people_id) {
          return (
            <>
              <h2>{car.model}</h2>
              <p> year: {car.year}</p>
              <p> Make: {car.make}</p>
              <p> Price: {car.price}</p>
            </>
          );
        }
      })}
      <Button>
        <Link to="/">Go Back</Link>
      </Button>
    </>
  );
};

export default Person;
