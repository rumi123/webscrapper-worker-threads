import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"

export const checkPageStatusCanBeUpdated = (currentStatus, newStatus) => {
    if (currentStatus === PAGE_STATUS_ENUMS.PROCESSING) {
        if ([PAGE_STATUS_ENUMS.FAILED, PAGE_STATUS_ENUMS.SUCCESS].includes(newStatus)) {
            return true
        } if (newStatus === PAGE_STATUS_ENUMS.PROCESSING) {
            return false
        }
    } if (currentStatus === PAGE_STATUS_ENUMS.SUCCESS) {
        return false
    } if (currentStatus === PAGE_STATUS_ENUMS.FAILED) {
        return true
    }
}