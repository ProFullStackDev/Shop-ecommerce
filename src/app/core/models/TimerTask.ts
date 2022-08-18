/**
 * File Name  : TimerTask.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface TimerTaskAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  cronExpression: string;
  description?: string;
  jobClassName: string;
  jobName: string;
  triggerName: string;
}

export type TimerTaskPk = "id";
export type TimerTaskId = TimerTask[TimerTaskPk];
export type TimerTaskOptionalAttributes = "description";
export type TimerTaskCreationAttributes = Optional<TimerTaskAttributes, TimerTaskOptionalAttributes>;

export class TimerTask extends Model<TimerTaskAttributes, TimerTaskCreationAttributes> implements TimerTaskAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  cronExpression!: string;
  description?: string;
  jobClassName!: string;
  jobName!: string;
  triggerName!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof TimerTask {
    return TimerTask.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    cronExpression: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jobClassName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    jobName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    triggerName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TimerTask',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
