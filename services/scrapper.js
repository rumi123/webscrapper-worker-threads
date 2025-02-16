import puppeteer from 'puppeteer';
import { parentPort, workerData } from 'worker_threads'
import { PAGE_STATUS_ENUMS } from '../constants/pageStatus.Enum.js';
import { pageProcessingStatusHandler } from './scrapperStatesHandler.js';
import { scrappeAmazonPageData } from './jobs/amazon-scrapper.job.js';
import { getFailedPagesByPageNumberRange } from './pageStatusDB.services.js';
import { getArrayFromArrayOfObjects } from '../utils/getArrayFromArrayofObjects.js';
import { checkIfAttemptLimitExceeded } from '../utils/checkAttempts.js';

const scrapper = async (pageIndexes) => {
    const { start, end } = pageIndexes
    console.log(pageIndexes);
    try {
        const browser = await puppeteer.launch()
        for (let i = start; i <= end; i++) {
            await scrapePageData(i, browser)
        }
        browser.close()
        await scrappFailedPages(pageIndexes)
        parentPort.postMessage('success')
    } catch (error) {
        console.log(error);
        throw 'failed'
    }
}

const scrapePageData = async (pageNumber, browser) => {
    try {
        const ifMaxAttemptsExceeded = await checkIfAttemptLimitExceeded(pageNumber)
        if (ifMaxAttemptsExceeded) {
            return
        }
        await pageProcessingStatusHandler(pageNumber, PAGE_STATUS_ENUMS.PROCESSING)
        await scrappeAmazonPageData(pageNumber, browser)
        await pageProcessingStatusHandler(pageNumber, PAGE_STATUS_ENUMS.SUCCESS)
    } catch (error) {
        console.log(`page ${pageNumber}`, error);
        pageProcessingStatusHandler(pageNumber, PAGE_STATUS_ENUMS.FAILED, error)
    }
}

const scrappFailedPages = async (pageIndexes) => {
    try {
        const failedPagesData = await getFailedPagesByPageNumberRange(pageIndexes)
        const arrayOfPageNumbers = getArrayFromArrayOfObjects(failedPagesData, 'pageNumber')
        const browser = await puppeteer.launch()
        while (arrayOfPageNumbers.length > 0) {
            for (let i = 0; i < arrayOfPageNumbers.length; i++) {
                const pageNumber = arrayOfPageNumbers[i]
                console.log(`started failed page ${pageNumber}`);
                await scrapePageData(pageNumber, browser)
            }
        }
        browser.close()
    } catch (error) {
        throw error
    }

}

scrapper(workerData.pageIndexes)