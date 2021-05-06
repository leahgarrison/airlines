import React, { useState } from 'react'

const Select = ({ options, onSelect, valueKey, titleKey, allTitle, value }) => {
  return (
    <>
      <select onChange={onSelect} valueKey={valueKey} titleKey={titleKey} allTitle={allTitle} value={value}>{options.map((option, index) => {
        return <option key={index} value={option}>{option}</option>
      })}
      </select>
    </>
  )
}


export default Select;