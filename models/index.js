import { DataTypes, DATE } from "sequelize";
import { PAGE_STATUS_ARRAY } from "../constants/pageStatus.Enum.js";
import sequelizePageStatusDB from "../config/database.js";
import sequelizeAmazonScrapperDb from "../config/jobs/amazon-database.job.js";


export const PageStatus = sequelizePageStatusDB.define('PageStatus', {
    pageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(PAGE_STATUS_ARRAY),
        allowNull: false
    },
    errorLog: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attempts: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


export const AmazonScrappedPageData = sequelizeAmazonScrapperDb.define('AmazonScrappedPageData', {
    pageNumber: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false }
})
