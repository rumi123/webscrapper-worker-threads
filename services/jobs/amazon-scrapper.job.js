import puppeteer from "puppeteer"
import { AmazonScrappedPageData } from "../../models/index.js"

export const scrappeAmazonPageData = async (pageNumber, browser) => {
    try {
        if (pageNumber) {
            if ([1, 2, 3, 4].includes(pageNumber)) {
                throw 'failed'
            }
            const page = await browser.newPage()
            await page.goto(`https://www.amazon.in/s?k=smartphone&i=electronics&rh=n%3A1389401031&page=${pageNumber}&xpid=fQ0OoWl8E8bWg`)
            const content = await page.content()
            await AmazonScrappedPageData.create({ pageNumber, content: JSON.stringify(content) })
            return
        } else {
            throw 'No Page number provided'
        }
    } catch (error) {
        throw error
    }
}