import { mockedStorage } from './mockedStorage.js'

export const DB = {
	storageName: 'DB',
	storageType: window.localStorage,
	storage: mockedStorage,
	findUser: function(user) {
		let userId;

		const checkUser = this.storage.usersId.some(savedUserId => {
			userId = savedUserId
			return this.storage.users[savedUserId].name === user.name
		})

		if (!checkUser) return null
		if (checkUser) return this.storage.users[userId]
	},
	addUser: function(newUser) {
		if (!newUser.password || !newUser.name) return { status: 400, data:'Estão faltando dados' }
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
	 			bitcoin: 0,
	 			exchanges: []
			}
		}

		this.storage.usersId = [...this.storage.usersId, userId]
		this.saveToStorage()
		
		return { status: 201, data: this.storage.users[userId] }
	},
	authUser: function(authUser) {
		const savedUser = this.findUser(authUser)
		
		if (!savedUser) return { status: 400, data: 'Cadastre-se primeiro :)' }

		return savedUser.password === authUser.password
			? { status: 200, data: savedUser }
			: { status: 401, data: 'Senha errada :(' }
	},
	findExchanges: function(user) {
		const savedUser = this.findUser(user)
		
		if (!savedUser) return { status: 400, data: 'Cadastre-se antes de comprar :)' }

		const exchanges = savedUser.exchanges.map(exchange => this.storage.exchanges[exchange])

		return { status: 200, data: exchanges }
	},
	addExchange: function(newMoney, exchange) {
		const user = this.storage.users[exchange.userId];

		if (!user) return {status: 404, data: 'Usuário não encontrado'}

		const exchangeId = this.storage.exchangesId.length + 1

		this.storage.exchanges = {
			...this.storage.exchanges,
			[exchangeId]: {
				id: exchangeId,
				userId: exchange.userId,
				date: exchange.date,
				from: exchange.from,
				to: exchange.to,
				amount: exchange.amount
			}
		}

		this.storage.users[user.id] = {
			...this.storage.users[user.id],
			...newMoney,
			exchanges: [
				...this.storage.users[user.id].exchanges,
				exchangeId
			]
		}

		this.storage.exchangesId = [...this.storage.exchangesId, exchangeId]
		
		this.saveToStorage()

		return { status: 201, data: [this.storage.exchanges[exchangeId]] }
	},
	saveToStorage: function() {
		this.storageType.setItem(this.storageName, JSON.stringify(this.storage))
	},
	loadStorage: function() {
		const storage = this.storageType.getItem(this.storageName)

		if(!storage) {
			this.saveToStorage()
			return 'Não havia base salva. Agora tem!'
		}
		
		const parsedStorage = JSON.parse(storage)
		this.storage = { ...parsedStorage }
		return parsedStorage
	}
}
