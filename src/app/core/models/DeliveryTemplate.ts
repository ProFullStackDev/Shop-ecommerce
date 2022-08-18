/**
 * File Name  : DeliveryTemplate.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface DeliveryTemplateAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  background?: string;
  content: string;
  height: number;
  isDefault: boolean;
  memo?: string;
  name: string;
  offsetX: number;
  offsetY: number;
  width: number;
  storeId: number;
}

export type DeliveryTemplatePk = "id";
export type DeliveryTemplateId = DeliveryTemplate[DeliveryTemplatePk];
export type DeliveryTemplateOptionalAttributes = "background" | "memo";
export type DeliveryTemplateCreationAttributes = Optional<DeliveryTemplateAttributes, DeliveryTemplateOptionalAttributes>;

export class DeliveryTemplate extends Model<DeliveryTemplateAttributes, DeliveryTemplateCreationAttributes> implements DeliveryTemplateAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  background?: string;
  content!: string;
  height!: number;
  isDefault!: boolean;
  memo?: string;
  name!: string;
  offsetX!: number;
  offsetY!: number;
  width!: number;
  storeId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof DeliveryTemplate {
    return DeliveryTemplate.init({
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
    background: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    offsetX: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    offsetY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id'
      },
      field: 'store_id'
    }
  }, {
    sequelize,
    tableName: 'DeliveryTemplate',
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
        name: "ind_DeliveryTemplate_store_id",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
    ]
  });
  }
}
