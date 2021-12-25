import React from "react";
import HorizontalForm from "components/form/HorizontalForm";
import TextField from "components/form/TextField";
import HelperText from "components/form/HelperText";
import {validateAlphaNumericSpace} from "helpers/validator";

const PickupFieldInput = ({ fieldName, setFieldName, isFieldNameValid, setIsFieldNameValid }) => {
    const handleFieldNameInput = fieldNameInput => {
        setFieldName(fieldNameInput)
        setIsFieldNameValid(validateAlphaNumericSpace(fieldNameInput))
    }

    return (
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
    )
}

export default PickupFieldInput;