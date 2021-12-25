import React, {useState} from 'react';
import {announcePickup} from 'services/organizers';
import HorizontalForm from 'components/form/HorizontalForm';
import TextField from 'components/form/TextField';
import HelperText from 'components/form/HelperText';
import DropdownField from 'components/form/DropdownField';
import ButtonField from 'components/form/ButtonField';
import Alert from 'components/notification/Alert';
import HeadingBanner from 'components/HeadingBanner';
import Navbar from 'components/navbar/Navbar';
import {useUserProvider} from 'contexts/UserProvider';
import {Link, Redirect} from 'react-router-dom';
import {COLORADO_CITIES, DAYS_OF_WEEK} from 'GlobalConstants';

const AnnouncePickup = ({ organizerId }) => {
  const {user, loading: loadingUser} = useUserProvider();
  const [savingPickup, setSavingPickup] = useState(false)

  const [fieldName, setFieldName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState(COLORADO_CITIES[0])
  const [zip, setZip] = useState('')
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [am, setAm] = useState(true)
  const [day, setDay] = useState(DAYS_OF_WEEK[0])

  const [isFieldNameValid, setIsFieldNameValid] = useState(true)
  const [isStreetAddressValid, setIsStreetAddressValid] = useState(true)
  const [isZipValid, setIsZipValid] = useState(true)
  const [isHourValid, setIsHourValid] = useState(true)
  const [isMinuteValid, setIsMinuteValid] = useState(true)

  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const alphaNumericSpaceRegex = new RegExp(/^[\w\s]+$/)
  const nonNumericRegex = new RegExp(/\D/)
  const nonZeroPositiveNumericRegex = new RegExp(/[\D0]/)

  // an array of int 1 - 12
  const hourOptions = Array(12).fill(0).map((_, i) => i + 1)
  const minuteOptions = ['00', '15', '30', '45']

  const validateAlphaNumericSpace = (value, setter) => {
    if (value.trim() !== '') return setter(alphaNumericSpaceRegex.test(value))
    setter(true)
  }

  const validateZip = (zipValue) => {
    if (zipValue.trim() !== '') {
      const zipAsInt = parseInt(zipValue)
      // Got these zip boundary numbers (80001 - 81658) from http://www.structnet.com/instructions/zip_min_max_by_state.html
      if (
          zipValue.length !== 5 ||
          isNaN(zipAsInt) ||
          zipAsInt < 80001 ||
          zipAsInt > 81658
      )
        return setIsZipValid(false)
    }
    setIsZipValid(true)
  }

  const validateHourCannotBeZero = (value, setter) => {
    if (value.trim() !== '') return setter(!nonZeroPositiveNumericRegex.test(value))
    setter(true)
  }

  const validateMinute = (value, setter) => {
    if (value.trim() !== '') return setter(value !== '0')
    setter(true)
  }

  const allowIntegerOnly = (value, setter) => {
    const newValue = value.toString().replace(nonNumericRegex, '')
    if (setter) setter(newValue)
    return newValue
  }

  const handleFieldNameInput = fieldNameInput => {
    setFieldName(fieldNameInput)
    validateAlphaNumericSpace(fieldNameInput, setIsFieldNameValid)
  }

  const handleAddressInput = streetAddressInput => {
    setStreetAddress(streetAddressInput)
    validateAlphaNumericSpace(streetAddressInput, setIsStreetAddressValid)
  }

  const handleCityInput = cityInput => {
    setCity(cityInput)
  }

  const handleZipInput = zipInput => {
    validateZip(allowIntegerOnly(zipInput, setZip))
  }

  const handleHourInput = hourInput => {
    setHour(hourInput)
    validateHourCannotBeZero(hourInput, setIsHourValid)
  }

  const handleMinuteInput = minuteInput => {
    setMinute(minuteInput)
    validateMinute(minuteInput, setIsMinuteValid)
  }

  const isAllInputValid = () =>
      isFieldNameValid && fieldName.trim() !== '' &&
      isStreetAddressValid && streetAddress.trim() !== '' &&
      isZipValid && zip.trim() !== '' &&
      isHourValid && hour !== 0 &&
      isMinuteValid && minute !== 0

  const reset = () => {
    setFieldName('')
    setStreetAddress('')
    setCity(COLORADO_CITIES[0])
    setZip('')
    setHour(0)
    setMinute(0)
    setAm(true)
    setDay(DAYS_OF_WEEK[0])
  }

  const savePickup = () => {
    const pickup = {
      field: fieldName,
      address: {
        street: streetAddress,
        state: 'CO',
        city,
        zip,
      },
      time: {
        hour,
        minute,
        am,
      },
      day,
    }
    setSavingPickup(true)

    announcePickup(pickup, organizerId || user.uid)
    .then(() => {
      reset()
      setSubmitSuccess(true)
    })
    .catch(setSubmitError)
    .finally(() => setSavingPickup(false))
  }

  const renderForm = () => {
    return (
        <>
          <HorizontalForm label="What field do you play on?">
            <TextField
                value={fieldName}
                placeholder="Field name"
                onChangeFn={handleFieldNameInput}
            >
              <HelperText
                  helperText="No special characters allowed"
                  isInputValid={isFieldNameValid}
                  type="danger"
              />
            </TextField>
          </HorizontalForm>

          <HorizontalForm label="Field Address">
            <TextField
                value={streetAddress}
                placeholder="Street address"
                onChangeFn={handleAddressInput}
            >
              <HelperText
                  helperText="No special characters allowed"
                  isInputValid={isStreetAddressValid}
                  type="danger"
              />
            </TextField>
          </HorizontalForm>

          <HorizontalForm>
            <DropdownField
                value={city}
                onChangeFn={handleCityInput}
                options={COLORADO_CITIES}
            />
            <TextField
                value={zip}
                placeholder="Zip"
                onChangeFn={handleZipInput}
                isInputValid={isZipValid}
            >
              <HelperText
                  helperText="Invalid zip"
                  isInputValid={isZipValid}
                  type="danger"
              />
              <HelperText
                  isInputValid={!isZipValid}
                  helperText="Between 80001 - 81658"
                  type="info"
              />
            </TextField>
          </HorizontalForm>

          <HorizontalForm label="When do you play?">
            <DropdownField
                value={hour}
                onChangeFn={handleHourInput}
                options={hourOptions}
                placeholder="Hour"
            >
              <HelperText
                  helperText="Incorrect time selected"
                  isInputValid={isHourValid}
                  type="danger"
              />
            </DropdownField>
            <DropdownField
                value={minute}
                onChangeFn={handleMinuteInput}
                options={minuteOptions}
                placeholder="Minute"
            >
              <HelperText
                  helperText="Incorrect time selected"
                  isInputValid={isMinuteValid}
                  type="danger"
              />
            </DropdownField>
            <DropdownField
                value={am ? 'am' : 'pm'}
                onChangeFn={value => setAm(value === 'am')}
                options={['am', 'pm']}
            />
          </HorizontalForm>

          <HorizontalForm>
            <DropdownField
                value={day}
                onChangeFn={setDay}
                options={DAYS_OF_WEEK}
            />
          </HorizontalForm>

          <HorizontalForm>
            <ButtonField
                text="Announce pickup"
                onClickFn={savePickup}
                disabled={!isAllInputValid()}
                loading={savingPickup}
            />
          </HorizontalForm>

        </>
    )
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
          {renderForm()}
        </div>
      </div>
    </div>
  )
};

export default AnnouncePickup;
