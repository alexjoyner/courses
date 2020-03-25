// Demo User Data
let users = [
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
let posts = [
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
	},
	{
		id: '14',
		title: 'Test post by andrew',
		body: 'THIS THING NEEDS TO BE DEALT WITH!',
		published: true,
		author: '1'
	}
];

// Comments Demo Data
let comments = [
	{
		id: '21',
		text: 'What even is life?',
		author: '2',
		post: '14'
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

const db = {
	users,
	posts,
	comments
};

export { db as default };
