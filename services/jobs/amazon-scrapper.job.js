import puppeteer from "puppeteer"
import { AmazonScrappedPageData } from "../../models/jobs/amazon-database.job.js"

export const scrappeAmazonPageData = async (pageNumber, browser) => {
    try {
        if([1,2,4,33,42,54,21,7,15].includes(pageNumber)){
            throw 'failed'
        }
        if (pageNumber) {
            const page = await browser.newPage()
            await page.goto(`https://www.amazon.in/s?k=smartphone&i=electronics&rh=n%3A1389401031&page=${pageNumber}&xpid=fQ0OoWl8E8bWg`)
            const content = await page.content()
            await AmazonScrappedPageData.create({ pageNumber, content: JSON.stringify(content) })
            return
        }
    } catch (error) {
        throw error
    }
}