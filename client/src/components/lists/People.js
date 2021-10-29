import React from "react";
import { List } from "antd";
import Person from "../listItems/Person";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
  margin: {
    marginBottom: "3rem",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;
  return (
    <List grid={{ gutter: 30, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item style={styles.margin}>
          <Person id={id} key={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
