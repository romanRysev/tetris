import type { Model, ModelAttributes } from "sequelize";
import { DataType } from "sequelize-typescript";


export interface ILeader {
    score: number;
    userID: number;
  }

  export const leaderModel: ModelAttributes<Model, ILeader> = {
    score: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
        },
    },
    userID: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            isDecimal: true,
        },
    },
}
