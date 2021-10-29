import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Person = (props) => {
  return (
    <>
      <Button>
        <Link to="/">Go Back</Link>
      </Button>
    </>
  );
};

export default Person;
