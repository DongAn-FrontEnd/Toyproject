```js
function Component(config) {
  const {
    $target,
    className = "modal",
    shouldRender = true,
  } = config;
  this.$target = $target;
  this.className = className;

  this.createElement = (tag) => {
    this.$el = document.createElement(tag);
    this.$el.className = this.className;
    this.children = [
      new childComponent({ $target: this.$el, className: "child" }),
    ];
    this.children.forEach((child) => child.render());
  };

  this.mountComponent = () => {
    this.state = {
        state1: true,
        state2: 'state'
    };

    this.handleState = {
      state1: () => {
      },
      state2: () => {
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
```

Component life cycle

mountComponent // initiated by render method
    createElement
    render
        reflect
        $target.append($this.el)

setState
    setstates // reassign new states to this.state
    reflect // execute handleState method
    render

render
    reflect
    render

createElement
- render() 메소드에서 this.$el 유무를 확인하고 createElement를 실행하므로
- 컴포넌트는 인스턴스 1개당 단 하나의 DOM element를 갖는다.

mountComponent
- 1회 실행되며 컴포넌트의 state가 필요할 경우 state와 state가 update될 경우 실행할 handler를 handleState로 저장한다.
- 

## extends to Component

```js
class myComponent extends Component{
    constructor($target, config){
        super($target, config);
    }
}
```

$target : DOM Element *
config : Object (like props)
    - tag *
    - attributes
    - handlers
    - shouldRender

## state in Component

```js
import handlers from './ParentComponent.js';

class myComponent{
    constructor($target, config){
        super($target, config);
        this.state = {
          modalBtnToggled: [false, handlers.showModal],
          popUpToggled: [true, handlers.showPopUp]
        }
    }
}
```

## default config

```js
import Component from "./Component";

export default class Container extends Component {
  constructor($target, config) {
    // declare def variables
    const defTag = "div";
    const defClassName = "container";   

    this.state = {
      modalBtnToggled: [false, handlers.showModal],
      popUpToggled: [true, handlers.showPopUp]
    }

    super($target, { tag: defTag, className: defClassName, ...config }); // def can be overwritten by config
  }
}
```

- you can use def values directly in super method
```js
import Component from "./Component";

export default class Container extends Component {
  constructor($target, config) {

    this.state = {
      modalBtnToggled: [false, handlers.showModal],
      popUpToggled: [true, handlers.showPopUp]
    }

    super($target, { tag: 'div', className: 'container', ...config }); // def can be overwritten by config
  }
}
```

session Storage

상위 컴포넌트에서 해결할 경우 사용할 메소드 지정 후 메소드를 넘기면 됨

하위에서 직접적으로 사용할 경우 스토리지 포인터를 넘기면 됨