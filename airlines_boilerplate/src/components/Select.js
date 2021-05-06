import React, { useState } from 'react'

const Select = ({ options, onSelect, valueKey, titleKey, allTitle }) => {
  options.unshift(titleKey)
  return (
    <>
      <select onChange={onSelect}>{options.map((option, index) => {
        if (index === 0) {
          return <option key={index} selected disabled>{allTitle}</option>
        } else {
          return <option key={index} value={option}>{option}</option>
        }

      })}
      </select>
    </>
  )
}


export default Select;