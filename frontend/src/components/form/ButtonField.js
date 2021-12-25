import React from 'react'
import classNames from 'classnames';

const ButtonField = ({ text, onClickFn, disabled, loading }) => {
  return (
      <div className="field">
        <div className="control">
          <button
              className={
                classNames(
                    'button is-primary',
                    { 'is-loading': loading }
                )
              }
              disabled={disabled}
              onClick={onClickFn}
          >
            {text}
          </button>
        </div>
      </div>
  )
}

export default ButtonField;
