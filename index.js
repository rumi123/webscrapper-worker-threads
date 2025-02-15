import express from "express"
import { isMainThread, Worker } from "worker_threads"
import os from "os"
import { generatePagesArray } from "./utils/createPagesArray.js";
import sequelizePageStatusDB from "./config/database.js";
import sequelizeAmazonScrapperDb from "./config/jobs/amazon-database.job.js";
import pageStatusRouter from "./routes/pagestatus.routes.js";

const NUM_WORKERS = os.cpus().length


const app = express()

app.use(pageStatusRouter)

const arrayOfPages = generatePagesArray(200, NUM_WORKERS)

const workerSetup = async () => {
    if (isMainThread) {
        const completedWorkers = 0

        for (let i = 1; i <= NUM_WORKERS; i++) {
            const worker = new Worker('./services/scrapper.js', { workerData: { pageIndexes: arrayOfPages[i - 1] } })
            worker.on('message', (msg) => {
                console.log(`worker done`)
                completedWorkers++
            })
            worker.on('error', (err) => console.log(`worker ${i} : ${err}`))
        }

        if (completedWorkers === NUM_WORKERS) {

        }


    }
}


// workerSetup()

await sequelizeAmazonScrapperDb.sync()
await sequelizePageStatusDB.sync()
app.listen(3000, () => console.log('running on port 3000'))

