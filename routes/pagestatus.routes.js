import express from "express";

const pageStatusRouter = express.Router()

pageStatusRouter.get('/page-status/all', async (req, res) => {
    const data = await PageStatus.findAll({ raw: true })
    res.send(data)
})

pageStatusRouter.get('/page-status/status/:status', async (req, res) => {
    const { status } = req.params
    const data = await getPageStatusByStatus(status)
    res.json({ data })
})

pageStatusRouter.get('/page-status/page/:pageNumber', async (req, res) => {
    const { pageNumber } = req.params
    const data = await getPageStatusByPageNumber(pageNumber)
    res.json({ data })
})

export default pageStatusRouter