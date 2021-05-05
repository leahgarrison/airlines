import React, { Component } from 'react';


const FlightsTableRow = ({ route, getAirlineById, getAirportByCode }) => {
  console.log(route.airline)
  const airlineName = getAirlineById(route.airline).name
  const airportSrcName = getAirportByCode(route.src).name
  const airportDestinationName = getAirportByCode(route.dest).name
  return (
    <>
      <td>{airlineName}</td>
      <td>{airportSrcName}</td>
      <td>{airportDestinationName}</td>
    </>
  )
}

export default FlightsTableRow