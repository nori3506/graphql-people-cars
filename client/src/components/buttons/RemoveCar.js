import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const RemoveCar = ({ id, year, make, model, price, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("are you sure you want to delete this car?");
    if (result) {
      removeCar({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removePerson: {
            __typename: "Car",
            id,
            year,
            make,
            model,
            price,
            personId,
          },
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveCar;
