/**
 * File Name  : AftersalesSetting.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AftersalesSettingAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  repairTips?: string;
  replacementTips?: string;
  returnsTips?: string;
  storeId: number;
}

export type AftersalesSettingPk = "id";
export type AftersalesSettingId = AftersalesSetting[AftersalesSettingPk];
export type AftersalesSettingOptionalAttributes = "repairTips" | "replacementTips" | "returnsTips";
export type AftersalesSettingCreationAttributes = Optional<AftersalesSettingAttributes, AftersalesSettingOptionalAttributes>;

export class AftersalesSetting extends Model<AftersalesSettingAttributes, AftersalesSettingCreationAttributes> implements AftersalesSettingAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  repairTips?: string;
  replacementTips?: string;
  returnsTips?: string;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof AftersalesSetting {
    return AftersalesSetting.init({
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
    repairTips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    replacementTips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    returnsTips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      unique: "FKwadahmhsqnri4y63m7t1f70y",
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'AftersalesSetting',
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
        name: "store_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "UK_t3ro1tihgepixoirc4qqjkrw2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
