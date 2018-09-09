import React from 'react'

const Exchanges = ({exchanges}) => (
  <div>
  	{exchanges.map(exchange => <div key={exchange.id}>
  		Trocado {exchange.amount} {exchange.from} para {exchange.to} em {exchange.date}
  	</div>)}
  </div>
);

export default Exchanges