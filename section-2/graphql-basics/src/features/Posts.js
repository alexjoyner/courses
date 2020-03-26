import { v4 as uuidv4 } from 'uuid';

const Post_Query = {
	posts(parent, args, { db }) {
		if (!args.query) {
			return db.posts;
		}
		return db.posts.filter(
			post =>
				post.title.toLowerCase().includes(args.query.toLowerCase()) ||
				post.body.toLowerCase().includes(args.query.toLowerCase())
		);
	}
};

const Post_Mutation = {
	createPost(parent, args, { db, pubsub }) {
		const userExists = db.users.some(user => user.id === args.data.author);
		if (!userExists) {
			throw new Error('User not found.');
		}
		const post = {
			id: uuidv4(),
			...args.data
		};

		db.posts.push(post);
		if (post.published) {
			pubsub.publish('post', { post });
		}
		return post;
	},
	deletePost(parent, args, { db }) {
		const postIndex = db.posts.findIndex(post => post.id === args.id);
		if (postIndex === -1) {
			throw new Error('Post not found');
		}
		const deletedPosts = db.posts.splice(postIndex, 1);

		db.comments = db.comments.filter(comment => comment.post !== args.id);

		return deletedPosts[0];
	},
	updatePost(parent, { id, data }, { db }) {
		const post = db.posts.find(post => post.id === id);
		if (!post) {
			throw new Error('post not found');
		}
		if (typeof data.title === 'string') {
			post.title = data.title;
		}
		if (typeof data.body === 'string') {
			post.body = data.body;
		}
		if (typeof data.published === 'boolean') {
			post.published = data.published;
		}
		return post;
	}
};

const Post = {
	author(parent, args, { db }) {
		return db.users.find(user => user.id === parent.author);
	},
	comments(parent, args, { db }) {
		return db.comments.filter(comment => comment.post === parent.id);
	}
};

const Subscription = {
	post: {
		subscribe(parent, args, { pubsub }) {
			return pubsub.asyncIterator('post');
		}
	}
};

const PostsFeature = {
	typeDefs: {
		mutations: /* GraphQL */ `
      createPost(data: CreatePostInput!): Post!
      deletePost(id: ID!): Post!
      updatePost(id: ID!, data: UpdatePostInput!): Post!
    `,
		queries: /* GraphQL */ `
      posts(query: String): [Post!]!
    `,
		subscriptions: /* GraphQL */ `
      post: Post!
    `,
		miscTypes: /* GraphQL */ `
			input CreatePostInput {
				title: String!
				body: String!
				published: Boolean!
				author: ID!
			}
			input UpdatePostInput {
				title: String
				body: String
				published: Boolean
			}
			type Post {
				id: ID!
				title: String!
				body: String!
				published: Boolean!
				author: User!
				comments: [Comment!]!
			}
		`
	},
	resolvers: {
		Query: {
			...Post_Query
		},
		Mutation: {
			...Post_Mutation
		},
		Subscription,
		Post
	}
};
export { PostsFeature };
