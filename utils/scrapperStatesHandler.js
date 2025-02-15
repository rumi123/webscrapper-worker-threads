import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"
import { createPageStatus, getPageStatusByPageNumber, updatePageStatus } from "../services/pageStatusDB.services.js"

export const pageProcessingStatusHandler = async (pageNumber, status) => {
    try {
        const pageStatusData = await getPageStatusByPageNumber(pageNumber)
        if (pageStatusData) {
            if (pageStatusData.status === PAGE_STATUS_ENUMS.PROCESSING && [PAGE_STATUS_ENUMS.SUCCESS, PAGE_STATUS_ENUMS.FAILED].includes(status)) {
                await updatePageStatus(pageNumber, status)
            }
            if (pageStatusData.status === PAGE_STATUS_ENUMS.PROCESSING && status === PAGE_STATUS_ENUMS.PROCESSING) {
                return
            }
        } else {
            if (status === PAGE_STATUS_ENUMS.PROCESSING) {
                await createPageStatus({ pageNumber, status })
            } else {
                return
            }
        }
    } catch (error) {
        console.log(error);
        throw error
    }

}
