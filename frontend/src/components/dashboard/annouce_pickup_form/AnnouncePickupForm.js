import React, {useState} from "react";
import HorizontalForm from "../../form/HorizontalForm";
import {COLORADO_CITIES, DAYS_OF_WEEK} from "GlobalConstants";
import ButtonField from "../../form/ButtonField";
import PickupFieldInput from "./PickupFieldInput";
import PickupAddressInput from "components/dashboard/annouce_pickup_form/PickupAddressInput";
import PickupTimeDateInput from "components/dashboard/annouce_pickup_form/PickupTimeDateInput";

const AnnouncePickupForm = ({ savePickup, savingPickup }) => {
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
    
    const isAllInputValid = () =>
        isFieldNameValid && fieldName.trim() !== '' &&
        isStreetAddressValid && streetAddress.trim() !== '' &&
        isZipValid && zip.trim() !== '' &&
        isHourValid && hour !== 0 &&
        isMinuteValid && minute !== 0
    
    const handleSave = () => {
        const resetForm = () => {
            setFieldName('')
            setStreetAddress('')
            setCity(COLORADO_CITIES[0])
            setZip('')
            setHour(0)
            setMinute(0)
            setAm(true)
            setDay(DAYS_OF_WEEK[0])
        }

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
        
        savePickup(pickup, resetForm)
    }
    
    return (
        <>
            <PickupFieldInput
                fieldName={fieldName}
                setFieldName={setFieldName}
                isFieldNameValid={isFieldNameValid}
                setIsFieldNameValid={setIsFieldNameValid}
            />
            
            <PickupAddressInput
                streetAddress={streetAddress}
                setStreetAddress={setStreetAddress}
                isStreetAddressValid={isStreetAddressValid}
                setIsStreetAddressValid={setIsStreetAddressValid}
                city={city}
                setCity={setCity}
                zip={zip}
                setZip={setZip}
                isZipValid={isZipValid}
                setIsZipValid={setIsZipValid}
            />
            
            <PickupTimeDateInput
                hour={hour}
                setHour={setHour}
                isHourValid={isHourValid}
                setIsHourValid={setIsHourValid}
                minute={minute}
                setMinute={setMinute}
                isMinuteValid={isMinuteValid}
                setIsMinuteValid={setIsMinuteValid}
                am={am}
                setAm={setAm}
                day={day}
                setDay={setDay}
            />
            
            <HorizontalForm>
                <ButtonField
                    text="Announce pickup"
                    onClickFn={handleSave}
                    disabled={!isAllInputValid()}
                    loading={savingPickup}
                />
            </HorizontalForm>
        
        </>
    
    );
}

export default AnnouncePickupForm