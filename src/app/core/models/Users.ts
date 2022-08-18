/**
 * File Name  : Users.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  dtype: string;
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  version: number;
  isEnabled: boolean;
  isLocked: boolean;
  lastLoginDate?: Date;
  lastLoginIp?: string;
  lockDate?: Date;
  department?: string;
  email?: string;
  encodedPassword: string;
  mobileArea?: string;
  mobile?: string;
  name?: string;
  username: string;
  attributeValue0?: string;
  attributeValue1?: string;
  attributeValue10?: string;
  attributeValue11?: string;
  attributeValue12?: string;
  attributeValue13?: string;
  attributeValue14?: string;
  attributeValue15?: string;
  attributeValue16?: string;
  attributeValue17?: string;
  attributeValue18?: string;
  attributeValue19?: string;
  attributeValue2?: string;
  attributeValue3?: string;
  attributeValue4?: string;
  attributeValue5?: string;
  attributeValue6?: string;
  attributeValue7?: string;
  attributeValue8?: string;
  attributeValue9?: string;
  balance?: number;
  bankAccount?: string;
  bankName?: string;
  frozenAmount?: number;
  idCard?: string;
  idCardImage?: string;
  identificationNumber?: string;
  legalPerson?: string;
  licenseImage?: string;
  licenseNumber?: string;
  organizationCode?: string;
  organizationImage?: string;
  phone?: string;
  safeKeyExpire?: Date;
  safeKeyValue?: string;
  taxImage?: string;
  accumulativeCheckinDays?: number;
  address?: string;
  amount?: number;
  avatar?: string;
  birth?: Date;
  continuousCheckinDays?: number;
  distributionCommissionAmount?: number;
  gender?: number;
  point?: number;
  zipCode?: string;
  areaId?: number;
  memberRankId?: number;
  tcoinBalance: number;
  userLevel: number;
  pid?: number;
  orgTreePath: string;
  vipExprTime: Date;
  recommendPeople: number;
  networkSize: number;
  earningFrom: number;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "lastLoginDate" | "lastLoginIp" | "lockDate" | "department" | "email" | "mobileArea" | "mobile" | "name" | "attributeValue0" | "attributeValue1" | "attributeValue10" | "attributeValue11" | "attributeValue12" | "attributeValue13" | "attributeValue14" | "attributeValue15" | "attributeValue16" | "attributeValue17" | "attributeValue18" | "attributeValue19" | "attributeValue2" | "attributeValue3" | "attributeValue4" | "attributeValue5" | "attributeValue6" | "attributeValue7" | "attributeValue8" | "attributeValue9" | "balance" | "bankAccount" | "bankName" | "frozenAmount" | "idCard" | "idCardImage" | "identificationNumber" | "legalPerson" | "licenseImage" | "licenseNumber" | "organizationCode" | "organizationImage" | "phone" | "safeKeyExpire" | "safeKeyValue" | "taxImage" | "accumulativeCheckinDays" | "address" | "amount" | "avatar" | "birth" | "continuousCheckinDays" | "distributionCommissionAmount" | "gender" | "point" | "zipCode" | "areaId" | "memberRankId" | "tcoinBalance" | "userLevel" | "pid" | "vipExprTime" | "recommendPeople";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  dtype!: string;
  id!: number;
  createdDate!: Date;
  lastModifiedDate!: Date;
  version!: number;
  isEnabled!: boolean;
  isLocked!: boolean;
  lastLoginDate?: Date;
  lastLoginIp?: string;
  lockDate?: Date;
  department?: string;
  email?: string;
  encodedPassword!: string;
  mobileArea?: string;
  mobile?: string;
  name?: string;
  username!: string;
  attributeValue0?: string;
  attributeValue1?: string;
  attributeValue10?: string;
  attributeValue11?: string;
  attributeValue12?: string;
  attributeValue13?: string;
  attributeValue14?: string;
  attributeValue15?: string;
  attributeValue16?: string;
  attributeValue17?: string;
  attributeValue18?: string;
  attributeValue19?: string;
  attributeValue2?: string;
  attributeValue3?: string;
  attributeValue4?: string;
  attributeValue5?: string;
  attributeValue6?: string;
  attributeValue7?: string;
  attributeValue8?: string;
  attributeValue9?: string;
  balance?: number;
  bankAccount?: string;
  bankName?: string;
  frozenAmount?: number;
  idCard?: string;
  idCardImage?: string;
  identificationNumber?: string;
  legalPerson?: string;
  licenseImage?: string;
  licenseNumber?: string;
  organizationCode?: string;
  organizationImage?: string;
  phone?: string;
  safeKeyExpire?: Date;
  safeKeyValue?: string;
  taxImage?: string;
  accumulativeCheckinDays?: number;
  address?: string;
  amount?: number;
  avatar?: string;
  birth?: Date;
  continuousCheckinDays?: number;
  distributionCommissionAmount?: number;
  gender?: number;
  point?: number;
  zipCode?: string;
  areaId?: number;
  memberRankId?: number;
  tcoinBalance!: number;
  userLevel!: number;
  pid?: number;
  orgTreePath!: string;
  vipExprTime!: Date;
  vipLevel: number;
  recommendPeople!: number;
  networkSize!: number;
  earningFrom!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    dtype: {
      type: DataTypes.STRING(31),
      allowNull: false,
      unique: "UKt3bl114953i5jey88j9rk472n"
    },
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
    isEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLoginIp: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lockDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "users_email_unique"
    },
    encodedPassword: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobileArea: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "+86",
      comment: "手机区号",
      field: 'mobile_area'
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_useranme_unique"
    },
    attributeValue0: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue10: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue11: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue12: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue13: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue14: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue15: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue16: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue17: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue18: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue19: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue5: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue6: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue7: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue8: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attributeValue9: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL(27,12),
      allowNull: true
    },
    bankAccount: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    frozenAmount: {
      type: DataTypes.DECIMAL(27,12),
      allowNull: true
    },
    idCard: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idCardImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    identificationNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    legalPerson: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    licenseImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    licenseNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    organizationCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    organizationImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    safeKeyExpire: {
      type: DataTypes.DATE,
      allowNull: true
    },
    safeKeyValue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    taxImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    accumulativeCheckinDays: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(27,12),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    continuousCheckinDays: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    distributionCommissionAmount: {
      type: DataTypes.DECIMAL(27,12),
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    point: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    areaId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Area',
        key: 'id'
      },
      field: 'area_id'
    },
    memberRankId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'MemberRank',
        key: 'id'
      },
      field: 'memberRank_id'
    },
    tcoinBalance: {
      type: DataTypes.DECIMAL(36,18),
      allowNull: false,
      defaultValue: 0.000000000000000000,
      comment: "钛币余额",
      field: 'tcoin_balance'
    },
    userLevel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "会员等级id",
      references: {
        model: 'user_level',
        key: 'level'
      },
      field: 'user_level'
    },
    pid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "上级id"
    },
    orgTreePath: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "层级树(结构:上级树,自身id)",
      field: 'org_tree_path'
    },
    vipExprTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "会员到期时间,时间戳",
      field: 'vip_expr_time'
    },
    recommendPeople: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "已推荐人数",
      field: 'recommend_people'
    },
      networkSize: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "已推荐人数",
        field: 'recommend_people'
      },
      earningFrom: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "已推荐人数",
        field: 'recommend_people'
      },
  }, {
    sequelize,
    tableName: 'Users',
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
        name: "users_useranme_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "UKt3bl114953i5jey88j9rk472n",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dtype" },
          { name: "username" },
        ]
      },
      {
        name: "Users_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mobile_area" },
          { name: "mobile" },
        ]
      },
      {
        name: "users_email_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "UKl56lqbv4x1gvdnndc2nqf2avk",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dtype" },
          { name: "email" },
        ]
      },
      {
        name: "UKqpu4yj8l7krasno34gscyci77",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dtype" },
          { name: "mobile" },
        ]
      },
      {
        name: "ind_Users_area_id",
        using: "BTREE",
        fields: [
          { name: "area_id" },
        ]
      },
      {
        name: "ind_Users_memberRank_id",
        using: "BTREE",
        fields: [
          { name: "memberRank_id" },
        ]
      },
      {
        name: "Users_FK",
        using: "BTREE",
        fields: [
          { name: "user_level" },
        ]
      },
      {
        name: "Users_pid_index",
        using: "BTREE",
        fields: [
          { name: "pid" },
        ]
      },
    ]
  });
  }
}
