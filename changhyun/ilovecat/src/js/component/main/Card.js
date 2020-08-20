import Component from "../Component";

export default class Card extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { origin, imageURL, name } = config;

    this.imageURL = imageURL;
    this.name = name;
    this.origin = origin;
  }

  setConfig({ origin, imageURL, name }) {
    this.imageURL = imageURL;
    this.name = name;
    this.origin = origin;
    this.render();
  }

  render() {
    this.$el.innerHTML = `
      <div class="card__image">
        <img src=${this.imageURL} alt="" />
      </div>
      <div class="card__content">
        <h2 class="card__title">${this.name}</h2>
        <p>${this.origin}</p>
      </div>
      `;
  }
}
