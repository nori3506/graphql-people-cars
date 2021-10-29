import React from "react";
import AddPerson from "../form/AddPerson";
import AddCar from "../form/AddCar";
import People from "../lists/People";
const Top = () => {
  return (
    <>
      <AddPerson />
      <AddCar />
      <People />
    </>
  );
};

export default Top;
