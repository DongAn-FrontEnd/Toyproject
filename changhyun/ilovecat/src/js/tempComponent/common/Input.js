function Backdrop(config) {
  const {
    $target,
    className = "input",
    handlers,
    shouldRender = true,
  } = config;
  this.$target = $target;
  this.className = className;
  this.handlers = handlers;

  this.createElement = () => {
    const input = document.createElement("input");
    input.type = text;
    input.className = this.classname;

    this.$el = input;
  };

  this.mountComponent = () => {
    this.state = {
      value: this.$el.value,
    };
    this.handleState = {
      value: () => {
        console.log("handle input", this.state);
      },
    };

    this.createElement();
    this.addEventHandlers();
    this.render();
  };

  this.render = () => {
    if (!this.$el) {
      this.mountComponent();
    }

    this.reflect({ value: this.state.value });
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

  /*
    handlers = {
        click : [handler , handler2],
        change : handler
    }
  */

  this.addEventHandlers = () => {
    const handlers = this.handlers;
    for (handler in handlers) {
      const { event, handlerFunc } = handler;
      this.$el.addEventListener(event, handlerFunc);
    }
  };

  if (shouldRender) {
    this.render();
  }
}

export default Backdrop;
