const defaultPostCred = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' },
  redirect: 'follow',
}

const fetchPickups = (organizerId) => {
  return fetch(`/api/organizers/${organizerId}/pickups`)
}

const createPickup = (pickup, organizerId) => {
  return fetch(`/api/organizers/${organizerId}/create_pickup`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    body: JSON.stringify(pickup),
  })
}

const announcePickup = (pickup, organizerId) => {
  return fetch(`/api/organizers/${organizerId}/announce_pickup`, {
    ...defaultPostCred,
    body: JSON.stringify(pickup)
  })
}

export { fetchPickups, createPickup, announcePickup }
