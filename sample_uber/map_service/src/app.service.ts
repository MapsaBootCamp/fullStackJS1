import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBillDistance(data: any){
    console.log(data);
    return data
    
  }
}
