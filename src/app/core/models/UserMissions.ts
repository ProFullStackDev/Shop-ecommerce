/**
 * File Name  : user_missions.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserMissionsAttributes {
  userId: number;
  missionsId: number;
  createDate: Date;
  status: number;
  finishDate?: Date;
  currentProgress?: number;
  totalProgress?: number;
}

export type UserMissionsPk = "userId" | "missionsId";
export type UserMissionsId = UserMissions[UserMissionsPk];
export type UserMissionsOptionalAttributes = "createDate" | "finishDate" | "currentProgress" | "totalProgress";
export type UserMissionsCreationAttributes = Optional<UserMissionsAttributes, UserMissionsOptionalAttributes>;

export class UserMissions extends Model<UserMissionsAttributes, UserMissionsCreationAttributes> implements UserMissionsAttributes {
  userId!: number;
  missionsId!: number;
  createDate!: Date;
  status!: number;
  finishDate?: Date;
  currentProgress?: number;
  totalProgress?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserMissions {
    return UserMissions.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "用户id",
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    },
    missionsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "任务id",
      references: {
        model: 'missions',
        key: 'id'
      },
      field: 'missions_id'
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间",
      field: 'create_date'
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "状态"
    },
    finishDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "完成日期",
      field: 'finish_date'
    },
    currentProgress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "当前进度",
      field: 'current_progress'
    },
    totalProgress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "总进度",
      field: 'total_progress'
    }
  }, {
    sequelize,
    tableName: 'user_missions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "missions_id" },
        ]
      },
      {
        name: "user_missions_FK_1",
        using: "BTREE",
        fields: [
          { name: "missions_id" },
        ]
      },
    ]
  });
  }
}
