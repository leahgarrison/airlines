import React, { Component } from 'react';
import './App.css';
import flightData from './data.js'
import FlightsTable from './components/FlightsTable';

const { routes, airlines, airports } = flightData;
const App = () => {
  // const renderRoutes = (routes) => {
  //   const routeItems = routes.map(route => {
  //     return 
  //     <tr>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //     </tr>
  //   })
  // }
  // console.log(routes)

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
    </p>
        <FlightsTable routes={routes} />
      </section>
    </div>
  )


}

export default App;