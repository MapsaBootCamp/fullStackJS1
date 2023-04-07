class A {
  request(URL: string): void {
    console.log(`request to ${URL}`);
  }
}

class B extends A {
  request(URL: string): void {
    console.log(`v2`);
  }
}

class ClientX {
  constructor(ins: A) {}
}

new ClientX(new B());
