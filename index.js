import express from "express"
// import generatePrimes from "./prime.js";
import { isMainThread, Worker, workerData } from "worker_threads"
import os from "os"
import { generatePagesArray } from "./utils/createPagesArray.js";
import sequelize from "./config/database.js";
import sequelizePageStatusDB from "./config/database.js";
import sequelizeAmazonScrapperDb from "./config/jobs/amazon-database.job.js";
import { PageStatus } from "./models/pageStatus.js";
import { AmazonScrappedPageData } from "./models/jobs/amazon-database.job.js";

const NUM_WORKERS = os.cpus().length
console.log(NUM_WORKERS);


const app = express()

const arrayOfPages = generatePagesArray(200, 4)

const workerSetup = async () => {
    if (isMainThread) {

        for (let i = 1; i <= NUM_WORKERS; i++) {
            const worker = new Worker('./services/scrapper.js', { workerData: { pageIndexes: arrayOfPages[i - 1] } })
            worker.on('message', (msg) => console.log(`worker done`))
            worker.on('error', (err) => console.log(`worker ${i} : ${err}`))
        }


    }
}

app.get('/status', async (req, res) => {
    const data = await PageStatus.findAll({ raw: true })
    res.send(data)
})

app.get('/status/amazon', async (req, res) => {
    const data = await AmazonScrappedPageData.findAll({ raw: true })
    res.send(data)
})



workerSetup()

await sequelizeAmazonScrapperDb.sync()
await sequelizePageStatusDB.sync()
app.listen(3000, () => console.log('running on port 3000'))

