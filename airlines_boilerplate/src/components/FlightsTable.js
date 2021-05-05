import React, { Component } from 'react';
import FlightsTableRow from './FlightsTableRow';
// import { routes, airlines, airports } from '../data.js'


/*
- table needs to show:
  - airline,
  src
  destination in a table
*/
const FlightsTable = ({ routes }) => {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => {
            return (
              <tr key={index.toString()}>
                <FlightsTableRow route={route} />
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default FlightsTable