import * as money from './changeMyMoney'

const mockFetch = (status, value) => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      status,
      json: function(){ return { value }}
    })
  );
}

const goodBritaRequest = [{
	'cotacaoCompra': '2',
	'cotacaoVenda': '3'
}]

const goodBitcoinRequest = {
	'buy': '2',
	'sell': '3'
}

it('Get Bitcoin URL', () => {
	expect(money.lastBritaValueURL()).toEqual(
		process.env.REACT_APP_BRITA_URL_BEGIN
	+ money.todayFormatMMDDYYYY()
	+ process.env.REACT_APP_BRITA_URL_FINISH)
})

it('Get fetch response to be ok', async () => {
	global.fetch = mockFetch(200, goodBitcoinRequest)
	const value = await money.fetchIt('Qualquer coisa')
	expect(value).toEqual(goodBitcoinRequest)
})

it('Get fetch response to be not ok', async () => {
	global.fetch = mockFetch(400, goodBitcoinRequest)

	try {
		await money.fetchIt('Qualquer coisa')
	} catch(err) {
		expect(err).toEqual(new Error ({
			name: 'Nada bem',
			message: 'Houve um erro ao buscar as correções das moedas'
		}))
	}
	
})

it('Get brita currency', async () => {
	global.fetch = mockFetch(200, goodBritaRequest)
	const value = await money.getCurrencyValue('brita')

	expect(value).toEqual({
	'buy': 2,
	'sell': 3
	})
})

it('Get bitcoin currency', async () => {
	global.fetch = mockFetch(200, goodBitcoinRequest)
	const value = await money.getCurrencyValue('bitcoin')

	expect(value).toEqual({
	'buy': 2,
	'sell': 3
	})
})

it('Get real currency', async () => {
	expect(await money.getCurrencyValue('real')).toEqual({
	'buy': 1,
	'sell': 1
	})
})

it('Get others currency', async () => {
	try {
		await money.getCurrencyValue('golpinhos')
	} catch(err) {
		expect(err).toEqual(new Error ({
			name: "Isso no ecxiste!",
			message: "Essa moeda não é suportada"
		}))
	}
})

it ('Get amount changed', async () => {
	global.fetch = mockFetch(200, goodBritaRequest)
	expect(await money.changeMyMoneyService('brita', 'brita', 1)).toEqual(6)
})