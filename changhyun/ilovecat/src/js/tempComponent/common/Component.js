export default class Component {
  constructor($target, config) {
    const {
      tag,
      className,
      attributes,
      handlers,
      shouldRender = true,
    } = config;

    this.$target = $target;
    this.tag = tag;
    this.className = className;
    this.attributes = attributes;
    this.handlers = handlers;

    // this.state = {
    //   state1 : ['hello world', ()=>console.log('hi')];
    // }

    if (shouldRender) {
      this.render();
    }
  }

  _setAttributes() {
    const attributes = this.attributes;
    this.$el.className = this.className;

    if (!Array.isArray(attributes) || attributes.length === 0) {
      return undefined;
    }

    attributes.forEach(({ attribute, value }) =>
      this.$el.setAttribute(attribute, value)
    );

    return true;
  }

  _handlersToEvent(eventHandlerPairs) {
    // @param {event1:handler1, event2:handler2}
    if (eventHandlerPairs === undefined) {
      return;
    }

    if (typeof eventHandlerPairs !== "object") {
      console.error("event and handler pairs are not correct");
    }
    for (event in eventHandlerPairs) {
      this.$el.addEventListener(event, eventHandlerPairs[event]);
    }
  }

  _createElement() {
    this.$el = document.createElement(this.tag);
    this._setAttributes();
    this._handlersToEvent();
  }

  _mountComponent() {
    this._createElement();
    this.render();
  }

  _update(newState) {
    for (const key in newState) {
      const handleNewState = this.state[key][1];
      handleNewState();
    }
  }
  // @param $parent : DOM el, children : [Component, Component]
  appendChildren(children) {
    children.forEach((child) => this.append(child.$el));
  }

  render(newState = undefined) {
    if (!this.$el) {
      this._mountComponent();
    }

    if (newState) {
      this._update(newState);
    }

    this.$target.append(this.$el);
  }

  setState(state) {
    // @param {key:value, key2:value2}
    for (key in state) {
      this.state[key][0] = state[key];
    }

    this.render(state);
  }
}
