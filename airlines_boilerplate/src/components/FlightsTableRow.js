import React, { Component } from 'react';


const FlightsTableRow = ({ route }) => {

  return (
    <>
      <td>
        {route.airline}
      </td>
      <td>{route.src}</td>
      <td>{route.dest}</td>
    </>
  )
}

export default FlightsTableRow