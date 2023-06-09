interface ICar {
  num: string;
  model: string;
}

export interface IDriver {
  username: string;
  car: ICar;
}
