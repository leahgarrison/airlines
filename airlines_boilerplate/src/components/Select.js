import React, { useState } from 'react'

const Select = ({ options, onSelect, valueKey, titleKey, allTitle, labelText, searchFilter }) => {
  const id = allTitle + '-select'
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <select id={id} onChange={onSelect} value={searchFilter}>{options.map((option, index) => {
        const { name, disabled } = option
        if (index === 0) {
          return <option key={index} disabled value={""}>{allTitle}</option>
        } else if (disabled) {
          return <option key={index} disabled value={name}>{name}</option>
        } else {
          return <option key={index} value={name}>{name}</option>
        }

      })}
      </select>
    </>
  )
}


export default Select;