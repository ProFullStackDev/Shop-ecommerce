/**
 * File Name  : payment_order.ts
 * Authors    : xuboyue
 * Created    : 2022/05/31 10:15:19
 * Copyright  : Copyright © 2022 TongJun Info, Inc. All rights reserved.
 */
import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PaymentOrderAttributes {
  id: number;
  createDate: Date;
  updateDate: Date;
  platformCode: string;
  platformName: string;
  bizPayNo: string;
  noticeValidate?: string;
  amount: number;
  currency: string;
  status: number;
  businessType: number;
  businessId: number;
  userId: number;
  paymentUrl: string;
  expiredTime: number;
}

export type PaymentOrderPk = "id";
export type PaymentOrderId = PaymentOrder[PaymentOrderPk];
export type PaymentOrderOptionalAttributes = "createDate" | "updateDate" | "noticeValidate";
export type PaymentOrderCreationAttributes = Optional<PaymentOrderAttributes, PaymentOrderOptionalAttributes>;

export class PaymentOrder extends Model<PaymentOrderAttributes, PaymentOrderCreationAttributes> implements PaymentOrderAttributes {
  id!: number;
  createDate!: Date;
  updateDate!: Date;
  platformCode!: string;
  platformName!: string;
  bizPayNo!: string;
  noticeValidate?: string;
  amount!: number;
  currency!: string;
  status!: number;
  businessType!: number;
  businessId!: number;
  userId!: number;
  paymentUrl!: string;
  expiredTime!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof PaymentOrder {
    return PaymentOrder.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间",
      field: 'create_date'
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间",
      field: 'update_date'
    },
    platformCode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "支付平台",
      field: 'platform_code'
    },
    platformName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "支付平台名称",
      field: 'platform_name'
    },
    bizPayNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "交易id",
      field: 'biz_pay_no'
    },
    noticeValidate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "通知验证",
      field: 'notice_validate'
    },
    amount: {
      type: DataTypes.DECIMAL(20,6),
      allowNull: false,
      comment: "金额"
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      comment: "货币-ISO 4217"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "状态 - 0:等待中;1:完成;2:失败;3:退款"
    },
    businessType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "业务类型 - 1:订单支付;2:余额充值",
      field: 'business_type'
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "业务id- 根据对应的业务类型填写id字段 （订单支付: Orders id；余额充值: member_recharge_log\n id）",
      field: 'business_id'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户id",
      field: 'user_id'
    },
    paymentUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "支付页面url",
      field: 'payment_url'
    },
    expiredTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "超时时间-时间戳（秒）",
      field: 'expired_time'
    }
  }, {
    sequelize,
    tableName: 'payment_order',
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
