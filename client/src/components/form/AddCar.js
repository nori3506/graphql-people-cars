import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { GET_CARS, ADD_CAR, GET_PEOPLE } from "../../queries";
import { add } from "lodash";

const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addCar: {
          __typename: "Car",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <>
      <h2>Add Car!</h2>
      <Form
        form={form}
        onFinish={onFinish}
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
      >
        <Form.Item
          name="year"
          rules={[
            {
              required: true,
              message: "please input year when the car was made",
            },
          ]}
        >
          <Input placeholder="2001" />
        </Form.Item>
        <Form.Item
          name="make"
          rules={[{ required: true, message: "please input maker name" }]}
        >
          <Input placeholder="Toyota" />
        </Form.Item>
        <Form.Item
          name="model"
          rules={[{ required: true, message: "please input model name" }]}
        >
          <Input placeholder="Estima" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "please input price of the car",
            },
          ]}
        >
          <Input placeholder="60000" />
        </Form.Item>
        <Form.Item
          name="personId"
          noStyle
          rules={[{ required: true, message: "People is required" }]}
        >
          <Select
            // defaultValue="lucy"
            style={{ width: 120 }}
          >
            {data.people.map((person) => (
              <Option value={person.id}>
                {person.firstName} {person.lastName}
              </Option>
            ))}
          </Select>
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
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
