export const todayFormatMMDDYYYY = () => new Date().toLocaleDateString("en-US").replace(/[/]/g,'-')

export const lastBritaValueURL = () => {
	const today = todayFormatMMDDYYYY()

	return	process.env.REACT_APP_BRITA_URL_BEGIN
	+ today
	+ process.env.REACT_APP_BRITA_URL_FINISH
}

const lastBitcoinValueUrl = process.env.REACT_APP_BITCOIN_URL

export const fetchIt = async (url) => {
	const res = await fetch(url)
	const resToJson  = await res.json()

	if (res.status === 200) return resToJson.value
	else {
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
			const value = await fetchIt(lastBritaTodayURL)
			return {
				buy: Number(value[0].cotacaoCompra),
				sell: Number(value[0].cotacaoVenda)
			}
		} catch(err) {
			throw new Error(err)
		}
	}

	if (currency === 'bitcoin') {
		try {
			const value = await fetchIt(lastBitcoinValueUrl)
			return {
				buy: Number(value.buy),
				sell: Number(value.sell)
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