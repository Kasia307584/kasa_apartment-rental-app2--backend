import { ApolloServer, gql } from "apollo-server";
import apartments from "./products.json" assert { type: "json" };

const typeDefs = gql`
  type Host {
    name: String!
    picture: String!
  }

  type Apartment {
    id: ID!
    title: String!
    cover: String!
    pictures: [String!]!
    description: String!
    host: Host!
    rating: String!
    location: String!
    equipments: [String!]!
    tags: [String]!
  }

  type Query {
    apartments: [Apartment!]!
    apartment(id: ID!): Apartment
  }
  type Mutation {
    addApartment(title: String!, cover: String!): Apartment
  }
`;

const resolvers = {
  Query: {
    apartments: () => apartments,
    apartment: (_: any, { id }: { id: string }) =>
      apartments.find((apt) => apt.id === id),
  },
  // Mutation: {
  //   addApartment: (
  //     _: any,
  //     { title, cover }: { title: string; cover: string }
  //   ) => {
  //     const newApartment = { id: "jk22", title, cover };
  //     apartments.push(newApartment);
  //   },
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
