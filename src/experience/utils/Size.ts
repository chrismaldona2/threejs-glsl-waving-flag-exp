import EventEmitter from "./EventEmitter";

class Size extends EventEmitter {
  width: number;
  height: number;
  pixelRatio: number;
  private resizeHandler: () => void;

  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(2, devicePixelRatio);

    this.resizeHandler = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(2, devicePixelRatio);
      this.trigger("resize");
    };

    window.addEventListener("resize", this.resizeHandler);
  }

  dispose() {
    window.removeEventListener("resize", this.resizeHandler);
    this.off("resize");
  }
}

export default Size;
