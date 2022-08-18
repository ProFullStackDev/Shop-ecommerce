/**
 * File Name  : DeliveryCenter.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DeliveryCenterAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address: string;
  areaName: string;
  contact: string;
  isDefault: boolean;
  memo?: string;
  mobile?: string;
  name: string;
  phone?: string;
  zipCode?: string;
  areaId?: number;
  storeId?: number;
}

export type DeliveryCenterPk = "id";
export type DeliveryCenterId = DeliveryCenter[DeliveryCenterPk];
export type DeliveryCenterOptionalAttributes = "memo" | "mobile" | "phone" | "zipCode" | "areaId" | "storeId";
export type DeliveryCenterCreationAttributes = Optional<DeliveryCenterAttributes, DeliveryCenterOptionalAttributes>;

export class DeliveryCenter extends Model<DeliveryCenterAttributes, DeliveryCenterCreationAttributes> implements DeliveryCenterAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address!: string;
  areaName!: string;
  contact!: string;
  isDefault!: boolean;
  memo?: string;
  mobile?: string;
  name!: string;
  phone?: string;
  zipCode?: string;
  areaId?: number;
  storeId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof DeliveryCenter {
    return DeliveryCenter.init({
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    areaName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'DeliveryCenter',
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
        name: "ind_DeliveryCenter_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
      {
        name: "ind_DeliveryCenter_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
