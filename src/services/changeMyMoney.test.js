import * as money from './changeMyMoney'
import moment from 'moment'

const mockedPromise = (response) => (...request) => Promise.resolve({ 
		...response
	})

const goodBritaRequest = {
	status: 200,
	data: {
		value: [{
			'cotacaoCompra': '2',
			'cotacaoVenda': '3'
		}]
	}
}

const goodBitcoinRequest = {
	status: 200,
	data: {
		ticker: {
			'buy': '2',
			'sell': '3'
		}
	}
}

const badBitcoinRequest = {
	status: 400,
	data: {
		ticker: {
			'buy': '2',
			'sell': '3'
		}
	}
}

it('Get initial and final days of request', () => {
	expect(money.interval(3, moment('2018-01-04'))).toEqual({
		initialDate: '01-01-2018',
		finalDate: '01-04-2018'
	})
})

it('Get fetch response to be ok', async () => {
	const value = await money.fetchIt('Qualquer coisa', mockedPromise(goodBitcoinRequest))
	expect(value).toEqual(goodBitcoinRequest.data)
})

it('Get fetch response to be not ok', async () => {
	try {
		await money.fetchIt('Qualquer coisa', mockedPromise(badBitcoinRequest))
	} catch(err) {
		expect(err).toEqual({
			name: 'Nada bem',
			message: 'Houve um erro ao buscar as correções das moedas'
		})
	}
})

it('Get brita currency', async () => {
	const value = await money.getCurrencyValue(
		'brita',
		mockedPromise(goodBritaRequest.data)
	)
	expect(value).toEqual({
		buy: 2,
		sell: 3
	})
})


it('Get bitcoin currency', async () => {
	const value = await money.getCurrencyValue(
		'bitcoin',
		mockedPromise(goodBitcoinRequest.data)
	)
	expect(value).toEqual({
		buy: 2,
		sell: 3
	})
})


it('Get real currency', async () => {
	const value = await money.getCurrencyValue(
		'real',
		mockedPromise({})
	)
	expect(value).toEqual({
		buy: 1,
		sell: 1
	})
})

it('Get others currencies', async () => {
	try {
		await money.getCurrencyValue('golpinhos', mockedPromise({}))
	} catch(err) {
		expect(err).toEqual({
			name: "Isso no ecxiste!",
			message: "Essa moeda não é suportada"
		})
	}
})

it ('Get changed money', async () => {
	const changedAmount = await money.changeMyMoneyService(
		'real',
		'brita',
		100,
		mockedPromise({buy: 4, sell: 2})
	)
	expect(changedAmount).toEqual(50)
})

it ('Get same money changed error', async () => {
	try {
		await money.changeMyMoneyService(
			'real',
			'real',
			1,
			mockedPromise({buy: 1, sell: 1})
		)
	} catch(err) {
		expect(err).toEqual({
			name: "Mesma moeda!",
			message: "Não é possível trocar para a mesma moeda"
		})		
	}
})

it ('Get change nothing error', async () => {
	try {
		await money.changeMyMoneyService(
			'real',
			'bitcoin',
			0,
			mockedPromise({buy: 1, sell: 1})
		)
	} catch(err) {
		expect(err).toEqual({
			name: "Mão de vaca",
			message: "Não é possível trocar 0 dinheiros"
		})		
	}
})
