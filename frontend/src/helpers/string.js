export const removeNonNumeric = value => {
    const nonNumericRegex = new RegExp(/\D/)
    return value.toString().replace(nonNumericRegex, '')
}