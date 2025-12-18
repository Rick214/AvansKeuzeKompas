export type User = {
	id: number;
	registered_modules: number[];
	favorite_modules: number[];
	recommended_modules: number[];
};

export const dummyUser: User = {
	id: 1,
	registered_modules: [1, 5],
	favorite_modules: [1, 2, 4],
	recommended_modules: [2, 3, 5]
};
