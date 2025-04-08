import GUI from "lil-gui";

class Debug {
  gui: GUI;
  private keyDownHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.gui = new GUI({ title: "Tweaks" });

    this.keyDownHandler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        this.toggle();
      }
    };

    window.addEventListener("keydown", this.keyDownHandler);
  }

  toggle() {
    this.gui.show(this.gui._hidden);
  }

  destroy() {
    window.removeEventListener("keydown", this.keyDownHandler);
    this.gui.destroy();
  }
}

export default Debug;
