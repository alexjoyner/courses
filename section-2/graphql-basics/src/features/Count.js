const Subscription = {
	count: {
		subscribe(parent, args, { pubsub }) {
			let count = 0;
			setInterval(() => {
				pubsub.publish('count', { count });
				count++;
			}, 1000);
			return pubsub.asyncIterator('count');
		}
	}
};

const CountFeature = {
	typeDefs: {
		mutations: /* GraphQL */ ``,
		queries: /* GraphQL */ ``,
		subscriptions: /* GraphQL */ `
      count: Int!
    `,
		miscTypes: /* GraphQL */ ``
	},
	resolvers: {
		Query: {},
		Mutation: {},
		Subscription
	}
};
export { CountFeature };
