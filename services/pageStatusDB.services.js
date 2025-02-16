import { Op } from "sequelize"
import { PAGE_STATUS_ENUMS } from "../constants/pageStatus.Enum.js"
import { PageStatus } from "../models/index.js"

export const getAllPagesStatus = async () => {
    try {
        return await PageStatus.findAll({ attributes: ['pageNumber', 'status', 'attempts', 'errorLog'], raw: true })
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}

export const getPageStatusByPageNumber = async (pageNumber) => {
    try {
        return await PageStatus.findOne({ where: { pageNumber }, attributes: ['pageNumber', 'status', 'attempts', 'errorLog'], raw: true })
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}

export const getFailedPagesByPageNumberRange = async (range) => {
    const { start, end } = range
    try {
        return await PageStatus.findAll({ where: { pageNumber: { [Op.between]: [start, end] }, status: PAGE_STATUS_ENUMS.FAILED, attempts: { [Op.lt]: 2 } }, raw: true })
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}

export const getPageStatusByStatus = async (status) => {
    try {
        return await PageStatus.findAll({ where: { status }, attributes: ['pageNumber', 'status', 'errorLog', 'attempts'], raw: true })
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}

export const createPageStatus = async (data) => {
    try {
        return await PageStatus.create(data)
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}

export const updatePageStatus = async (pageNumber, status, errorLog, attempts) => {
    try {
        return await PageStatus.update({ status, errorLog, attempts }, { where: { pageNumber } })
    } catch (error) {
        console.log('dbl', error);
        throw error
    }
}