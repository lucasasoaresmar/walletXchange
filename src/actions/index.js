import * as types from '../constants/ActionTypes'
import { DB } from '../DB/dataBase'
import { changeMyMoneyService } from '../services/changeMyMoney'

const toggleUserRequest = () => ({
	type: types.TOGGLE_USER_REQUEST
})

const receiveUser = user => ({
	type: types.RECEIVE_USER,
	user
})

const userFailure = message => ({
	type: types.USER_FAILURE,
	message
})

export const signup = user => async dispatch => {
	dispatch(toggleUserRequest())
	
	const res = await DB.addUser(user)

	if (res.status === 400) dispatch(userFailure(res.data))
	if (res.status === 200) dispatch(receiveUser(res.data))
	
	dispatch(toggleUserRequest())
}

export const logout = () => ({
	type: types.USER_LOGOUT
})

const receiveExchanges = exchanges => ({
	type: types.RECEIVE_EXCHANGES,
	exchanges
})

export const login = user => async dispatch => {
	dispatch(toggleUserRequest())
	
	const user_ = await DB.authUser(user)
	const exchanges = await DB.findExchanges(user)

	if (user_.status === 401 || exchanges.status === 400) dispatch(userFailure(user_.data))
	if (user_.status === 200 ) {
		const userData = user_.data
		dispatch(receiveUser(userData))
		dispatch(receiveExchanges(exchanges.data))
	}

	dispatch(toggleUserRequest())
}

const toggleMoneyRequest = () => ({
	type: types.TOGGLE_MONEY_REQUEST
})

const receiveMyMoney = (money) => ({
	type: types.RECEIVE_MY_MONEY,
	money
})

const moneyFailure = (message) => ({
	type: types.MONEY_FAILURE,
	message
})

export const makeExchange = exchange => async (dispatch, getState) => {
	dispatch(toggleMoneyRequest())
	
	const state = getState()
	const fromThisMoney = state.user[exchange.from]
	const toThisMoney = state.user[exchange.to]

	if (fromThisMoney < exchange.amount) { 
		dispatch(moneyFailure('Você não é tão rico assim'))
		dispatch(toggleMoneyRequest())
		return
	}

	try {
		let exchanged = await changeMyMoneyService(
			exchange.from, 
			exchange.to, 
			exchange.amount)

		const newMoney = {
			[exchange.from]: fromThisMoney - exchange.amount,
			[exchange.to]: toThisMoney + exchanged
		}

		const exchangeWithExchanged = {...exchange, exchanged: exchanged}

		const newExchange = DB.addExchange(newMoney, exchangeWithExchanged)
		dispatch(receiveMyMoney(newMoney))
		dispatch(receiveExchanges(newExchange.data))

	} catch (err) {
		dispatch(moneyFailure(err.message))
	}

	dispatch(toggleMoneyRequest())
}