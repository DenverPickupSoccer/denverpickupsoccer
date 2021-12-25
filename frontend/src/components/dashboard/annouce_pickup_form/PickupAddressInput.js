import React from "react";
import TextField from "components/form/TextField";
import HelperText from "components/form/HelperText";
import HorizontalForm from "components/form/HorizontalForm";
import {validateAlphaNumericSpace, validateZip} from "helpers/validator";
import DropdownField from "components/form/DropdownField";
import {COLORADO_CITIES} from "GlobalConstants";

const PickupAddressInput = ({
    streetAddress,
    setStreetAddress,
    isStreetAddressValid,
    setIsStreetAddressValid,
    city,
    setCity,
    zip,
    setZip,
    isZipValid,
    setIsZipValid,
}) => {
    
    const handleAddressInput = streetAddressInput => {
        setStreetAddress(streetAddressInput)
        setIsStreetAddressValid(validateAlphaNumericSpace(streetAddressInput))
    }
    
    const handleZipInput = zipInput => {
        setZip(zipInput)
        setIsZipValid(validateZip(zipInput))
    }

    return (
        <>
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
                    onChangeFn={setCity}
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
        </>
    )
}

export default PickupAddressInput;