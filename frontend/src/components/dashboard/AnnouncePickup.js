import React, {useState} from 'react';
import {announcePickup} from 'services/organizers';
import Alert from 'components/notification/Alert';
import HeadingBanner from 'components/HeadingBanner';
import Navbar from 'components/navbar/Navbar';
import {useUserProvider} from 'contexts/UserProvider';
import {Link, Redirect} from 'react-router-dom';
import AnnouncePickupForm from "components/dashboard/annouce_pickup_form/AnnouncePickupForm";

const AnnouncePickup = ({ organizerId }) => {
  const {user, loading: loadingUser} = useUserProvider();
  const [savingPickup, setSavingPickup] = useState(false)

  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const savePickup = (pickup, resetForm) => {
    setSavingPickup(true)
    announcePickup(pickup, organizerId || user.uid)
    .then(() => {
      resetForm()
      setSubmitSuccess(true)
    })
    .catch(setSubmitError)
    .finally(() => setSavingPickup(false))
  }

  const renderSubmitError = () => {
    return submitError && (
        <Alert
            message="There was an issue creating your pickup"
            clearFn={() => setSubmitError(null)}
            type='danger'
        />
    )
  }

  const renderSubmitSuccess = () => {
    return submitSuccess && (
        <Alert
            message="Your pickup is created!!!"
            clearFn={() => setSubmitSuccess(null)}
            type='success'
        />
    )
  }

  if (!loadingUser && !user) return <Redirect to='/'/>
  if (loadingUser) return <p>loading ...</p>

  return (
    <div className="has-text-centered landing">
      <Navbar>
        <Link
            to={{ pathname: "/dashboard" }}
            className='button is-primary mr-2 mt-2'
        >
          My Dashboard
        </Link>
      </Navbar>
      <HeadingBanner text="Announce new pickup" />
      <div className="card-content">
        <div className="content">
          {renderSubmitError()}
          {renderSubmitSuccess()}
          <AnnouncePickupForm savePickup={savePickup} savingPickup={savingPickup} />
        </div>
      </div>
    </div>
  )
};

export default AnnouncePickup;
