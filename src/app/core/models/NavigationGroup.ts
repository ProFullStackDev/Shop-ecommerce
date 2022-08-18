/**
 * File Name  : NavigationGroup.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NavigationGroupAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  name: string;
}

export type NavigationGroupPk = "id";
export type NavigationGroupId = NavigationGroup[NavigationGroupPk];
export type NavigationGroupCreationAttributes = NavigationGroupAttributes;

export class NavigationGroup extends Model<NavigationGroupAttributes, NavigationGroupCreationAttributes> implements NavigationGroupAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  name!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof NavigationGroup {
    return NavigationGroup.init({
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'NavigationGroup',
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
