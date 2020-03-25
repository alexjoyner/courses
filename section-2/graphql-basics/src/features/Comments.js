import uuidv4 from 'uuid/v4';

const Comment_Query = {
	comments(parent, args, { db }) {
		if (!args.query) {
			return db.comments;
		}
		return db.comments.filter(comment =>
			comment.text.toLowerCase().includes(args.query.toLowerCase())
		);
	}
};

const Comment_Mutation = {
	createComment(parent, args, { db }) {
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
		return comment;
	},
	deleteComment(parent, args, { db }) {
		const commentIndex = db.comments.findIndex(
			comment => comment.id === args.id
		);

		if (commentIndex === -1) {
			throw new Error('Comment not found');
		}

		const deletedComments = db.comments.splice(commentIndex, 1);
		return deletedComments[0];
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

export { Comment_Query, Comment_Mutation, Comment };
