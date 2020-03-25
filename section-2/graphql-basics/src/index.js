import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import { Comment_Query, Comment_Mutation, Comment } from './features/Comments';
import { Post_Query, Post_Mutation, Post } from './features/Posts';
import { User_Query, User_Mutation, User } from './features/Users';

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query: {
			...Comment_Query,
			...Post_Query,
			...User_Query
		},
		Mutation: {
			...Comment_Mutation,
			...Post_Mutation,
			...User_Mutation
		},
		Post,
		User,
		Comment
	},
	context: { db }
});

server.start(() => {
	console.log('The server is up!');
});
