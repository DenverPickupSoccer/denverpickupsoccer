import React from 'react'
import classNames from 'classnames';

const HelperText = ({ helperText, isInputValid, type }) => {
  if (!helperText) return null;

  let cssForType = 'help'
  switch (type) {
    case 'danger': cssForType += ' is-danger'; break
    case 'info': cssForType += ' is-info'; break
    case 'success': cssForType += ' is-primary'; break
    default: cssForType = ''
  }

  if (isInputValid === null || isInputValid === undefined) return (
      <p className={cssForType}>{helperText}</p>
  )

  return (
      <p className={classNames({ 'is-hidden': isInputValid, [cssForType]: !isInputValid })}>
        {helperText}
      </p>
  )
}

export default HelperText
