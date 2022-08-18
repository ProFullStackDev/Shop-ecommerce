/**
 * File Name  : user_nft.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UserNftAttributes {
  userId: number;
  nftLevel: number;
  num: number;
}

export type UserNftPk = "userId" | "nftLevel";
export type UserNftId = UserNft[UserNftPk];
export type UserNftCreationAttributes = UserNftAttributes;

export class UserNft extends Model<UserNftAttributes, UserNftCreationAttributes> implements UserNftAttributes {
  userId!: number;
  nftLevel!: number;
  num!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserNft {
    return UserNft.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "用户id",
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    },
    nftLevel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "nft id",
      references: {
        model: 'nft',
        key: 'level'
      },
      field: 'nft_level'
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "nft数量"
    }
  }, {
    sequelize,
    tableName: 'user_nft',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "nft_level" },
        ]
      },
      {
        name: "user_nft_FK_1",
        using: "BTREE",
        fields: [
          { name: "nft_level" },
        ]
      },
    ]
  });
  }
}
