import React, { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../form/UpdateCar";
const getStyles = () => ({
  card: {
    width: "500px",
    backgroundColor: "lightgreen",
  },
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
        <UpdateCar
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
            <RemoveCar
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
        >
          <p>year: {year}</p>
          <p>maker: {make}</p>
          <p>model: {model}</p>
          <p>price: ${price}</p>
          <p>year: {year}</p>
        </Card>
      )}
    </>
  );
};

export default Car;
