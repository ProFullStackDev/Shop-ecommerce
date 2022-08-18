/**
 * File Name  : ShippingMethod.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ShippingMethodAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  description?: string;
  icon?: string;
  isDefault: boolean;
  name: string;
  defaultDeliveryCorpId?: number;
}

export type ShippingMethodPk = "id";
export type ShippingMethodId = ShippingMethod[ShippingMethodPk];
export type ShippingMethodOptionalAttributes = "orders" | "description" | "icon" | "defaultDeliveryCorpId";
export type ShippingMethodCreationAttributes = Optional<ShippingMethodAttributes, ShippingMethodOptionalAttributes>;

export class ShippingMethod extends Model<ShippingMethodAttributes, ShippingMethodCreationAttributes> implements ShippingMethodAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  description?: string;
  icon?: string;
  isDefault!: boolean;
  name!: string;
  defaultDeliveryCorpId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof ShippingMethod {
    return ShippingMethod.init({
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    defaultDeliveryCorpId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'DeliveryCorp',
        key: 'id'
      },
      field: 'defaultDeliveryCorp_id'
    }
  }, {
    sequelize,
    tableName: 'ShippingMethod',
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
        name: "ind_ShippingMethod_defaultDeliveryCorp_id",
        using: "BTREE",
        fields: [
          { name: "defaultDeliveryCorp_id" },
        ]
      },
    ]
  });
  }
}
