import React from 'react'
const FormRow = ({ label, name, type,
value, placeholder, onChange }) => {
  return (
    <div className='form-row'>
      <label htmlFor={ name } className='form-label'>{ label || name }</label>
      <input
        className='form-input'
        name={ name }
        type= { type }
        value={ value }
        placeholder= { placeholder }
        onChange={ onChange }
      />
  </div>
  )
}

export default FormRow