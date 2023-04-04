interface GUI {
  button(): Button;
  checkBox(): CheckBox;
}

class WindowsGUI implements GUI {
  public button(): Button {
    return new WinButton();
  }
  public checkBox(): CheckBox {
    return new WinCheckBox();
  }
}

class MacGUI implements GUI {
  public button(): Button {
    return new MacButton();
  }
  public checkBox(): CheckBox {
    return new MacCheckBox();
  }
}

abstract class Button {
  onClick(): void {
    console.log("clicked");
  }

  abstract theme(): string;
}

class WinButton extends Button {
  public theme(): string {
    return "win button theme";
  }
}
class MacButton extends Button {
  public theme(): string {
    return "mac button theme";
  }
}

abstract class CheckBox {
  getTick(): void {
    console.log("tick flag");
  }

  abstract tickFlag(): string;
}

class WinCheckBox extends CheckBox {
  public tickFlag(): string {
    return "win tick flag";
  }
}
class MacCheckBox extends CheckBox {
  public tickFlag(): string {
    return "mac tick flag";
  }
}

class Client {
  public button: Button;
  public checkBox: CheckBox;

  constructor(f: GUI) {
    this.button = f.button();
    this.checkBox = f.checkBox();
  }
}

console.log("WINDOWs UI");

const winClient = new Client(new WindowsGUI());
console.log(winClient.button.theme());
winClient.button.onClick();

console.log("MAC UI");
const macClient = new Client(new MacGUI());
console.log(macClient.button.theme());
macClient.button.onClick();
