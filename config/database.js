import { Sequelize } from "sequelize";
import { fileURLToPath } from 'url'
import path from "path";

const __dirname = path.resolve()

const sequelizePageStatusDB = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/scrapper.sqlite')
})

export default sequelizePageStatusDB