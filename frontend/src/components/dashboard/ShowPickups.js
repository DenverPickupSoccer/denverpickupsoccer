import React, { useEffect, useState } from 'react';
import { fetchPickups } from 'services/organizers';
import useIsMountedRef from 'helpers/useIsMountedRef';
import PickupCard from 'components/PickupCard';
import HeadingBanner from 'components/HeadingBanner';

const ShowPickups = ({ organizerId }) => {
  const [pickups, setPickups] = useState([]);
  const [fetchPickupError, setFetchPickupError] = useState(null)
  const [loadingPickups, setLoadingPickups] = useState(false)
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    fetchPickups(organizerId)
    .then(response => response.json())
    .then(pickups => {
      if (isMountedRef.current) setPickups(pickups)
    })
    .catch(() => setFetchPickupError(true))
    .finally(() => setLoadingPickups(false))
  }, [organizerId, isMountedRef])

  const renderPickups = () => {
    if (!pickups) return <p className='has-text-centered'>You haven't posted any pickups yet. Try creating one (:</p>;
    return (
        <section>
          {
            pickups.map((pickup, index) =>
            <PickupCard
                key={index}
                field={pickup.field}
                address={pickup.address}
                time={pickup.time} day={pickup.day}
                contact={pickup.contact} />
            )
          }
        </section>
    )
  }

  if (fetchPickupError) return <p>error fetching pickups</p>
  if (loadingPickups) return <p>loading ...</p>
  if (pickups.length === 0) return <p>No pickups</p>

  return (
      <>
        <HeadingBanner text="Your pickups" />
        {renderPickups()}
      </>
  )
}

export default ShowPickups;
