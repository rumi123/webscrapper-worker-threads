import 'dotenv/config'
import { getPageStatusByPageNumber } from '../services/pageStatusDB.services.js'

export const checkIfAttemptLimitExceeded = async (pageNumber) => {
    const maxAttempts = process.env.PAGE_ATTEMPT_LIMIT
    const pageStatusData = await getPageStatusByPageNumber(pageNumber)
    if (pageStatusData) {
        if (pageStatusData.attempts >= maxAttempts) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}