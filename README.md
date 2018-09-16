# ExchangeIT

A virtual wallet where you can keep your savings and exchange them between different currencies. The information is saved in the browser localStorage or sessionStorage. 

To see the project alive you can click [here](https://exchangeit.netlify.com/).

## Installing

### Clone
To install this project clone the repository and ``` npm install``` it. Create a .env file in the root directory, then copy the values below into it:

```
REACT_APP_BRITA_URL = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)"

REACT_APP_BITCOIN_URL = "https://www.mercadobitcoin.net/api/BTC/ticker/"
```

### Run

Use ```npm start``` to run the app in development mode.

### Test

Use ```npm test``` to to lauch the test runner and ```npm test -- --coverage``` to make a coverage report.

## Deploy

The app was deployed in Netlify using continuous deployment, connected with the Github repository.


## Technologies

This project was made with the following technologies:

- Create React App
- Material-UI
- Redux
- React-Router
- Axios
- Enzyme
