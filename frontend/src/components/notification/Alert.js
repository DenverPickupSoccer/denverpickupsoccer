import React from 'react'

const Alert = ({ message, clearFn, type }) => {
  let cssForType = ''
  switch (type) {
    case 'danger': cssForType = 'is-danger'; break
    case 'info': cssForType = 'is-info'; break
    case 'success': cssForType = 'is-primary'; break
    default: cssForType = ''
  }
  return (
      <div className={`notification ${cssForType}`}>
        <button className="delete" onClick={clearFn}/>
        {message}
      </div>
  )
}

export default Alert;
