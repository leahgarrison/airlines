import React, { Component, useState } from 'react';

const Button = ({ title, onClick, disabled }) => {
  // if (pageNumber <= 1 || pageNumber >= rows.length) {
  //   disabled = true
  // }
  return (
    <button disabled={disabled()} onClick={onClick}>
      {title}
    </button>
  )
}


export default Button