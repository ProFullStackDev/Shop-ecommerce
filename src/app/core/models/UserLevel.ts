/**
 * File Name  : user_level.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserLevelAttributes {
  level: number;
  name: string;
  introduction: string;
  needPeople: number;
  rewardMaxPeople: number;
  rewardPercent: number;
}

export type UserLevelPk = "level";
export type UserLevelId = UserLevel[UserLevelPk];
export type UserLevelCreationAttributes = UserLevelAttributes;

export class UserLevel extends Model<UserLevelAttributes, UserLevelCreationAttributes> implements UserLevelAttributes {
  level!: number;
  name!: string;
  introduction!: string;
  needPeople!: number;
  rewardMaxPeople!: number;
  rewardPercent!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserLevel {
    return UserLevel.init({
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "等级"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "等级名"
    },
    introduction: {
      type: DataTypes.STRING(500),
      allowNull: false,
      comment: "简介"
    },
    needPeople: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "升级需要人数",
      field: 'need_people'
    },
    rewardMaxPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "可奖励人数",
      field: 'reward_max_people'
    },
    rewardPercent: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "奖励百分比",
      field: 'reward_percent'
    }
  }, {
    sequelize,
    tableName: 'user_level',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "level" },
        ]
      },
    ]
  });
  }
}
