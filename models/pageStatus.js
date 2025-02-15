import { DataTypes } from "sequelize";
import { PAGE_STATUS_ARRAY } from "../constants/pageStatus.Enum.js";
import sequelizePageStatusDB from "../config/database.js";

export const PageStatus = sequelizePageStatusDB.define('PageStatus', {
    pageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(PAGE_STATUS_ARRAY),
        allowNull: false
    }
})