import React from "react";
import AddPerson from "../form/AddContact";
import AddCar from "../form/AddCar";
import Contacts from "../lists/Contacts";
const Top = () => {
  return (
    <>
      <AddPerson />
      <AddCar />
      <Contacts />
    </>
  );
};

export default Top;