import React from "react";
import { List } from "antd";
import Car from "../listItems/Car";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = (props) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;
  return (
    <>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.cars.map(({ id, year, make, model, price, personId }) => {
          if (personId == props.personId) {
            return (
              <List.Item>
                <Car
                  id={id}
                  key={id}
                  year={year}
                  make={make}
                  model={model}
                  price={price}
                  personId={personId}
                />
              </List.Item>
            );
          }
        })}
      </List>
    </>
  );
};

export default Cars;
