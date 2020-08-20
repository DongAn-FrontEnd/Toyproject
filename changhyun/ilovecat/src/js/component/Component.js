export default class Component {
  constructor(tag, config, shouldMount = true) {
    const { $parent, className, attribute, position, handler } = config;
    this.$el = document.createElement(tag);

    handler && (this.handler = handler);
    className && this.setClassName(className);
    attribute && this.setAttribute(attribute);
    shouldMount && this.mountDOM($parent, position);
  }

  setClassName(className) {
    typeof className === "string"
      ? (this.$el.className = className)
      : console.error("className type is not correct");
  }

  setAttribute(attribute) {
    Object.entries(attribute).forEach(([attribute, value]) =>
      this.$el.setAttribute(attribute, value)
    );
  }

  mountDOM($parent, position) {
    position
      ? $parent.insertAdjacentElement(position, this.$el)
      : $parent.append(this.$el);
  }

  // bindEvent($el = this.$el, eventHandlerSet = this.eventHandlerSet) {
  //   for (eventType of eventHandlerSet) {
  //     const eventHandler = eventHandlerSet[eventType];

  //     if (Array.isArray(eventHandler)) {
  //       eventHandler.forEach((handler) =>
  //         $el.addEventListener(eventType, handler)
  //       );
  //       return;
  //     }

  //     $el.addEventListener(eventType, eventHandler);
  //   }
  // }
}
