import { PageStatus } from "../models/pageStatus.js"

export const getAllPagesStatus = async () => {
    return await PageStatus.findAll({ attributes: ['pageNumber', 'status'], raw: true })
}

export const getPageStatusByPageNumber = async (pageNumber) => {
    return await PageStatus.findOne({ where: { pageNumber }, attributes: ['pageNumber', 'status'], raw: true })
}

export const getPageStatusByStatus = async (status) => {
    return await PageStatus.findAll({ where: { status }, attributes: ['pageNumber', 'status'], raw: true })
}

export const createPageStatus = async (data) => {
    return await PageStatus.create(data)
}

export const updatePageStatus = async (pageNumber, status) => {
    return await PageStatus.update({ status }, { where: { pageNumber } })
}