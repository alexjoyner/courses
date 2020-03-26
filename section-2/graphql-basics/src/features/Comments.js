import { v4 as uuidv4 } from 'uuid';

const Query = {
	comments(parent, args, { db }) {
		if (!args.query) {
			return db.comments;
		}
		return db.comments.filter(comment =>
			comment.text.toLowerCase().includes(args.query.toLowerCase())
		);
	}
};

const Mutation = {
	createComment(parent, args, { db, pubsub }) {
		const userExists = db.users.some(user => user.id === args.data.author);
		const publicPostExists = db.posts.some(
			post => post.id === args.data.post && post.published
		);
		if (!userExists) {
			throw new Error('User not found');
		}
		if (!publicPostExists) {
			throw new Error('Public post not found');
		}

		const comment = {
			id: uuidv4(),
			...args.data
		};

		db.comments.push(comment);
		pubsub.publish(`comment-${args.data.post}`, {
			comment: { mutation: 'CREATED', data: comment }
		});
		return comment;
	},
	deleteComment(parent, args, { db, pubsub }) {
		const commentIndex = db.comments.findIndex(
			comment => comment.id === args.id
		);

		if (commentIndex === -1) {
			throw new Error('Comment not found');
		}

		const [comment] = db.comments.splice(commentIndex, 1);
		pubsub.publish(`comment-${comment.post}`, {
			comment: { mutation: 'DELETED', data: comment }
		});
		return comment;
	},
	updateComment(parent, { id, data }, { db }) {
		const comment = db.comments.find(comment => comment.id === id);
		if (!comment) {
			throw new Error('comment not found');
		}
		if (typeof data.text === 'string') {
			comment.text = data.text;
		}
		pubsub.publish(`comment-${comment.post}`, {
			comment: { mutation: 'UPDATED', data: comment }
		});
		return comment;
	}
};

const Comment = {
	author(parent, args, { db }) {
		return db.users.find(user => user.id === parent.author);
	},
	post(parent, args, { db }) {
		return db.posts.find(post => post.id === parent.post);
	}
};

const Subscription = {
	comment: {
		subscribe(parent, { postId }, { db, pubsub }, info) {
			const post = db.posts.find(post => post.id === postId && post.published);
			if (!post) {
				throw new Error('Post not found');
			}

			return pubsub.asyncIterator(`comment-${postId}`);
		}
	}
};

const CommentsFeature = {
	typeDefs: {
		mutations: /* GraphQL */ `
      createComment(data: CreateCommentInput!): Comment!
      deleteComment(id: ID!): Comment!
      updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    `,
		queries: /* GraphQL */ `
      comments(query: String): [Comment!]!
    `,
		subscriptions: /* GraphQL */ `
      comment(postId: ID!): CommentSubscriptionPayload!
      
    `,
		miscTypes: /* GraphQL */ `
			input CreateCommentInput {
				text: String!
				author: ID!
				post: ID!
			}
			input UpdateCommentInput {
				text: String
			}
			type Comment {
				id: ID!
				text: String!
				author: User!
				post: Post!
			}
			type CommentSubscriptionPayload {
				mutation: String!
				data: Comment!
			}
		`
	},
	resolvers: {
		Query,
		Mutation,
		Subscription,
		Comment
	}
};

export { CommentsFeature };
