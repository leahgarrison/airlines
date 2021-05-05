import React, { Component } from 'react';
import './App.css';
import flightData from './data.js'
import FlightsTable from './components/FlightsTable';

const { routes, airlines, airports, getAirlineById, getAirportByCode } = flightData;
const App = () => {
  console.log(getAirlineById)
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
    </p>
        <FlightsTable routes={routes} getAirlineById={getAirlineById} getAirportByCode={getAirportByCode} />
      </section>
    </div>
  )


}

export default App;