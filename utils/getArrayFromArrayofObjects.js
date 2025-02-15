export const getArrayFromArrayOfObjects = (array, attribute) => {
    const result = array.map(element => element[attribute])
    return result
}