import { Injectable } from '@nestjs/common';
import { IDriver } from './interfaces/deriver.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AppService {
  private readonly users: IUser[] = [
    {
      username: 'Ashkan',
    },
    {
      username: 'Asghar',
    },
  ];
  private readonly drivers: IDriver[] = [
    {
      username: 'Mammad',
      car: {
        num: '1234',
        model: 'pride',
      },
    },
    {
      username: 'Ali',
      car: {
        num: '4321',
        model: 'peguet',
      },
    },
  ];

  getDriverList() {
    console.log('Salam');
    return this.drivers;
  }
}
