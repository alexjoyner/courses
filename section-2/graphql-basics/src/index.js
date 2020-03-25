import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Demo User Data
const users = [
	{
		id: '1',
		name: 'Andrew',
		email: 'andrew@example.com',
		age: 27,
		comments: ['1', '4']
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com',
		age: 15,
		comments: ['2']
	},
	{
		id: '3',
		name: 'Alex',
		email: 'alex@example.com',
		comments: ['3']
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

// Comments Demo Data
const comments = [
	{
		id: '1',
		text: 'What even is life?',
		author: '1',
		post: '1'
	},
	{
		id: '2',
		text: 'Are you coming over?',
		author: '2',
		post: '2'
	},
	{
		id: '3',
		text: 'This is a very cool app!',
		author: '3',
		post: '1'
	},
	{
		id: '4',
		text: 'There had to be a fourth comment',
		author: '1',
		post: '3'
	}
];

// Type Definitions (schema)
const typeDefs = `
  type Query {
    comments(query: String): [Comment!]!
    posts(query: String): [Post!]!
    users(query: String): [User!]!
    add(nums: [Float!]!): Float!
    greeting(name: String!, position: String): String!
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
	Query: {
		comments(parent, args) {
			if (!args.query) {
				return comments;
			}
			return comments.filter(comment =>
				comment.text.toLowerCase().includes(args.query.toLowerCase())
			);
		},
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
	Mutation: {
		createUser(parent, args) {
			const emailTaken = users.some(user => user.email === args.email);
			if (emailTaken) {
				throw new Error('Email taken.');
			}
			const user = {
				id: uuidv4(),
				name: args.name,
				email: args.email,
				age: args.age
			};

			users.push(user);
			return user;
		}
	},
	Post: {
		author(parent, args) {
			return users.find(user => user.id === parent.id);
		},
		comments(parent, args) {
			return comments.filter(comment => comment.id === parent.id);
		}
	},
	User: {
		posts(parent) {
			return posts.filter(post => post.author === parent.id);
		},
		comments(parent, args) {
			return comments.filter(comment => comment.id === parent.id);
		}
	},
	Comment: {
		author(parent, args) {
			return users.find(user => user.id === parent.id);
		},
		post(parent, args) {
			return posts.find(post => post.id === parent.id);
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
