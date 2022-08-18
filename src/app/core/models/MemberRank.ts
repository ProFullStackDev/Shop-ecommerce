/**
 * File Name  : MemberRank.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface MemberRankAttributes {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  amount?: number;
  isDefault: boolean;
  isSpecial: boolean;
  name: string;
  scale: number;
}

export type MemberRankPk = "id";
export type MemberRankId = MemberRank[MemberRankPk];
export type MemberRankOptionalAttributes = "amount";
export type MemberRankCreationAttributes = Optional<MemberRankAttributes, MemberRankOptionalAttributes>;

export class MemberRank extends Model<MemberRankAttributes, MemberRankCreationAttributes> implements MemberRankAttributes {
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  amount?: number;
  isDefault!: boolean;
  isSpecial!: boolean;
  name!: string;
  scale!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof MemberRank {
    return MemberRank.init({
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
    amount: {
      type: DataTypes.DECIMAL(21,6),
      allowNull: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isSpecial: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    scale: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MemberRank',
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
