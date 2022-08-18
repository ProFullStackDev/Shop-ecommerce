/**
 * File Name  : Navigation.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NavigationAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  orders?: number;
  image?: string;
  isBlankTarget: boolean;
  name: string;
  url: string;
  navigationGroupId: number;
}

export type NavigationPk = "id";
export type NavigationId = Navigation[NavigationPk];
export type NavigationOptionalAttributes = "orders" | "image";
export type NavigationCreationAttributes = Optional<NavigationAttributes, NavigationOptionalAttributes>;

export class Navigation extends Model<NavigationAttributes, NavigationCreationAttributes> implements NavigationAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  orders?: number;
  image?: string;
  isBlankTarget!: boolean;
  name!: string;
  url!: string;
  navigationGroupId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Navigation {
    return Navigation.init({
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
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isBlankTarget: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    navigationGroupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'NavigationGroup',
        key: 'id'
      },
      field: 'navigationGroup_id'
    }
  }, {
    sequelize,
    tableName: 'Navigation',
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
        name: "ind_Navigation_navigationGroup_id",
        using: "BTREE",
        fields: [
          { name: "navigationGroup_id" },
        ]
      },
    ]
  });
  }
}
