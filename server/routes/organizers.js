const express = require('express');
const router = express.Router()
const firebase = require('../services/firebase')
const db = firebase.firestore()

router.get('/:organizerId/pickups', (req, res) => {
 // TODO: connect to firebase DB to get pickups
 const pickups = [
  {
   field: 'Village Park',
   address: {
    street: '6161 S Jasper Way',
    city: 'Centennial',
    state: 'CO',
    zip: '80016'
   },
   time: '12:00 pm',
   day: 'Sunday',
   contact: 'Jordan W. Alves'
  },
  {
   field: 'Inifinity Park',
   address: {
    street: '4599 E Tennessee Ave',
    city: 'Denver',
    state: 'CO',
    zip: '80246'
   },
   time: '5:30 pm',
   day: 'Friday',
   contact: 'Edgar Barajas',
  }
 ]
 res.send(pickups)
})

router.post('/:organizerId/create_pickup', (req, res) => {
 const organizerId = req.params.organizerId
 const pickup = {...req.body, organizerId}
 db.collection('organizer_pickups').add(pickup)
     .then(() => res.sendStatus(200))
     .catch(() => res.sendStatus(500))
})

router.post('/:organizerId/announce_pickup', async (req, res) => {
 const organizerId = req.params.organizerId
 const pickup = {...req.body, organizerId}

 const pickupRef = db.collection('organizer_pickups').doc()
 const announcementRef = db.collection('organizer_pickup_announcements').doc()
 const announcement = { pickupId: pickupRef.id, organizerId }

 Promise.all([pickupRef.set(pickup), announcementRef.set(announcement)])
     .then(() => res.sendStatus(200))
     .catch((e) => res.sendStatus(500))
})

module.exports = router
