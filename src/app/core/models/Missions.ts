/**
 * File Name  : missions.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MissionsAttributes {
  id: number;
  createDate: Date;
  name: string;
  icon: string;
  type: number;
  rewardPoint: number;
  config: string;
  remark: string;
  enable: number;
}

export type MissionsPk = "id";
export type MissionsId = Missions[MissionsPk];
export type MissionsOptionalAttributes = "createDate";
export type MissionsCreationAttributes = Optional<MissionsAttributes, MissionsOptionalAttributes>;

export class Missions extends Model<MissionsAttributes, MissionsCreationAttributes> implements MissionsAttributes {
  id!: number;
  createDate!: Date;
  name!: string;
  icon!: string;
  type!: number;
  rewardPoint!: number;
  config!: string;
  remark!: string;
  enable!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Missions {
    return Missions.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间",
      field: 'create_date'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "任务名"
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "图标"
    },
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "类型"
    },
    rewardPoint: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      comment: "积分奖励",
      field: 'reward_point'
    },
    config: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "配置项"
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "备注"
    },
    enable: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      comment: "是否可用"
    }
  }, {
    sequelize,
    tableName: 'missions',
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
