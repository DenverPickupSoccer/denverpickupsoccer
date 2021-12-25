import React, { useState } from 'react';
import { useUserProvider } from 'contexts/UserProvider';
import { Redirect } from 'react-router-dom';
import ShowPickups from 'components/dashboard/ShowPickups';
import DashboardNavbar from 'components/dashboard/DashboardNavbar';
import AddPickupModal from 'components/dashboard/AddPickupModal';

const Dashboard = () => {
  const {user, loading: loadingUser} = useUserProvider();
  const [showAddPickupModal, setShowAddPickupModal] = useState(false)

  if (!loadingUser && !user) return <Redirect to='/'/>
  if (loadingUser) return <p>loading ...</p>

  return (
      <>
        {showAddPickupModal && (
            <AddPickupModal
                setShowAddPickupModal={setShowAddPickupModal}
                organizerId={user.uid}
            />
        )}
        <DashboardNavbar setShowAddPickupModal={setShowAddPickupModal} />
        <ShowPickups organizerId={user.uid}/>
      </>
  )
}

export default Dashboard;
