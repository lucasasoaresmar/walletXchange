import { DB } from './dataBase'
import { mockedLocalStore } from './mockedLocalStore.js'
import { mockedStorage } from './mockedStorage.js'

let store, newDB

const newUser = {
	id: 2,
	name: 'Cris',
	password: '123456',
	real: 100000,
	brita: 0,
	bitcoin: 0,
	exchanges: []
}

const newExchange = {
	userId: 1,
	date: '21/08/2018',
	from: 'real',
	to: 'bitcoin',
	amount: 300.98,
	conversion: 0.16
}

beforeEach(() => {
	store = mockedLocalStore()
	newDB = { ...DB, storageType: store, storage: { ...mockedStorage } }
})

it('Find existent user', () => {
	expect(newDB.findUser({name: 'Lucas'})).toEqual(mockedStorage.users[1])
})

it('Find non existent user', () => {
	expect(newDB.findUser({name: 'Cris', password: '123456'})).toEqual(null)
})

it('Add existent user', () => {
	expect(newDB.addUser({name: 'Lucas', password: '123'}))
	.toEqual({ status: 400, data:'Usuário já cadastrado' })
})

it('Add non existent user', () => {
	expect(newDB.addUser({name: 'Cris', password: '123456'}))
	.toEqual({ status: 201, data: newUser })
})

it('Add non existent user without password', () => {
	expect(newDB.addUser({name: 'Cris'}))
	.toEqual({ status: 400, data:'Estão faltando dados' })
})

it('Add non existent user without name', () => {
	expect(newDB.addUser({password: '123456'}))
	.toEqual({ status: 400, data:'Estão faltando dados' })
})

it('Auth user', () => {
	expect(newDB.authUser({name: 'Lucas', password: '123'}))
	.toEqual({ status: 200, data: mockedStorage.users[1]})
})

it('Auth non existent user', () => {
	expect(newDB.authUser({name: 'Cris', password: '123456'}))
	.toEqual({ status: 400, data: 'Cadastre-se primeiro :)' })
})

it('Auth existent user with diferent password', () => {
	expect(newDB.authUser({name: 'Lucas', password: 'ERRADO'}))
	.toEqual({ status: 401, data: 'Senha errada :(' })
})

it('Auth existent user with correct password', () => {
	expect(newDB.authUser({name: 'Lucas', password: '123'}))
	.toEqual({ status: 200, data: mockedStorage.users[1] })
})

it('Find user exchanges', () => {
	expect(newDB.findExchanges({name: 'Lucas'}))
	.toEqual({ status: 200, data: mockedStorage.users[1].exchanges.map(exchange => {
		return mockedStorage.exchanges[exchange]
	})})
})

it('Find non existent user exchanges', () => {
	expect(newDB.findExchanges({name: 'Cris'}))
	.toEqual({ status: 400, data: 'Cadastre-se antes de comprar :)' })
})

it('Add exchanges to non existent user', () => {
	expect(newDB.addExchange({ ...newExchange, userId: 2 }))
	.toEqual({status: 404, data: 'Usuário não encontrado'})
})

it('Add exchanges', () => {
	expect(newDB.addExchange(newExchange))
	.toEqual({ status: 201, data: {...newExchange, id: ++mockedStorage.exchangesId.length } })
})
