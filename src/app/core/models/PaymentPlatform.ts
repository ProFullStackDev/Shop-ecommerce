/**
 * File Name  : payment_platform.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PaymentPlatformAttributes {
  id: number;
  createDate: Date;
  updateDate: Date;
  name: string;
  platformCode: string;
  icon: string;
  isEnabled: number;
  parameter: object;
  orders: number;
}

export type PaymentPlatformPk = "id";
export type PaymentPlatformId = PaymentPlatform[PaymentPlatformPk];
export type PaymentPlatformOptionalAttributes = "createDate" | "updateDate";
export type PaymentPlatformCreationAttributes = Optional<PaymentPlatformAttributes, PaymentPlatformOptionalAttributes>;

export class PaymentPlatform extends Model<PaymentPlatformAttributes, PaymentPlatformCreationAttributes> implements PaymentPlatformAttributes {
  id!: number;
  createDate!: Date;
  updateDate!: Date;
  name!: string;
  platformCode!: string;
  icon!: string;
  isEnabled!: number;
  parameter!: object;
  orders!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PaymentPlatform {
    return PaymentPlatform.init({
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
    updateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间",
      field: 'update_date'
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "名称"
    },
    platformCode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "平台编号",
      field: 'platform_code'
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "图标"
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "是否启用",
      field: 'is_enabled'
    },
    parameter: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "参数"
    },
    orders: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "排序"
    }
  }, {
    sequelize,
    tableName: 'payment_platform',
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
