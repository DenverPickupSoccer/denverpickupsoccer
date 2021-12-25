import React from 'react'

const DropdownField = ({ value, options, onChangeFn, placeholder, children }) => {
  const isPlaceholderProvided = () => placeholder !== null && placeholder !== undefined

  return (
      <div className="field">
        <div className="control">
          <div className="select is-fullwidth">
            <select value={value} onChange={e => onChangeFn(e.target.value)}>
              {isPlaceholderProvided() && (
                  <option value={0}>{placeholder}</option>
              )}
              {
                options.map((optionValue, index) => {
                  return (
                      <option key={index} value={optionValue}>
                        {optionValue}
                      </option>
                  )
                })
              }
            </select>
          </div>
          {children}
        </div>
      </div>
  )
}

export default DropdownField;
