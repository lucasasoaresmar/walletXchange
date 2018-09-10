import React from 'react'
import Exchanges from '../containers/Exchanges.container'
import MoneyPanel from '../containers/MoneyPanel.container'
import AddExchange from '../containers/AddExchange.container'

const Home = () => (
  <div>
    <h2>Home</h2>
    <MoneyPanel/>
    <Exchanges/>
    <AddExchange/>
  </div>
);

export default Home