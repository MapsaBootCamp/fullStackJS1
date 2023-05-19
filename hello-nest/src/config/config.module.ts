import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_APP } from './constant';
import { IConfigOption } from './interfaces/option.interface';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(options?: IConfigOption): DynamicModule {
    console.log(options);

    options.isGlobal = options?.isGlobal ? options.isGlobal : false;
    options.fileName = options?.fileName ? options.fileName : '.env';

    return {
      global: true,
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_APP,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [
        ConfigService,
        {
          provide: CONFIG_APP,
          useValue: options,
        },
      ],
    };
  }
}
