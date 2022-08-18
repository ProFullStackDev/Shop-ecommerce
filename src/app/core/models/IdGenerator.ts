/**
 * File Name  : IdGenerator.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface IdGeneratorAttributes {
  sequenceName: string;
  nextVal?: number;
}

export type IdGeneratorPk = "sequenceName";
export type IdGeneratorId = IdGenerator[IdGeneratorPk];
export type IdGeneratorOptionalAttributes = "nextVal";
export type IdGeneratorCreationAttributes = Optional<IdGeneratorAttributes, IdGeneratorOptionalAttributes>;

export class IdGenerator extends Model<IdGeneratorAttributes, IdGeneratorCreationAttributes> implements IdGeneratorAttributes {
  sequenceName!: string;
  nextVal?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof IdGenerator {
    return IdGenerator.init({
    sequenceName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'sequence_name'
    },
    nextVal: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'next_val'
    }
  }, {
    sequelize,
    tableName: 'IdGenerator',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sequence_name" },
        ]
      },
    ]
  });
  }
}
