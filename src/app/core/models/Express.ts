/**
 * File Name  : Express.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ExpressAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  expressNum: string;
  deliveryCode?: string;
  deliveryName: string;
  traces?: string;
  status?: number;
  scmOrderItemId?: string;
}

export type ExpressPk = "id";
export type ExpressId = Express[ExpressPk];
export type ExpressOptionalAttributes = "createdDate" | "lastModifiedDate" | "version" | "deliveryCode" | "traces" | "status" | "scmOrderItemId";
export type ExpressCreationAttributes = Optional<ExpressAttributes, ExpressOptionalAttributes>;

export class Express extends Model<ExpressAttributes, ExpressCreationAttributes> implements ExpressAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  expressNum!: string;
  deliveryCode?: string;
  deliveryName!: string;
  traces?: string;
  status?: number;
  scmOrderItemId?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Express {
    return Express.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "物流信息ID"
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: "版本号"
    },
    expressNum: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "运单号",
      unique: "expressNum"
    },
    deliveryCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "物流公司编号"
    },
    deliveryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "物流公司名称"
    },
    traces: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "物流轨迹"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "物流状态：0:暂无轨迹信息 1:已揽收 2:在途中 3:签收 4:问题件"
    },
    scmOrderItemId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'OrderShippingItem',
        key: 'scm_order_item_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Express',
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
      {
        name: "expressNum",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "expressNum" },
        ]
      },
      {
        name: "express_n1",
        using: "BTREE",
        fields: [
          { name: "expressNum" },
        ]
      },
      {
        name: "express_n2",
        using: "BTREE",
        fields: [
          { name: "scmOrderItemId" },
        ]
      },
    ]
  });
  }
}
