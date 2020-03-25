import { GraphQLServer } from 'graphql-yoga';

// Type Definitions (schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String!, position: String): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
	Query: {
		add(parent, { a, b }) {
			return a + b;
		},
		greeting(parent, args, ctx, info) {
			if (args.name && args.position) {
				return `Hello ${args.name}, you are my favorite ${args.position}`;
			}
			return `Hello`;
		},
		me() {
			return {
				id: '123098',
				name: 'John',
				email: 'john@test.com',
				age: 78
			};
		},
		post() {
			return {
				id: '3',
				title: 'Test Post',
				body: 'This is my first post from GraphQL',
				published: false
			};
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
