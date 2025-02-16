import { Sequelize } from "sequelize";
import path from 'path'

const __dirname = path.resolve()

const sequelizeAmazonScrapperDb = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/amazonScrappedData.sqlite'),
    logging: false
})

export default sequelizeAmazonScrapperDb
