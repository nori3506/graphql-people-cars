import React, { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemoveContact";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../form/UpdateContact";
const getStyles = () => ({
  card: { width: "500px" },
});

const Car = (props) => {
  const styles = getStyles();
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setpersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setpersonId(value);
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
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
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
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
            <RemovePerson
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
        >
          {year}
          {make}
          {model}
          {price}
          {personId}
        </Card>
      )}
    </>
  );
};

export default Car;
