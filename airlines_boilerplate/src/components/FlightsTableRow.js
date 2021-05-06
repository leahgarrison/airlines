import React, { Component } from 'react';


const FlightsTableRow = ({ row, format }) => {
  return (
    <>
      <td> {format('airline', row.airline)}</td>
      <td> {format('src', row.src)}</td>
      <td> {format('dest', row.dest)}</td>
    </>
  )
}

export default FlightsTableRow