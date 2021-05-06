import React, { Component, useState } from 'react';
import './App.css';
import flightData from './data.js'
import FlightsTable from './components/FlightsTable';
import Select from './components/Select'

const { routes, getAirlineById, getAirportByCode, getAllAirlineNames, getAllAirportNames, getAirlineIDByName, getAirportCodeByName, } = flightData;
const App = () => {
  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const [perPage, updatePerPage] = useState(25);
  const [selectedAirline, updateSelectedAirline] = useState(null)
  const [selectedAirport, updateSelectedAirport] = useState(null)
  const [displayedRoutes, updateDisplayedRoutes] = useState(routes)
  const allAirlines = getAllAirlineNames()
  const allAirports = getAllAirportNames()

  const filterRoutesByAirline = (selectedAirline) => {
    if (selectedAirline !== null) {
      let id = getAirlineIDByName(selectedAirline)
      return displayedRoutes.filter(route => route.airline === id)
    } else {
      return displayedRoutes
    }
  }

  const filterRoutesByAirport = (selectedAirport) => {
    if (selectedAirport === null) {
      return displayedRoutes
    } else {
      let code = getAirportCodeByName(selectedAirport)
      return displayedRoutes.filter(route => route.src === code || route.dest === code)
    }

  }


  // format property; returns a string:
  // we get the data from routes?
  // we want to get the names
  // we use this on the routes; to get the human data to show 
  // we pass this function, but it's scope allows us to access the data here
  // so we will be passing the table a row of data to show
  // table will be given row data; using formatValue to display it
  // so the row data will be passed:
  //  - row data will be passed 
  // property; "src": "srcCode"
  // we pass the Table the routes as the row data?
  function formatValue(property, value) {
    if (property === 'airline') {
      return getAirlineById(value).name
    } else if (property === 'src' || property === 'dest') {
      return getAirportByCode(value).name
    }
  }

  function handleSelectedAirline(event) {
    event.preventDefault()
    let selection = event.target
    updateSelectedAirline(selection.value)
    updateDisplayedRoutes([...filterRoutesByAirline(selection.value)])
  }

  function handleSelectedAirport(event) {
    event.preventDefault()
    let selection = event.target
    updateSelectedAirport(selection.value)
    updateDisplayedRoutes([...filterRoutesByAirport(selection.value)])
  }

  function clearFilters(event) {
    event.preventDefault()
    updateSelectedAirport(null)
    updateSelectedAirline(null)
    updateDisplayedRoutes([...routes])
  }



  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <Select
          options={allAirlines} valueKey="id" titleKey="name"
          allTitle="All Airlines" value="" onSelect={handleSelectedAirline} labelText="Show routes on"
        />
        <Select
          options={allAirports} valueKey="id" titleKey="name"
          allTitle="All Airports" value="" onSelect={handleSelectedAirport} labelText="flying in or out of"
        />

        <FlightsTable className="routes-table" columns={columns} rows={displayedRoutes} format={formatValue} perPage={perPage} clearFilters={clearFilters} />
      </section>
    </div>
  )


}

export default App;