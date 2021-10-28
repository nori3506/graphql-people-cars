import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../queries";
import { filter } from "lodash";

const Removecontact = ({ id, firstName, lastName }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (c) => {
            return c.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "are you sure you want to delete this contact?"
    );
    if (result) {
      removePerson({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removePerson: {
            __typename: "People",
            id,
            firstName,
            lastName,
          },
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default Removecontact;
