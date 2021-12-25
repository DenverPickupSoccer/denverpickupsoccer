import React from 'react'

const TextField = ({ value, placeholder, onChangeFn, children }) => {
  return (
      <div className="field">
        <div className="control">
          <input
              className="input"
              type="text"
              placeholder={placeholder}
              onChange={e => onChangeFn(e.target.value) }
              value={value}
          />
        </div>
        {children}
      </div>
  )
}

export default TextField;
