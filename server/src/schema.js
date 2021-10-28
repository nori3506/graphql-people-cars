import { gql } from "apollo-server-express";
import { find, remove } from "lodash";

const contacts = [
  {
    id: "1",
    firstName: "Noris",
    lastName: "Nishiyama",
  },
  {
    id: "2",
    firstName: "Paul",
    lastName: "Jordan",
  },
  {
    id: "3",
    firstName: "Jim",
    lastName: "Tomas",
  },
];

const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type People {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String!
  }

  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String, firstName: String!, lastName: String!): Contact
    removeContact(id: String!): Contact
  }
`;

const resolvers = {
  Query: {
    contact(parent, args, context, info) {
      return find(contacts, { id: args.id });
    },
    contacts: () => contacts,
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      contacts.push(newContact);
      return newContact;
    },
    updateContact: (root, args) => {
      const contact = find(contacts, { id: args.id });
      if (!contact) {
        throw new Error(`Couldn't find contact with id ${args.id}`);
      }

      contact.firstName = args.firstName;
      contact.lastName = args.lastName;

      return contact;
    },
    removeContact: (root, args) => {
      const removedContact = find(contacts, { id: args.id });
      if (!removedContact) {
        throw new Error(`Couldn't find contact with id ${args.id}`);
      }
      remove(contacts, (c) => {
        return c.id === removedContact.id;
      });

      return removedContact;
    },
  },
};

export { typeDefs, resolvers };
