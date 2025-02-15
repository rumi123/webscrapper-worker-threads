import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"
import { PageStatus } from "../models/pageStatus.js"

export const pageProcessingStatusHandler = async (pageNumber, status) => {
    try {
        const pageStatusData = await PageStatus.findOne({ where: { pageNumber }, raw: true })
        if (pageStatusData) {
            if (pageStatusData.status === PAGE_STATUS_ENUMS.PROCESSING && [PAGE_STATUS_ENUMS.SUCCESS, PAGE_STATUS_ENUMS.FAILED].includes(status)) {
                await PageStatus.update({ status }, { where: { pageNumber } })
            }
            if(pageStatusData.status === PAGE_STATUS_ENUMS.PROCESSING && status === PAGE_STATUS_ENUMS.PROCESSING){
                return
            }
        } else {
            if(status === PAGE_STATUS_ENUMS.PROCESSING){
                await PageStatus.create({ pageNumber, status })
            }else{
                return
            }
        }
    } catch (error) {
        console.log(error);
        throw error
    }

}
