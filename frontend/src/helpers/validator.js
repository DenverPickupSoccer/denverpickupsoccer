export const validateAlphaNumericSpace = value => {
    if (value.trim() === '') return false
    const alphaNumericSpaceRegex = new RegExp(/^[\w\s]+$/)
    return alphaNumericSpaceRegex.test(value)
}

export const validateZip = value => {
    if (value.trim() === '') return false
    if (value.trim().length !== 5) return false
    
    const zipAsInt = parseInt(value)
    if (isNaN(zipAsInt)) return false
    // Got these zip boundary numbers (80001 - 81658) from http://www.structnet.com/instructions/zip_min_max_by_state.html
    if (zipAsInt < 80001 || zipAsInt > 81658) return false

    return true
}

export const validateHourCannotBeZero = (value) => {
    if (value.trim() === '') return false
    const nonZeroPositiveNumericRegex = new RegExp(/[\D0]/)
    return !nonZeroPositiveNumericRegex.test(value)
}

export const validateMinute = value => {
    if (value.trim() === '') return false
    return value !== '0'
}
