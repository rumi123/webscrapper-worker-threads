import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"
import { checkPageStatusCanBeUpdated } from "../utils/canUpdateStatus.js"
import { createPageStatus, getPageStatusByPageNumber, updatePageStatus } from "./pageStatusDB.services.js"

export const pageProcessingStatusHandler = async (pageNumber, status, errorLog) => {
    try {
        const pageStatusData = await getPageStatusByPageNumber(pageNumber)
        if (pageStatusData) {
            const pageStatusCanBeUpdated = checkPageStatusCanBeUpdated(pageStatusData.status, status)
            if (pageStatusCanBeUpdated) {
                await updatePageStatus(pageNumber, status, errorLog)
            }
        }
        else {
            await createPageStatus({ pageNumber, status, errorLog })
        }
    } catch (error) {
        console.log(error);
        throw error
    }

}
