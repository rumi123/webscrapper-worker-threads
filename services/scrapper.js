import puppeteer from 'puppeteer';
import { parentPort, workerData } from 'worker_threads'
import { PAGE_STATUS_ENUMS } from '../constants/pageStatus.Enum.js';
import { pageProcessingStatusHandler } from '../utils/scrapperStatesHandler.js';
import { scrappeAmazonPageData } from './jobs/amazon-scrapper.job.js';

const scrapper = async (pageIndexes) => {

    const { start, end } = pageIndexes
    console.log(pageIndexes);
    try {
        const browser = await puppeteer.launch()
        for (let i = start; i <= end; i++) {
            try {
                await pageProcessingStatusHandler(i, PAGE_STATUS_ENUMS.PROCESSING)
                await scrappeAmazonPageData(i, browser)
                await pageProcessingStatusHandler(i, PAGE_STATUS_ENUMS.SUCCESS)
            } catch (error) {
                console.log(`page ${i}`, error);
                pageProcessingStatusHandler(i, PAGE_STATUS_ENUMS.FAILED)
            }
        }
        browser.close()
        parentPort.postMessage('success')
    } catch (error) {
        throw 'failed'
    }
}

scrapper(workerData.pageIndexes)