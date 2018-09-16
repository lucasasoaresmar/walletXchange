export const mockedStorage = {
	users: {
		1: {
			id: 1,
			name: 'Lucas',
			password: '123',
			real: 100000,
			brita: 0,
			bitcoin: 0,
			exchanges: [1,2]
		}
	},
	usersId: [1],
	exchanges: {
		1: {
			id: 1,
			userId: 1,
			date: '21/08/2018',
			from: 'brita',
			to: 'real',
			amount: 200.22,
			exchanged: 13
		},
		2: {
			id: 2,
			userId: 1,
			date: '21/08/2018',
			from: 'real',
			to: 'bitcoin',
			amount: 300.98,
			exchanged: 0.16
		}
	},
	exchangesId: [1,2]
}