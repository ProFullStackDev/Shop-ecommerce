/**
 * File Name  : DeliveryCorp.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DeliveryCorpAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  code?: string;
  name: string;
  url?: string;
}

export type DeliveryCorpPk = "id";
export type DeliveryCorpId = DeliveryCorp[DeliveryCorpPk];
export type DeliveryCorpOptionalAttributes = "orders" | "code" | "url";
export type DeliveryCorpCreationAttributes = Optional<DeliveryCorpAttributes, DeliveryCorpOptionalAttributes>;

export class DeliveryCorp extends Model<DeliveryCorpAttributes, DeliveryCorpCreationAttributes> implements DeliveryCorpAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  code?: string;
  name!: string;
  url?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof DeliveryCorp {
    return DeliveryCorp.init({
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
    code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DeliveryCorp',
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
