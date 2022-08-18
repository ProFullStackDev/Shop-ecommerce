/**
 * File Name  : Ad.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  beginDate?: Date;
  content?: string;
  endDate?: Date;
  path?: string;
  position: number;
  title: string;
  type: number;
  url?: string;
  adPositionId?: number;
}

export type AdPk = "id";
export type AdId = Ad[AdPk];
export type AdOptionalAttributes = "orders" | "beginDate" | "content" | "endDate" | "path" | "url" | "adPositionId";
export type AdCreationAttributes = Optional<AdAttributes, AdOptionalAttributes>;

export class Ad extends Model<AdAttributes, AdCreationAttributes> implements AdAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  beginDate?: Date;
  content?: string;
  endDate?: Date;
  path?: string;
  position!: number;
  title!: string;
  type!: number;
  url?: string;
  adPositionId?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Ad {
    return Ad.init({
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
    beginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    adPositionId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'AdPosition',
        key: 'id'
      },
      field: 'adPosition_id'
    }
  }, {
    sequelize,
    tableName: 'Ad',
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
        name: "ind_Ad_adPosition_id",
        using: "BTREE",
        fields: [
          { name: "adPosition_id" },
        ]
      },
    ]
  });
  }
}
