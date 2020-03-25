const deepmerge = require('deepmerge');
const AddFeature = (Base, Feature) => {
	return {
		typeDefs: {
			mutations: ` ${Base.typeDefs.mutations} ${Feature.typeDefs.mutations} `,
			queries: ` ${Base.typeDefs.queries} ${Feature.typeDefs.queries} `,
			subscriptions: ` ${Base.typeDefs.subscriptions} ${Feature.typeDefs.subscriptions} `,
			miscTypes: ` ${Base.typeDefs.miscTypes} ${Feature.typeDefs.miscTypes} `
		},
		resolvers: deepmerge(Base.resolvers, Feature.resolvers),
		context: { ...Base.context }
	};
};

const BuildApp = AppObj => {
	let typeDefs = ``;
	if (
		typeof AppObj.typeDefs.queries === 'string' &&
		/[\S]/.test(AppObj.typeDefs.queries)
	) {
		typeDefs += `
    type Query {
      ${AppObj.typeDefs.queries}
    }`;
	}
	if (
		typeof AppObj.typeDefs.mutations === 'string' &&
		/[\S]/.test(AppObj.typeDefs.mutations)
	) {
		typeDefs += `
    type Mutation {
      ${AppObj.typeDefs.mutations}
    }`;
	}
	if (
		typeof AppObj.typeDefs.subscriptions === 'string' &&
		/[\S]/.test(AppObj.typeDefs.subscriptions)
	) {
		typeDefs += `
    type Subscription {
      ${AppObj.typeDefs.subscriptions}
    }`;
	}
	if (
		typeof AppObj.typeDefs.miscTypes === 'string' &&
		AppObj.typeDefs.miscTypes.length > 0
	) {
		typeDefs += ` ${AppObj.typeDefs.miscTypes} `;
	}

	return {
		...AppObj,
		typeDefs
	};
};

export { BuildApp, AddFeature };
