import React, { Component, useState } from 'react';
import FlightsTableRow from './FlightsTableRow';
import Button from './Button';
import ResetButton from './ResetButton';
// import { routes, airlines, airports } from '../data.js'


/*
- table needs to show:
  - airline,
  src
  destination in a table
*/

/*
  - perPage sets how many rows we show;
    - what rows we should is ;
      - next page:
    - state should be used for numbers that can't be calculated
      - keep track of the last page that we showed;
      1-25 -> add perPage
*/

const FlightsTable = ({ columns, rows, format, perPage, clearFilters }) => {
  const [lastRowIndex, updateLastRowIndex] = useState(perPage - 1)
  const [startRowIndex, updateStartRowIndex] = useState(0)
  let currentRows = rows.slice(startRowIndex, lastRowIndex + 1)

  console.log(currentRows)

  const getLastDisplayedRowIndex = () => {
    let lastRow = currentRows[currentRows.length - 1]
    return rows.indexOf(lastRow)
  }


  const showPreviousPage = (event) => {
    updateStartRowIndex(startRowIndex - perPage)
    updateLastRowIndex(lastRowIndex - perPage)
    currentRows = rows.slice(startRowIndex, lastRowIndex + 1)
  }

  const showNextPage = (event) => {
    updateStartRowIndex(startRowIndex + perPage)
    updateLastRowIndex(lastRowIndex + perPage)
    currentRows = rows.slice(startRowIndex, lastRowIndex + 1)
  }

  const resetDisplayedRoutes = (event) => {
    currentRows = rows
    updateStartRowIndex(0)
    updateLastRowIndex(perPage - 1)
  }

  return (
    <>
      <ResetButton title="Clear Filters" onClick={clearFilters} resetStartIndex={updateStartRowIndex} resetLastIndex={updateLastRowIndex} disabled={false} perPage={perPage} />
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              return (
                <th key={index}>{column.name}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => {
            return (
              <tr key={index.toString()}>
                <FlightsTableRow row={row} format={format} />
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>Showing {startRowIndex + 1} - {getLastDisplayedRowIndex() + 1} of {rows.length} total routes.</p>
      <Button title="Previous Page" onClick={showPreviousPage} disabled={() => startRowIndex <= 1} />
      <Button title="Next Page" onClick={showNextPage} rows={rows} disabled={() => lastRowIndex >= rows.length - 1} />

    </>
  )
}

export default FlightsTable