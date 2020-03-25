import uuidv4 from 'uuid/v4';

const User_Query = {
	users(parent, args, { db }) {
		if (!args.query) {
			return db.users;
		}
		return db.users.filter(user =>
			user.name.toLowerCase().includes(args.query.toLowerCase())
		);
	}
};

const User_Mutation = {
	createUser(parent, args, { db }) {
		const emailTaken = db.users.some(user => user.email === args.data.email);
		if (emailTaken) {
			throw new Error('Email taken.');
		}
		const user = {
			id: uuidv4(),
			...args.data
		};

		db.users.push(user);
		return user;
	},
	deleteUser(parent, args, { db }) {
		const userIndex = db.users.findIndex(user => user.id === args.id);
		if (userIndex === -1) {
			throw new Error('User not found');
		}

		const deletedUsers = db.users.splice(userIndex, 1);

		db.posts = db.posts.filter(post => {
			const match = post.author === args.id;

			if (match) {
				// removes all the comments of the users posts
				db.comments = db.comments.filter(comment => comment.post !== post.id);
			}
			return !match;
		});
		// removes all the comments of the user from other users posts
		db.comments = db.comments.filter(comment => comment.author !== args.id);
		return deletedUsers[0];
	}
};

const User = {
	posts(parent, args, { db }) {
		return db.posts.filter(post => post.author === parent.id);
	},
	comments(parent, args, { db }) {
		return db.comments.filter(comment => comment.author === parent.id);
	}
};

export { User_Query, User_Mutation, User };
