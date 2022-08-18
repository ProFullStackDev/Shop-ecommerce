/**
 * File Name  : Receiver.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ReceiverAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  address: string;
  areaName: string;
  consignee: string;
  isDefault: boolean;
  phone: string;
  zipCode: string;
  areaId: number;
  memberId: number;
}

export type ReceiverPk = "id";
export type ReceiverId = Receiver[ReceiverPk];
export type ReceiverCreationAttributes = ReceiverAttributes;

export class Receiver extends Model<ReceiverAttributes, ReceiverCreationAttributes> implements ReceiverAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  address!: string;
  areaName!: string;
  consignee!: string;
  isDefault!: boolean;
  phone!: string;
  zipCode!: string;
  areaId!: number;
  memberId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Receiver {
    return Receiver.init({
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
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'member_id'
    }
  }, {
    sequelize,
    tableName: 'Receiver',
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
        name: "ind_Receiver_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
      {
        name: "ind_Receiver_member_id",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
    ]
  });
  }
}
