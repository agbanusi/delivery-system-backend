import { Injectable, Inject } from '@nestjs/common';
import { LogModel } from 'src/database/models/log.model';
import { ModelClass } from 'objection';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class LogsService {
  constructor(@Inject('LogModel') private modelClass: ModelClass<LogModel>) {}

  async findAll(): Promise<ResponseData> {
    const logs = await this.modelClass.query();
    return {
      success: true,
      message: 'Logs fetched successfully.',
      data: logs,
    };
  }

  // Create user before save encrypt password
  async create(payload) {
    const newLog = await this.modelClass.query().insert(payload);
    return {
      success: true,
      message: 'Log created successfully.',
      data: newLog,
    };
  }
}
