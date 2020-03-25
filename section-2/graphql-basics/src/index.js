import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { BuildApp, AddFeature } from './utils/AppBuilder';
import { CommentsFeature } from './features/Comments';
import { PostsFeature } from './features/Posts';
import { UsersFeature } from './features/Users';
import { CountFeature } from './features/Count';

const pubsub = new PubSub();
let AppObj = {
	typeDefs: {
		mutations: ``,
		queries: ``,
		subscriptions: ``,
		miscTypes: ``
	},
	resolvers: {},
	context: { db, pubsub }
};

AppObj = AddFeature(AppObj, CommentsFeature);
AppObj = AddFeature(AppObj, PostsFeature);
AppObj = AddFeature(AppObj, UsersFeature);
AppObj = AddFeature(AppObj, CountFeature);

// console.log(BuildApp(AppObj).resolvers);

const server = new GraphQLServer(BuildApp(AppObj));

server.start(() => {
	console.log('The server is up!');
});
