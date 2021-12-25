import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
import { createNewUser, getCurrentUser, signInUser } from 'services/firebase';

// TODO: when signing up,
//  - ask for password twice and confirm password matches
//  - ask for name and other profile stuff
//  - send authentication email
const LoginOrSignUp = ({ destination }) => {
  const [serverError, setServerError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [renderSignup, setRenderSignup] = useState(false)
  const [successfulAuth, setSuccessfulAuth] = useState(false)

  useEffect(() => {
    getCurrentUser((user) => {
      if (user) setSuccessfulAuth(true)
    })
  }, [])

  const validateEmail = email => {
    setEmail(email)
    if (email.trim() !== '') setIsEmailValid(isEmail(email))
    else setIsEmailValid(true)
  }

  const renderServerError = () => {
    return (
        <div className='notification is-light has-text-centered is-danger'>
          <button className="delete" onClick={() => setServerError(null)}/>
          {serverError}
        </div>
    )
  }

  const action = () => {
    if (email.trim() === '' || password.trim() === '' || !isEmail(email)) {
      return setServerError('Invalid email or password')
    }

    setLoading(true)

    const actionResult = renderSignup ?
        createNewUser(email, password) :
        signInUser(email, password)

    actionResult
        .then(() => setSuccessfulAuth(true))
        .catch(() => setServerError('Invalid email or password'))
        .finally(() => setLoading(false))
  }

  const handleEmailInput = email => {
    if (serverError) setServerError(null)
    validateEmail(email)
  }

  const handlePasswordInput = password => {
    if (serverError) setServerError(null)
    setPassword(password)
  }

  const renderPageTitle = () => {
    return renderSignup ? 'Sign up as an organizer' : 'Log in as an organizer'
  }

  const renderButtonMessage = () => {
    return renderSignup ? 'Sign up' : 'Log in'
  }

  const renderAlternateButtonMessage = () => {
    return renderSignup ? 'Log in' : 'Sign up'
  }

  if (successfulAuth) {
    return <Redirect push to={destination} />
  }

  return (
      <div className='page-inner-body login-page'>
        <div className='hero'>
          <div className='hero-body'>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-8-desktop'>
                {serverError && renderServerError()}
                <section className="hero">
                  <div className="hero-body">
                    <div className="container column is-10 is-offset-1">
                      <h1 className="title mb-6 has-text-centered">
                        {renderPageTitle()}
                      </h1>
                      <p className="subtitle mb-6 has-text-centered">
                        Post new pickup. Manage existing pickups. Remove your pickups.
                      </p>
                    </div>
                    <div className="container column is-6 is-offset-3">
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                          <input className="input is-medium" type="email"
                                 placeholder="Enter email"
                                 onChange={e => handleEmailInput(e.target.value)}
                                 value={email}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope"/>
                          </span>
                        </div>
                        <p className={
                          classNames({
                                'is-hidden': isEmailValid,
                                'help is-danger': !isEmailValid
                              }
                          )
                        }>
                          This email is invalid
                        </p>
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                          <input className="input is-medium" type="password"
                                 placeholder="Enter password"
                                 onChange={e => handlePasswordInput(e.target.value)}
                                 value={password}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"/>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <button
                              className={
                                classNames(
                                    'button is-primary is-fullwidth',
                                    { 'is-loading': loading }
                                )
                              }
                              onClick={action}
                              disabled={!isEmailValid}
                          >
                            {renderButtonMessage()}
                          </button>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <button
                              className='button is-light has-text-primary is-fullwidth'
                              onClick={() => setRenderSignup(!renderSignup)}
                          >
                            {renderAlternateButtonMessage()}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const Auth = (props) => {
  //TODO: if there's no destination,
  // - go back to previous page if page is within app
  const destination = props.location.state.destination
  return <LoginOrSignUp destination={destination} />
}

export default Auth
