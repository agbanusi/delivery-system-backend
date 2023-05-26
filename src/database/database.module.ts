import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import * as Knex from 'knex';
import { Model } from 'objection';

import * as knexConfig from './knex';
import { UserModel } from './models/user.model';
import { LogModel } from './models/log.model';
import { OrderTotalAmountHistoryModel } from './models/order-total-amount-history';
import { CalculatedOrderModel } from './models/calculated-order.model';
import { OrderTypeModel } from './models/order-type.model';
import { OrderModel } from './models/order.model';

const models = [
  UserModel,
  LogModel,
  OrderTotalAmountHistoryModel,
  CalculatedOrderModel,
  OrderTypeModel,
  OrderModel,
];

const modelProvider = map(models, model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProvider,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = await Knex(knexConfig);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
