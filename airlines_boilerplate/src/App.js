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
  const [selectedAirline, updateSelectedAirline] = useState("")
  const [selectedAirport, updateSelectedAirport] = useState("")
  const [displayedRoutes, updateDisplayedRoutes] = useState(routes)
  const allAirlines = getAllAirlineNames()
  let airLOptions = allAirlines.map(airline => ({ name: airline, disabled: false }))
  airLOptions.unshift({ name: "", disabled: true })

  const [airlineOptions, updateAirlineOptions] = useState(airLOptions)
  const allAirports = getAllAirportNames()
  let airPOptions = allAirports.map(airport => ({ name: airport, disabled: false }))
  airPOptions.unshift({ name: "", disabled: true })
  const [airportOptions, updateAirportOptions] = useState(airPOptions)


  const filterRoutesByAirline = (selectedAirline) => {
    if (selectedAirline !== "") {
      let id = getAirlineIDByName(selectedAirline)
      return displayedRoutes.filter(route => route.airline === id)
    } else {
      return displayedRoutes
    }
  }

  const filterRoutesByAirport = (selectedAirport) => {
    if (selectedAirport === "") {
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

  // function resetSelected(selectElement) {
  //   if (selectElement.querySelector("[selected]")) selectElement.querySelector("[selected]").removeAttribute('selected')
  //   // selectElement.firstChild.setAttribute("selected", true)
  // }

  function updateOptions(options, updateOptionsFunction, searchValue) {
    let opt = options.map(option => {
      let { name, disabled } = option
      if (searchValue && name != searchValue) {
        option.disabled = true
        return option
      } else {
        return option
      }
    })

    updateOptionsFunction(opt)
  }
  function handleSelectedAirline(event) {
    event.preventDefault()
    let selection = event.target
    updateSelectedAirline(selection.value)
    let updatedRoutes = [...filterRoutesByAirline(selection.value)]
    updateDisplayedRoutes([...filterRoutesByAirline(selection.value)])
    updateOptions(airlineOptions, updateAirlineOptions, selection.value)
    let airportCodes = updatedRoutes.map(route => [route.src, route.dest]).flat(Infinity)
    let airportNames = airportCodes.map(code => getAirportByCode(code).name)
    let aOoptions = airportOptions.map(airport => {
      if (!airportNames.includes(airport.name)) {
        airport.disabled = true;
      }
      return airport
    })
    updateAirportOptions(aOoptions)
  }

  function handleSelectedAirport(event) {
    event.preventDefault()
    let selection = event.target
    updateSelectedAirport(selection.value)
    let updatedRoutes = [...filterRoutesByAirport(selection.value)]
    updateDisplayedRoutes(updatedRoutes)
    updateOptions(airportOptions, updateAirportOptions, selection.value)
    let airlineId = updatedRoutes.map(route => route.airline)
    let airlineNames = airlineId.map(id => getAirlineById(id).name)
    let airOptions = airlineOptions.map(airline => {
      if (!airlineNames.includes(airline.name)) {
        airline.disabled = true
      }

      return airline
    })

    updateAirlineOptions(airOptions)

  }

  function clearFilters(event) {
    event.preventDefault()
    let selection = event.target
    // resetSelected(selection)

    updateSelectedAirport("")
    updateSelectedAirline("")
    updateDisplayedRoutes([...routes])
    updateAirlineOptions([...airLOptions])
    updateAirportOptions([...airPOptions])
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
          options={airlineOptions} valueKey="id" titleKey="name"
          allTitle="All Airlines" value="" onSelect={handleSelectedAirline} labelText="Show routes on" searchFilter={selectedAirline}
        />
        <Select
          options={airportOptions} valueKey="id" titleKey="name"
          allTitle="All Airports" value="" onSelect={handleSelectedAirport} labelText="flying in or out of" searchFilter={selectedAirport}
        />

        <FlightsTable className="routes-table" columns={columns} rows={displayedRoutes} format={formatValue} perPage={perPage} clearFilters={clearFilters} />
      </section>
    </div>
  )


}

export default App;