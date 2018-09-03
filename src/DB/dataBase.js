export const DB = {
	storageName: 'DB',
	storage: {
		users: {
			1: {
				id: 1,
				name: 'Lucas',
				password: '123',
		 		real: 100000,
		 		brita: 0,
		 		bitcoin: 0
			}
		},
		usersId: [1]
	},
	findUser: function(user) {
		let userId;

		const checkUser = this.storage.usersId.some(savedUserId => {
			userId = savedUserId
			return this.storage.users[savedUserId].name === user.name
		})

		if (checkUser) return this.storage.users[userId]
	},
	addUser: function(newUser) {
		if (this.findUser(newUser)) return { status: 400, data:'Usuário já cadastrado' }

		const userId = this.storage.usersId.length + 1;
		
		this.storage.users = {
			...this.storage.users, 
			[userId]: {
				id: userId,
				name: newUser.name,
	 			password: newUser.password,
				real: 100000,
	 			brita: 0,
	 			bitcoin: 0
			}
		}

		this.storage.usersId = [...this.storage.usersId, userId]
		this.saveToStorage();
		
		return { status: 201, data: this.storage.users[userId] }
	},
	authUser: function(authUser) {
		const savedUser = this.findUser(authUser)
		
		if (!savedUser) return { status: 400, data: 'Cadastre-se primeiro :)'}

		return savedUser.password === authUser.password
			? { status: 200, data: savedUser }
			: { status: 401, data: 'Senha errada :(' }
	},
	saveToStorage: function() {
		localStorage.setItem(this.storageName, JSON.stringify(this.storage))
	},
	loadStorage: function() {
		const storage = localStorage.getItem(this.storageName)

		if(!storage) {
			this.saveToStorage()
			return 'localStorage iniciado!'
		}
		
		const parsedStorage = JSON.parse(storage)
		this.storage = { ...parsedStorage }
		return parsedStorage
	}
}
