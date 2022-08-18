/**
 * File Name  : blockchain_scan_height.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface BlockchainScanHeightAttributes {
  type: number;
  addr: string;
  currScanHeight: number;
}

export type BlockchainScanHeightPk = "type";
export type BlockchainScanHeightId = BlockchainScanHeight[BlockchainScanHeightPk];
export type BlockchainScanHeightCreationAttributes = BlockchainScanHeightAttributes;

export class BlockchainScanHeight extends Model<BlockchainScanHeightAttributes, BlockchainScanHeightCreationAttributes> implements BlockchainScanHeightAttributes {
  type!: number;
  addr!: string;
  currScanHeight!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof BlockchainScanHeight {
    return BlockchainScanHeight.init({
    type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "类型"
    },
    addr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "合约地址"
    },
    currScanHeight: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment: "扫描高度",
      field: 'curr_scan_height'
    }
  }, {
    sequelize,
    tableName: 'blockchain_scan_height',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
  }
}
