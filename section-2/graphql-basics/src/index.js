import { GraphQLServer } from 'graphql-yoga';

// Demo User Data
const users = [
	{
		id: '1',
		name: 'Andrew',
		email: 'andrew@example.com',
		age: 27
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com',
		age: 15
	},
	{
		id: '3',
		name: 'Alex',
		email: 'alex@example.com'
	}
];

// Posts Demo Data
const posts = [
	{
		id: '1',
		title: 'My Post',
		body: 'This is my first post from GraphQL',
		published: false,
		author: '3'
	},
	{
		id: '2',
		title: 'Test post 2',
		body: 'aawfelkj ;lakjkaj we;flj owe foij sdfoj a;slkd',
		published: false,
		author: '2'
	},
	{
		id: '3',
		title: 'Blah Blah Blah',
		body: 'aksj;dflkja;sdfk squirrel dslkfh;lksdjf;lkjs;fe SQUIRRREL',
		published: false,
		author: '2'
	}
];

// Type Definitions (schema)
const typeDefs = `
  type Query {
    posts(query: String): [Post!]!
    users(query: String): [User!]!
    add(nums: [Float!]!): Float!
    greeting(name: String!, position: String): String!
    grades: [Int!]!
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
    author: User!
  }
`;

// Resolvers
const resolvers = {
	Query: {
		posts(parent, args) {
			if (!args.query) {
				return posts;
			}
			return posts.filter(
				post =>
					post.title.toLowerCase().includes(args.query.toLowerCase()) ||
					post.body.toLowerCase().includes(args.query.toLowerCase())
			);
		},
		users(parent, args) {
			if (!args.query) {
				return users;
			}
			return users.filter(user =>
				user.name.toLowerCase().includes(args.query.toLowerCase())
			);
		},
		grades() {
			return [100, 100, 59];
		},
		add(parent, { nums }) {
			console.log(nums);
			if (nums.length === 0) return 0;
			return nums.reduce((tot, num) => num + tot, 0);
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
			return posts[0];
		}
	},
	Post: {
		author(parent, args) {
			return users.find(user => user.id === parent.id);
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
