/**
 * File Name  : PaymentMethod.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PaymentMethodAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  content?: string;
  description?: string;
  icon?: string;
  isDefault: boolean;
  method: number;
  name: string;
  timeout?: number;
  type: number;
}

export type PaymentMethodPk = "id";
export type PaymentMethodId = PaymentMethod[PaymentMethodPk];
export type PaymentMethodOptionalAttributes = "orders" | "content" | "description" | "icon" | "timeout";
export type PaymentMethodCreationAttributes = Optional<PaymentMethodAttributes, PaymentMethodOptionalAttributes>;

export class PaymentMethod extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes> implements PaymentMethodAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  content?: string;
  description?: string;
  icon?: string;
  isDefault!: boolean;
  method!: number;
  name!: string;
  timeout?: number;
  type!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PaymentMethod {
    return PaymentMethod.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    timeout: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PaymentMethod',
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
