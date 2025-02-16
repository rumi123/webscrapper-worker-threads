import { Sequelize } from "sequelize";
import path from "path";

const __dirname = path.resolve()

const sequelizePageStatusDB = new Sequelize({
    
    dialect: 'sqlite',
    storage: path.join(__dirname, './data/scrapper.sqlite'),logging:false
})

export default sequelizePageStatusDB