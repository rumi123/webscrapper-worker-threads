import { DataTypes } from "sequelize";
import sequelizeAmazonScrapperDb from "../../config/jobs/amazon-database.job.js";

export const AmazonScrappedPageData = sequelizeAmazonScrapperDb.define('AmazonScrappedPageData', {
    pageNumber: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false }
})