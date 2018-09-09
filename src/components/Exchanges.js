import React from 'react'

const Exchanges = ({exchanges}) => (
  <div>
    <h2>Exchanges</h2>

  	{exchanges.map(exchange => <div key={exchange.id}>
  		Trocado {exchange.amount} {exchange.from} para {exchange.to} em {exchange.date}
  	</div>)}
  </div>
);

export default Exchanges