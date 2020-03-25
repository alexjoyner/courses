import { GraphQLServer } from 'graphql-yoga';

// Scalar types - Sting, Boolean, Int, Float, ID

// Type Definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
	Query: {
		title() {
			return 'Back to the future';
		},
		price() {
			return 17.5;
		},
		releaseYear() {
			return 1985;
		},
		rating() {
			return 4.99;
		},
		inStock() {
			return true;
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('The server is up!');
});
