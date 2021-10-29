import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    const { firstName, lastName } = values;
    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPerson: {
          __typename: "People",
          id,
          firstName,
          lastName,
        },
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE });
        proxy.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <>
      <h2>Add People!</h2>
      <Form
        form={form}
        onFinish={onFinish}
        name="add-contact-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "please input your first name" }]}
        >
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "please input your last name" }]}
        >
          <Input placeholder="Ropes" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add People
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPerson;
