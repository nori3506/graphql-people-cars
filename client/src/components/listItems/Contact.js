import React, { useState } from "react";
import { Card } from "antd";
import RemoveContact from "../buttons/RemoveContact";
import { EditOutlined } from "@ant-design/icons";
import UpdateContact from "../form/UpdateContact";
const getStyles = () => ({
  card: { width: "500px" },
});

const Contact = (props) => {
  const styles = getStyles();
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined
              key="edit"
              onClick={handleButtonClick}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          {firstName}
          {lastName}
        </Card>
      )}
    </>
  );
};

export default Contact;
