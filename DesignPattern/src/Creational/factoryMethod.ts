abstract class Logistic {
  private transporter: Transport;

  constructor() {
    this.transporter = this.createTranspoter();
  }

  deliveryPlan(): void {
    console.log("amaliat pish ersal kala");
  }

  ersalKala(): void {
    console.log(this.transporter.doStuff());
  }

  abstract createTranspoter(): Transport;
}

class SeaLogistic extends Logistic {
  createTranspoter(): Transport {
    return new Ship();
  }
}

class TruckLogistic extends Logistic {
  createTranspoter(): Transport {
    return new Truck();
  }
}

class AirLositic extends Logistic {
  createTranspoter(): Transport {
    return new Airplan();
  }
}

interface Transport {
  doStuff(): string;
}

class Truck implements Transport {
  doStuff(): string {
    return "ersal ba kamiun";
  }
}
class Ship implements Transport {
  doStuff(): string {
    return "ersal ba keshti";
  }
}

class Airplan implements Transport {
  doStuff(): string {
    return "ersal ba havapeima";
  }
}

console.log("Ersal Zamini");
const ersalZamini = new TruckLogistic();
ersalZamini.deliveryPlan();
ersalZamini.ersalKala();

console.log("--------------------------------");

console.log("Ersal Daryai");
const ersalDaryai = new SeaLogistic();
ersalDaryai.deliveryPlan();
ersalDaryai.ersalKala();
