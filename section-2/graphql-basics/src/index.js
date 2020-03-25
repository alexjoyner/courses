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
		id: '11',
		title: 'My Post',
		body: 'This is my first post from GraphQL',
		published: true,
		author: '3'
	},
	{
		id: '12',
		title: 'Test post 2',
		body: 'aawfelkj ;lakjkaj we;flj owe foij sdfoj a;slkd',
		published: false,
		author: '2'
	},
	{
		id: '13',
		title: 'Blah Blah Blah',
		body: 'aksj;dflkja;sdfk squirrel dslkfh;lksdjf;lkjs;fe SQUIRRREL',
		published: false,
		author: '2'
	}
];

// Comments Demo Data
const comments = [
	{
		id: '21',
		text: 'What even is life?',
		author: '1',
		post: '11'
	},
	{
		id: '22',
		text: 'Are you coming over?',
		author: '2',
		post: '12'
	},
	{
		id: '23',
		text: 'This is a very cool app!',
		author: '3',
		post: '11'
	},
	{
		id: '24',
		text: 'There had to be a fourth comment',
		author: '1',
		post: '13'
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
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
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
		},
		createPost(parent, args) {
			const userExists = users.some(user => user.id === args.author);
			if (!userExists) {
				throw new Error('User not found.');
			}
			const post = {
				id: uuidv4(),
				title: args.title,
				body: args.body,
				published: args.published,
				author: args.author
			};

			posts.push(post);
			console.log(posts);

			return post;
		},
		createComment(parent, args) {
			const userExists = users.some(user => user.id === args.author);
			const publicPostExists = posts.some(
				post => post.id === args.post && post.published
			);
			if (!userExists) {
				throw new Error('User not found');
			}
			if (!publicPostExists) {
				throw new Error('Public post not found');
			}

			const comment = {
				id: uuidv4(),
				text: args.text,
				post: args.post,
				author: args.author
			};

			comments.push(comment);
			return comment;
		}
	},
	Post: {
		author(parent, args) {
			return users.find(user => user.id === parent.author);
		},
		comments(parent, args) {
			return comments.filter(comment => comment.post === parent.id);
		}
	},
	User: {
		posts(parent) {
			return posts.filter(post => post.author === parent.id);
		},
		comments(parent, args) {
			return comments.filter(comment => comment.author === parent.id);
		}
	},
	Comment: {
		author(parent, args) {
			return users.find(user => user.id === parent.author);
		},
		post(parent, args) {
			return posts.find(post => post.id === parent.post);
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
