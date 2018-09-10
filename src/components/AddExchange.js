import React from 'react'

const AddExchange = ({userId, makeExchange}) => {

	let from = null
	let to = null
	let amount = null

	const handleExchange = () => {
		const exchange = {
			from, 
			to, 
			amount: Number(amount),
			date: new Date(),
			userId
		}
		makeExchange(exchange)
	}

	return (
	  <div>
	  	<input name='From' placeholder='From' type='text' 
	    	onChange={e => from = e.target.value}
	    />
	    <input name='To' placeholder='To' type='text' 
	    	onChange={e => to = e.target.value}
	    />
	    <input name='Amount' placeholder='Amount' type='text' 
	    	onChange={e => amount = e.target.value}
	    />
	    <button onClick={handleExchange}>Trocar</button>
	  </div>
	)
};

export default AddExchange