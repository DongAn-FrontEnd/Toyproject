import Backdrop from "./Backdrop.js.js";

export default function Modal(config) {
  const {
    $target,
    className = "modal",
    $content,
    shouldRender = true,
  } = config;
  this.$target = $target;
  this.className = className;

  this.createElement = () => {
    this.$el = document.createElement("div");
    this.$el.className = this.className;
    this.children = [
      new Backdrop({ $target: this.$el, className: "backdrop" }),
    ];
    this.children.forEach((child) => child.render());
  };

  this.mountComponent = () => {
    this.state = {
      show: false,
      $content: $content,
    };

    this.handleState = {
      show: () => {
        this.state.show ? this.show() : this.hide();
      },
      $content: () => {
        this.$el.append(this.state.$content);
      },
    };

    this.createElement();

    this.render();
  };

  this.render = () => {
    if (!this.$el) {
      this.mountComponent();
    }

    this.reflect({ $content: this.state.$content });

    this.$target.append(this.$el);
  };

  this.reflect = (states) => {
    for (const state in states) {
      const handleNewState = this.handleState[state];
      handleNewState();
    }
  };

  this.setState = (states) => {
    for (key in states) {
      this.state[key] = states[key];
    }
    this.reflect(states);
    this.render();
  };

  if (shouldRender) {
    this.render();
  }
}
