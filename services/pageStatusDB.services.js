import { Op } from "sequelize"
import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"
import { PageStatus } from "../models/index.js"

export const getAllPagesStatus = async () => {
    return await PageStatus.findAll({ attributes: ['pageNumber', 'status', 'attempts', 'errorLog'], raw: true })
}

export const getPageStatusByPageNumber = async (pageNumber) => {
    return await PageStatus.findOne({ where: { pageNumber }, attributes: ['pageNumber', 'status', 'attempts', 'errorLog'], raw: true })
}

export const getFailedPagesByPageNumberRange = async (range) => {
    const { start, end } = range
    return await PageStatus.findAll({ where: { pageNumber: { [Op.between]: [start, end] }, status: PAGE_STATUS_ENUMS.FAILED, attempts: { [Op.lt]: 2 } }, raw: true })
}

export const getPageStatusByStatus = async (status) => {
    return await PageStatus.findAll({ where: { status }, attributes: ['pageNumber', 'status', 'errorLog', 'attempts'], raw: true })
}

export const createPageStatus = async (data) => {
    try {
        return await PageStatus.create(data)
    } catch (error) {
        console.log('dbl', error);
    }
}

export const updatePageStatus = async (pageNumber, status, errorLog, attempts) => {
    return await PageStatus.update({ status, errorLog, attempts }, { where: { pageNumber } })
}