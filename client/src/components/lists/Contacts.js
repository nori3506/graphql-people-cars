import React from "react";
import { List } from "antd";
import Contact from "../listItems/Contact";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "../../queries";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Contacts = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CONTACTS);
  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.contacts.map(({ id, firstName, lastName }) => (
        <List.Item>
          <Contact id={id} key={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

export default Contacts;
