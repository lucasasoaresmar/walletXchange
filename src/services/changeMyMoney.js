import moment from 'moment'
import axios from 'axios'
import { newError } from '../utils/error'

export const interval = (days = 3, today = moment()) => ({
	initialDate: today.subtract(days, 'days').format('MM-DD-YYYY'),
	finalDate: today.format('MM-DD-YYYY')
})

export const getBrita = (date = interval()) => ({
	method: 'get',
	url: process.env.REACT_APP_BRITA_URL,
	params: {
		'@moeda': "'USD'",
		'@dataInicial': `'${date.initialDate}'`,
		'@dataFinalCotacao': `'${date.finalDate}'`,
		'$format':'json',
		'$select': 'cotacaoCompra,cotacaoVenda,dataHoraCotacao'
	}
})

const getBitcoin = {
	method: 'get',
	url: process.env.REACT_APP_BITCOIN_URL
}

export const fetchIt = async (request) => {
	try {
		const res = await axios(request)

		if (res.status === 200) return res.data
		else throw new Error(newError())
	} catch (err) {
		throw new Error(
			newError({
				name: 'Nada bem',
				message: 'Houve um erro ao buscar as correções das moedas'
			})
		)
	}
}

export const getCurrencyValue = async (currency) => {
	if (currency === 'brita') {
		try {
			const res = await fetchIt(getBrita())
			const data = res.value[res.value.length - 1]

			return {
				buy: Number(data.cotacaoCompra),
				sell: Number(data.cotacaoVenda)
			}
		} catch(err) {
			throw err
		}
	}

	if (currency === 'bitcoin') {
		try {
			const res = await fetchIt(getBitcoin)
			return {
				buy: Number(res.ticker.buy),
				sell: Number(res.ticker.sell)
			}
		} catch(err) {
			throw err
		}
	}

	if (currency === 'real') {
		return {
			buy: 1,
			sell: 1
		}
	}

	else {
		throw new newError({
			name: "Isso no ecxiste!",
			message: "Essa moeda não é suportada"
		})
	}
}

export const changeMyMoneyService = async (fromThisCurrency, toThisCurrency, amount) => {
	try {
		const fromThisCurrencyValue = await getCurrencyValue(fromThisCurrency)
		const toThisCurrencyValue = await getCurrencyValue(toThisCurrency)
		return fromThisCurrencyValue.sell * amount * toThisCurrencyValue.buy
	} catch(err) {
		throw err
	}
}