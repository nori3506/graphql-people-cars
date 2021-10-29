import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setpersonId] = useState(props.personId);
  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate();
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error: ${error.message}`;

  const { Option } = Select;

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
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

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
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
        updateCar: {
          __typename: "Car",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
      size="large"
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input onChange={(e) => updateStateVariable("year", e.target.value)} />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input maker name!" }]}
      >
        <Input onChange={(e) => updateStateVariable("make", e.target.value)} />
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
              (!form.isFieldTouched("year") && !form.isFieldTouched("make")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
