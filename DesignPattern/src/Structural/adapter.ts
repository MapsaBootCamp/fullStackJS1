interface Target {
  request(): string;
}

class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): string {
    return this.adaptee.specificMethod();
  }
}

class Adaptee {
  specificMethod() {
    return "2shake irani be american";
  }
}

class AdapterClient {
  private target: Target;

  constructor(target: Target) {
    this.target = target;
  }

  etesal(): string {
    return this.target.request();
  }
}

const adapter = new Adapter(new Adaptee());
const client = new AdapterClient(adapter);
console.log(client.etesal());
