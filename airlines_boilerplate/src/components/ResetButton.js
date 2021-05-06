import React, { Component, useState } from 'react';


const ResetButton = ({ title, onClick, disabled, resetStartIndex, resetLastIndex, perPage }) => {
  const resetRows = (event) => {
    event.preventDefault()
    resetStartIndex(0)
    resetLastIndex(perPage - 1)
    onClick(event)
  }
  return (
    <button disabled={disabled} onClick={resetRows} type="reset">
      {title}
    </button>
  )
}

export default ResetButton