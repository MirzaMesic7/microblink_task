export const showDateOfBirth = (dateOfBirth) => {
    if(typeof(dateOfBirth) != "string" && typeof(dateOfBirth) != "undefined" ){
        return dateOfBirth.toLocaleDateString('pt-PT').replaceAll('/', '-')
    } else {
        return dateOfBirth
    }
}