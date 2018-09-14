import moment from 'moment'
import axios from 'axios'

export const todayFormatMMDDYYYY = () => moment(new Date()).format('MM-DD-YYYY')

export const lastBritaValueURL = () => {
	//const today = todayFormatMMDDYYYY()

	/*return process.env.REACT_APP_BRITA_URL_BEGIN
	+ today
	+ process.env.REACT_APP_BRITA_URL_FINISH*/
	return "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=%27USD%27&@dataCotacao=%2709-06-2018%27&$top=1&$orderby=dataHoraCotacao%20desc&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao"
}

const lastBitcoinValueUrl = process.env.REACT_APP_BITCOIN_URL

export const fetchIt = async (url) => {
	try {
		const res = await axios.get(url)

		if (res.status === 200) return res.data
		else {
			throw new Error ({
				name: 'Nada bem',
				message: 'Houve um erro ao buscar as correções das moedas'
			})
		}
	} catch (err) {
		throw new Error ({
			name: 'Nada bem',
			message: 'Houve um erro ao buscar as correções das moedas'
		})
	}
}

export const getCurrencyValue = async (currency) => {
	if (currency === 'brita') {
		try {
			const lastBritaTodayURL = lastBritaValueURL()
			const res = await fetchIt(lastBritaTodayURL)
			return {
				buy: Number(res.value[0].cotacaoCompra),
				sell: Number(res.value[0].cotacaoVenda)
			}
		} catch(err) {
			throw new Error(err)
		}
	}

	if (currency === 'bitcoin') {
		try {
			const res = await fetchIt(lastBitcoinValueUrl)
			console.log(res)
			return {
				buy: Number(res.ticker.buy),
				sell: Number(res.ticker.sell)
			}
		} catch(err) {
			throw new Error(err)
		}
	}

	if (currency === 'real') {
		return {
			buy: 1,
			sell: 1
		}
	}

	else {
		throw new Error({
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
		throw new Error(err)
	}
}