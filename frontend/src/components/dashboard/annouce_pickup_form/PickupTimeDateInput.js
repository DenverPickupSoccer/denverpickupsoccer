import React from "react";
import DropdownField from "components/form/DropdownField";
import HelperText from "components/form/HelperText";
import HorizontalForm from "components/form/HorizontalForm";
import {validateHourCannotBeZero, validateMinute} from "helpers/validator";
import {DAYS_OF_WEEK} from "GlobalConstants";

const PickupTimeDateInput = ({
    hour,
    setHour,
    isHourValid,
    setIsHourValid,
    minute,
    setMinute,
    isMinuteValid,
    setIsMinuteValid,
    am,
    setAm,
    day,
    setDay
}) => {
    // an array of int 1 - 12
    const hourOptions = Array(12).fill(0).map((_, i) => i + 1)
    const minuteOptions = ['00', '15', '30', '45']
    
    const handleHourInput = hourInput => {
        setHour(hourInput)
        setIsHourValid(validateHourCannotBeZero(hourInput))
    }
    
    const handleMinuteInput = minuteInput => {
        setMinute(minuteInput)
        setIsMinuteValid(validateMinute(minuteInput))
    }

    return (
        <>
            <HorizontalForm label="When do you play?">
                <DropdownField
                    value={hour}
                    onChangeFn={handleHourInput}
                    options={hourOptions}
                    placeholder="Hour"
                >
                    <HelperText
                        helperText="Please, select a valid hour"
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
                        helperText="Please, select a valid minute"
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
        </>
    )
}

export default PickupTimeDateInput;