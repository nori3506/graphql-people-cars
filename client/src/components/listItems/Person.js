import React, { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../form/UpdatePerson";
import Cars from "../lists/Cars";
import { Link } from "react-router-dom";

const getStyles = () => ({
  card: { width: "500px" },
});

const Person = (props) => {
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
            <Link to={`/people/${props.id}`}>Learn More </Link>
          </Card>
        </>
      )}
    </>
  );
};

export default Person;
