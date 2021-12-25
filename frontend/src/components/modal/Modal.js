import React from 'react'

const Modal = ({ closeModalFn, children }) => {
  return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeModalFn}/>
      </div>
  )
}

export default Modal;
