import { checkPageStatusCanBeUpdated } from "../utils/canUpdateStatus.js"
import { safeStringify } from "../utils/stringifyErrorLog.js"
import { createPageStatus, getPageStatusByPageNumber, updatePageStatus } from "./pageStatusDB.services.js"

export const pageProcessingStatusHandler = async (pageNumber, status, errorLog) => {
   errorLog = safeStringify(errorLog)
   console.log('after',errorLog);
    try {
        const pageStatusData = await getPageStatusByPageNumber(pageNumber)
        if (pageStatusData) {
            const pageStatusCanBeUpdated = checkPageStatusCanBeUpdated(pageStatusData.status, status)
            if (pageStatusCanBeUpdated) {
                const attempts = pageStatusData.attempts + 1
                await updatePageStatus(pageNumber, status, errorLog, attempts)
            }
        }
        else {
            const attempts = 1
            await createPageStatus({ pageNumber, status, errorLog, attempts })
        }
    } catch (error) {
        console.log(error);
        throw error
    }

}
