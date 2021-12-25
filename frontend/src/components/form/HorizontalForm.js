import React from 'react'

const HorizontalForm = ({ label, children }) => {
  return (
      <div className="field is-horizontal">
        <div className="field-label">
          {label && <label className="label">{label}</label>}
        </div>
        <div className="field-body">
          {children}
        </div>
      </div>
  )
}

export default HorizontalForm;
