import React from 'react';

const FormRowSelect = ({ label, name, value, placeholder, onChange, list }) => {
  return (
    <div className='form-row'>
      <label htmlFor={ name } className='form-label'>{ label || name }</label>
      <select
        className='form-input'
        name={ name }
        value={ value }
        placeholder= { placeholder }
        onChange={ onChange }
      >
        { list?.map(( item, idx) => {
          return <option key={idx}
                         value={ item }>
                { item }
          </option>
        }) }
      </select>
    </div>
    )
}

export default FormRowSelect;