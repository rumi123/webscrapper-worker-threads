import express from "express"
import { isMainThread, Worker } from "worker_threads"
import os from "os"
import { generatePagesArray } from "./utils/createPagesArray.js";
import sequelizePageStatusDB from "./config/database.js";
import sequelizeAmazonScrapperDb from "./config/jobs/amazon-database.job.js";
import pageStatusRouter from "./routes/pagestatus.routes.js";
import { checkIfAttemptLimitExceeded } from "./utils/checkAttempts.js";

const NUM_WORKERS = os.cpus().length


const app = express()

await sequelizeAmazonScrapperDb.sync().then(console.log('synced')).catch(err => console.log(err))
await sequelizePageStatusDB.sync()

app.use(pageStatusRouter)

const arrayOfPages = generatePagesArray(30, NUM_WORKERS)

const workerSetup = async () => {
    return new Promise((resolve, reject) => {
        if (isMainThread) {
            let completedWorkers = 0
            for (let i = 1; i <= NUM_WORKERS; i++) {
                const worker = new Worker('./services/scrapper.js', { workerData: { pageIndexes: arrayOfPages[i - 1] } })
                worker.on('message', (msg) => {
                    console.log(`worker done`)
                    completedWorkers++
                })
                worker.on('error', (err) => console.log(`worker ${i} : ${err}`))
            }
            if (completedWorkers === NUM_WORKERS) {
                resolve()
            }
        }
    })
}


workerSetup()
// checkIfAttemptLimitExceeded()


app.listen(3000, () => console.log('running on port 3000'))

