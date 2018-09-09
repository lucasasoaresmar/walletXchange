import React from 'react'
import Exchanges from '../containers/Exchanges.container'
import MoneyPanel from '../containers/MoneyPanel.container'

const Home = () => (
  <div>
    <h2>Home</h2>
    <MoneyPanel/>
    <Exchanges/>
  </div>
);

export default Home