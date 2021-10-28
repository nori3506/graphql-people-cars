import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CONTACTS, REMOVE_CONTACT } from "../../queries";
import { filter } from "lodash";

const Removecontact = ({ id, firstName, lastName }) => {
  const [removeContact] = useMutation(REMOVE_CONTACT, {
    update(cache, { data: { removeContact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS });
      cache.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, (c) => {
            return c.id !== removeContact.id;
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
      removeContact({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removeContact: {
            __typename: "Contact",
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
