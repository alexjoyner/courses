import uuidv4 from 'uuid/v4';

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
	createPost(parent, args, { db }) {
		const userExists = db.users.some(user => user.id === args.data.author);
		if (!userExists) {
			throw new Error('User not found.');
		}
		const post = {
			id: uuidv4(),
			...args.data
		};

		db.posts.push(post);

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

export { Post_Query, Post_Mutation, Post };
