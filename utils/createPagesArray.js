export const generatePagesArray = (maxPageNumber, count) => {
    const maxElementsInEachArray = Math.ceil(maxPageNumber / count)
    const arrayOfSplittedPagesArray = []
    let startPositionOfNumberInArray = 1
    let endPositionOfNumberInArray = maxElementsInEachArray
    for (let i = 1; i <= count; i++) {
        arrayOfSplittedPagesArray.push({ start: startPositionOfNumberInArray, end: endPositionOfNumberInArray })
        startPositionOfNumberInArray = endPositionOfNumberInArray + 1
        endPositionOfNumberInArray = startPositionOfNumberInArray + maxElementsInEachArray - 1
        endPositionOfNumberInArray = endPositionOfNumberInArray <= maxPageNumber ? endPositionOfNumberInArray : maxPageNumber
    }
    return arrayOfSplittedPagesArray
}