/**
 * File Name  : Promotion_MemberRank.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PromotionMemberRankAttributes {
  promotionsId: number;
  memberRanksId: number;
}

export type PromotionMemberRankPk = "promotionsId" | "memberRanksId";
export type PromotionMemberRankId = PromotionMemberRank[PromotionMemberRankPk];
export type PromotionMemberRankCreationAttributes = PromotionMemberRankAttributes;

export class PromotionMemberRank extends Model<PromotionMemberRankAttributes, PromotionMemberRankCreationAttributes> implements PromotionMemberRankAttributes {
  promotionsId!: number;
  memberRanksId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PromotionMemberRank {
    return PromotionMemberRank.init({
    promotionsId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Promotion',
        key: 'id'
      },
      field: 'promotions_id'
    },
    memberRanksId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'MemberRank',
        key: 'id'
      },
      field: 'memberRanks_id'
    }
  }, {
    sequelize,
    tableName: 'Promotion_MemberRank',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "promotions_id" },
          { name: "memberRanks_id" },
        ]
      },
      {
        name: "ind_Promotion_MemberRank_memberRanks_id",
        using: "BTREE",
        fields: [
          { name: "memberRanks_id" },
        ]
      },
    ]
  });
  }
}
