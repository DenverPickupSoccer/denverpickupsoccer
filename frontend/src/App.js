import Navbar from './components/navbar/Navbar';
import HeadingBanner from './components/HeadingBanner';
import PickupCard from './components/PickupCard';
import Footer from './components/Footer';
import { DateTime, Settings } from 'luxon'
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import {api} from 'services/api';

Settings.defaultZoneName = 'America/Denver'

const FilterByDayOfWeek = ({ filterByDay, setFilterByDay }) => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const selectDay = (day) => {
    setFilterByDay(day)
  }

  const unselectDay = () => {
    setFilterByDay(null)
  }

  const toggleButton = (e) => {
    const selectedDay = e.target.value
    if (selectedDay === filterByDay) return unselectDay()
    return selectDay(selectedDay)
  }

  const renderButtonForDays = () => {
    return (
        DAYS.map((day, index) =>
            <button
                className={classNames('button day-filter is-rounded mx-1', { 'is-primary': day === filterByDay})}
                onClick={toggleButton}
                value={day}
                key={index}
            >
              {day}
            </button>
        )
    )
  }

  return (
      <>
        <hr className='control'/>
        <section className="is-horizontal-scrollable centered">
          {renderButtonForDays()}
        </section>
        <hr className='horizontal-line'/>
      </>
  )
}

const Search = ({searchTerm, handleSearchTermChange}) => {
  return(
      <div className="field">
        <p className="control">
          <input className="input is-round"
                 type='text'
                 placeholder='Search Anything!'
                 value = {searchTerm}
                 onChange = {handleSearchTermChange}
          />
        </p>
      </div>
  )
}

const App = () => {
  const PICKUPS = [
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
    contact: 'Edgar Barajas'
  },
  {
    field: 'Village Greens Park',
    address: {
      street: '9501 E Union Ave',
      city: 'Englewood',
      state: 'CO',
      zip: '80111'
    },
    time: '2:00 pm',
    day: 'Saturday',
    contact: 'George Young'
  },
  {
    field: 'Village Greens Park',
    address: {
      street: '9501 E Union Ave',
      city: 'Englewood',
      state: 'CO',
      zip: '80111'
    },
    time: '12:00 pm',
    day: 'Thursday',
    contact: 'Raul Belman',
    hidden: true
  },
  {
    field: 'Village Greens Park',
    address: {
      street: '9501 E Union Ave',
      city: 'Englewood',
      state: 'CO',
      zip: '80111'
    },
    time: '12:00 pm',
    day: 'Tuesday',
    contact: 'Raul Belman',
    hidden: true
  },
  {
    field: 'Village Greens Park',
    address: {
      street: '9501 E Union Ave',
      city: 'Englewood',
      state: 'CO',
      zip: '80111'
    },
    time: '12:00 pm',
    day: 'Friday',
    contact: 'Raul Belman',
    hidden: true
  },
  {
    field: 'Village Greens Park',
    address: {
      street: '9501 E Union Ave',
      city: 'Englewood',
      state: 'CO',
      zip: '80111'
    },
    time: '1:00 pm',
    day: 'Sunday',
    contact: ''
  },
  {
    field: 'Cranmer Park',
    address: {
      street: '4300 E Third Ave',
      city: 'Denver',
      state: 'CO',
      zip: '80220'
    },
    time: '10:00 am',
    day: 'Sunday',
    contact: 'Christopher Wood'
  },
  {
    field: 'Garfield Lake Park',
    address: {
      street: '3600 W Mississippi Ave',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '11:00 am',
    day: 'Saturday',
    contact: 'Ben Medina'
  },
  {
    field: 'Garfield Lake Park',
    address: {
      street: '3600 W Mississippi Ave',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '4:30 pm',
    day: 'Friday',
    contact: 'Aric Peterson'
  },
  {
    field: 'Barnum Park',
    address: {
      street: '360 Hooker St',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '8:30 am',
    day: 'Saturday',
    contact: 'Grant Wilhelmson'
  },
  {
    field: 'Tierra Park',
    address: {
      street: '14601 E Jewell Ave',
      city: 'Aurora',
      state: 'CO',
      zip: '80012'
    },
    time: '9:00 am',
    day: 'Saturday',
    contact: 'Sergio David Lopez'
  },
  {
    field: 'Village Park',
    address: {
      street: '6161 S Jasper Way',
      city: 'Centennial',
      state: 'CO',
      zip: '80016'
    },
    time: '12:00 pm',
    day: 'Saturday',
    contact: 'Zim Green'
  },
  {
    field: 'Garfield Lake Park',
    address: {
      street: '3600 W Mississippi Ave',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '12:00 pm',
    day: 'Sunday',
    contact: 'Cody Peyton'
  },
  {
    field: 'City Park',
    address: {
      street: '2001 Colorado Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80205'
    },
    time: '5:30 pm',
    day: 'Tuesday',
    contact: 'Tasia Poinsatte'
  },
  {
    field: 'Barnum East Park',
    address: {
      street: '500 Federal Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '8:00 am',
    day: 'Saturday',
    contact: 'Grant Wilhelmson'
  },
  {
    field: 'Barnum East Park',
    address: {
      street: '500 Federal Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80219'
    },
    time: '9:00 am',
    day: 'Sunday',
    contact: 'Grant Wilhelmson'
  },
  {
    field: 'City Park',
    address: {
      street: '2001 Colorado Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80205'
    },
    time: '5:00 pm',
    day: 'Monday',
    contact: ''
  },
  {
    field: 'City Park',
    address: {
      street: '2001 Colorado Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80205'
    },
    time: '5:00 pm',
    day: 'Wednesday',
    contact: ''
  },
  {
    field: 'City Park',
    address: {
      street: '2001 Colorado Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80205'
    },
    time: '5:00 pm',
    day: 'Friday',
    contact: ''
  },
  {
    field: 'Broomfield Commons Williams Field ',
    address: {
      street: '13200 Sheridan Blvd',
      city: 'Broomfield',
      state: 'CO',
      zip: '80020'
    },
    time: '9:00 am',
    day: 'Saturday',
    contact: 'Luis Ramos, Logan Ross'
  },
  {
    field: 'Aspen View Academy',
    address: {
      street: '2131 Low Meadow Blvd',
      city: 'Castle Rock',
      state: 'CO',
      zip: '80109'
    },
    time: '9:00 am',
    day: 'Saturday',
    contact: ''
  }
]
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const [filterByDay, setFilterByDay] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPickups = PICKUPS.filter(pickup => {
    for (let property in pickup) {
      let attribute = pickup[property];
      let attributeIsSubsetOfSearchTerm = attribute.toString().toLowerCase().includes(searchTerm.toLowerCase());
      if ((typeof attribute !== 'boolean') && (attributeIsSubsetOfSearchTerm)) return true;
    }
    return false;
  });

  useEffect(() => {
    api()
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error)
  })

  const comparePickupsByDaysOfTheWeek = (firstPickup, secondPickup) => {
    const firstDay = firstPickup.day
    const secondDay = secondPickup.day
    // The next two line would make sure that Saturday is before Sunday.
    // In the case where we want to sort three pickups that are on [Friday, Saturday, Sunday],
    // we compare first two and result with Friday before Saturday. Then we compare the next two
    // and we should get Saturday before Sunday. Without the next two lines, the default
    // comparison that's based on the index of days in WEEKDAYS would result in Sunday before Saturday.
    if (firstDay === 'Saturday' && secondDay === 'Sunday') return -1
    if (firstDay === 'Sunday' && secondDay === 'Saturday') return 1
    return WEEKDAYS.indexOf(firstDay) - WEEKDAYS.indexOf(secondDay)
  }

  const renderSearchResultsByDayOfTheWeek = (weekday, search) => {
    const pickupSearchHappeningOnDay = search.filter(pickup => (pickup.day === weekday) && !pickup.hidden);
    if (pickupSearchHappeningOnDay.length === 0) return <p>No pickups</p>
    return pickupSearchHappeningOnDay.map(pickup => <PickupCard field={pickup.field} address={pickup.address} time={pickup.time} day={pickup.day} contact={pickup.contact}/>)
  }

  const renderPickupsByDayOfTheWeek = (weekday) => {
    const pickupsHappeningOnDay = PICKUPS.filter(pickup => (pickup.day === weekday) && !pickup.hidden)
    if (pickupsHappeningOnDay.length === 0) return <p>No pickups</p>
    return pickupsHappeningOnDay.map(pickup => <PickupCard field={pickup.field} address={pickup.address} time={pickup.time} day={pickup.day} contact={pickup.contact}/>)
  }

  const renderPickupsNotHappeningOnDays = (weekdays) => {
    const pickupsNotHappeningOnDays = PICKUPS.sort(comparePickupsByDaysOfTheWeek).filter(pickup => !weekdays.includes(pickup.day) && !pickup.hidden)
    if (pickupsNotHappeningOnDays.length === 0) return <p>No pickups</p>
    return pickupsNotHappeningOnDays.map(pickup => <PickupCard field={pickup.field} address={pickup.address} time={pickup.time} day={pickup.day} contact={pickup.contact}/>)
  }

  const renderPickups = (filterByDay) => {
    const today = WEEKDAYS[DateTime.local().weekday]
    const tomorrow = WEEKDAYS[DateTime.local().plus({ days: 1 }).weekday]

    if (filterByDay && searchTerm) {
      return (
          <>
            <HeadingBanner text={`Showing pickups for ${searchTerm} on ${filterByDay}`}/>
            <section className="container section">
              <div className="columns is-multiline is-mobile">
                {renderSearchResultsByDayOfTheWeek(filterByDay, filteredPickups)}
              </div>
            </section>
          </>
      )
    }

    if (searchTerm) {
      return (
          <>
            <HeadingBanner text={`Showing pickups for ${searchTerm}`}/>
            <section className="container section">
              <div className="columns is-multiline is-mobile">
                {filteredPickups.map(pickup => (
                    <PickupCard field={pickup.field} address={pickup.address} time={pickup.time} day={pickup.day} contact={pickup.contact}/>
                ))}
              </div>
            </section>
          </>
      )
    }

    if (filterByDay) {
      return (
          <>
            <HeadingBanner text={`Showing pickups for ${filterByDay}`}/>
            <section className="container section">
              <div className="columns is-multiline is-mobile">
                {renderPickupsByDayOfTheWeek(filterByDay)}
              </div>
            </section>
          </>
      )
    }

    return (
        <>
          <HeadingBanner text="Happening today"/>
          <section className="container section">
            <div className="columns is-multiline is-mobile">
                {renderPickupsByDayOfTheWeek(today)}
            </div>
          </section>
          <HeadingBanner text="Happening tomorrow"/>
          <section className="container section">
            <div className="columns is-multiline is-mobile">
                {renderPickupsByDayOfTheWeek(tomorrow)}
            </div>
          </section>
          <HeadingBanner text="Happening other days"/>
          <section className="container section">
            <div className="columns is-multiline is-mobile">
                {renderPickupsNotHappeningOnDays([today, tomorrow])}
            </div>
          </section>
        </>
    )
  }

  return (
      <div className="has-text-centered landing">
        <Navbar showCallToAction={true} />
        <hr className='horizontal-line'/>
        <section className="centered">
          <Search searchTerm={searchTerm}
                  handleSearchTermChange={handleSearchTermChange}/>
          <div className="field is-grouped is-horizontal-scrollable">
            <FilterByDayOfWeek filterByDay={filterByDay}
                               setFilterByDay={setFilterByDay}/>
          </div>
        </section>
        <hr className='horizontal-line'/>

        {renderPickups(filterByDay)}

        <Footer />
      </div>
  )
}

export default App;
