/**
 * File Name  : nft.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { BuildingType } from '@shared/models/nft-shop-modal.model';

export interface NftAttributes {
  // level: BuildingType;
  level: number | string;
  name: string;
  price: number;
  mergeNeedNum: number;
  mergeFee: number;
  icon: string;
  rewardPercent: number;
}

export type NftPk = 'level';
export type NftId = Nft[NftPk];
export type NftCreationAttributes = NftAttributes;

export class Nft extends Model<NftAttributes, NftCreationAttributes> implements NftAttributes {
  level!: number;
  name!: string;
  price!: number;
  mergeNeedNum!: number;
  mergeFee!: number;
  icon!: string;
  rewardPercent!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Nft {
    return Nft.init(
      {
        level: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          comment: 'nft等级'
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: 'nft名'
        },
        price: {
          type: DataTypes.DECIMAL(36, 18),
          allowNull: false,
          comment: '价格'
        },
        mergeNeedNum: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: '合并所需数量',
          field: 'merge_need_num'
        },
        mergeFee: {
          type: DataTypes.DECIMAL(36, 18),
          allowNull: false,
          comment: '合并手续费',
          field: 'merge_fee'
        },
        icon: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: 'nft图标'
        },
        rewardPercent: {
          type: DataTypes.DECIMAL(36, 18),
          allowNull: false,
          comment: '奖励百分比',
          field: 'reward_percent'
        }
      },
      {
        sequelize,
        tableName: 'nft',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'level' }]
          }
        ]
      }
    );
  }
}
