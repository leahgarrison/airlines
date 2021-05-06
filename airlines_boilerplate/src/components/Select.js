import React, { useState } from 'react'

const Select = ({ options, onSelect, valueKey, titleKey, allTitle, labelText }) => {
  options.unshift(titleKey)
  const id = allTitle + '-select'
  return (
    <>
      <label for={id}>{labelText}</label>
      <select id={id} onChange={onSelect}>{options.map((option, index) => {
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