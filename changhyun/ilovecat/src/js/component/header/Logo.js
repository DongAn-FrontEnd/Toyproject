import Component from "../Component";

export default class Logo extends Component {
  constructor(tag, config, shouldMount) {
    super(tag, config, shouldMount);
    this.imageURL = config.imageURL;
  }

  render() {
    this.$el.innerHTML = `<img src=${this.imageURL} />`;
  }
}
