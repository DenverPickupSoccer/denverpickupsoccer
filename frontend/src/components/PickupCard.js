import React from "react";
const PickupCard = ({ field, day, time, address, contact }) => {
  const addressToString = () => {
    return Object.values(address).join(', ')
  }

  return (
      <div className="column is-full">
          <div className="card">
              <header className="card-header has-text-centered">
                  <p className="card-header-title is-capitalized">
                      {field}
                  </p>
              </header>
              <div className="card-content">
                  <div className="content">
                      <section>
                          <div className="container">
                              <nav className="level is-mobile">
                                  <div className="level-item has-text-centered">
                                      <div>
                                          <p className="heading">Day</p>
                                          <p className="subtitle capitalize is-size-5-mobile">{day}</p>
                                      </div>
                                  </div>
                                  <div className="level-item has-text-centered">
                                      <div>
                                          <p className="heading">Time</p>
                                          <p className="subtitle is-size-5-mobile">{time}</p>
                                      </div>
                                  </div>
                                  <div className="level-item has-text-centered">
                                      <div>
                                          <p className="heading">Contact</p>
                                          <p className="subtitle is-size-5-mobile">{contact || 'N/A'}</p>
                                      </div>
                                  </div>
                              </nav>
                          </div>
                      </section>
                      <hr className='horizontal-line'/>
                      <section className="">
                          <p className="has-text-left is-size-5">Address: {addressToString()}</p>
                      </section>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default PickupCard;
