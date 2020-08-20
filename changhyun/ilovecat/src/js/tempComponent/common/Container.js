import Component from "./Component";

export default class Container extends Component {
  constructor($target, config) {
    const defTag = "div";
    const defClassName = "container";

    super($target, { tag: defTag, className: defClassName, ...config });
  }
}
