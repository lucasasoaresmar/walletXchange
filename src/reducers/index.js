import { combineReducers } from 'redux'
import {
	TOGGLE_USER_REQUEST,
	RECEIVE_USER,
	USER_FAILURE,
	USER_LOGOUT,
	TOGGLE_MONEY_REQUEST,
	RECEIVE_MY_MONEY,
	MONEY_FAILURE,
	RECEIVE_EXCHANGES
} from '../constants/ActionTypes'

const userState = {
	requiringUser: false,
	requiringMoney: false
}

const user = (state = userState, action) => {
	switch(action.type) {
		case TOGGLE_USER_REQUEST:
			return {
				...state,
				requiringUser: !state.requiringUser
			}
		case RECEIVE_USER:
			return {
				...state,
				...action.user
			}
		case USER_FAILURE:
			return {
				...state,
				userFailure: action.message
			}
		case USER_LOGOUT:
			return {}
		case TOGGLE_MONEY_REQUEST: 
			return {
				...state,
				requiringMoney: !state.requiringMoney
			}
		case RECEIVE_MY_MONEY:
			return {
				...state,
				...action.money
			}
			case MONEY_FAILURE: {
				return {
					...state,
					moneyFailure: action.message
				}
			}
		default:
			return state
	}
}

const exchanges = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_EXCHANGES:
			return [
				...state,
				...action.exchanges
			]
		case USER_LOGOUT:
			return []
		default:
			return state
	}
}

export default combineReducers({
	user,
	exchanges
})