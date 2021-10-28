import React, { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemoveContact";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../form/UpdateContact";
import Cars from "../lists/Cars";

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
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <>
          <Card
            title={firstName + " " + lastName}
            extra={<a href="#">Learn More</a>}
            actions={[
              <EditOutlined
                key="edit"
                onClick={handleButtonClick}
                id={id}
                firstName={firstName}
                lastName={lastName}
              />,
              <RemovePerson
                id={id}
                firstName={firstName}
                lastName={lastName}
              />,
            ]}
          >
            <Cars personId={props.id} name={props.firstName} />
          </Card>
        </>
      )}
    </>
  );
};

export default Contact;
