interface Internet {
  connect(addressIP: string): boolean;
}

class RealInternet implements Internet {
  connect(addressIP: string): boolean {
    console.log(`you connected to ${addressIP}`);
    return true;
  }
}

class InternetProxy implements Internet {
  private blockedList: string[];
  private realInternet: Internet;
  constructor(realInternet: Internet, bl: string[] = []) {
    this.blockedList = bl;
    this.realInternet = realInternet;
  }

  addToBlocked(url: string) {
    this.blockedList.push(url);
  }

  checkAddress(addressIP: string): boolean {
    return !this.blockedList.includes(addressIP);
  }

  connect(addressIP: string): boolean {
    if (this.checkAddress(addressIP)) {
      return this.realInternet.connect(addressIP);
    }
    console.log(`${addressIP} is blocked`);
    return false;
  }
}

const internetInstance = new InternetProxy(new RealInternet());
internetInstance.addToBlocked("iran");
internetInstance.addToBlocked("cuba");
internetInstance.addToBlocked("china");
console.log(internetInstance.connect("iran"));
console.log(internetInstance.connect("germany"));
