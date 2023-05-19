import { Inject, Injectable } from '@nestjs/common';
import * as dotEnv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_APP } from './constant';
import { EnvConfig } from './interfaces/env-option.interface';
import { IConfigOption } from './interfaces/option.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_APP) configOptions: IConfigOption) {
    const fileName = configOptions['fileName'];
    const filePath = path.resolve(__dirname, '../../', fileName);
    this.envConfig = dotEnv.parse(fs.readFileSync(filePath));
  }

  get(keyName: string): string {
    return this.envConfig[keyName];
  }
}
