import Component from "./Component";

export default class Modal extends Component {
  constructor(tag, config) {
    super(tag, config);
    this.$el.innerHTML = `
    <div class="backdrop"></div>
    `;

    this.$backdrop = this.$el.querySelector("div");
    this.hide = this.hide.bind(this);
  }

  show() {
    this.$el.classList.add("show");
  }
  hide(e) {
    if (e.target.className === "backdrop") {
      this.$el.classList.remove("show");
    }
  }

  setContent(content) {
    this.content = content;
    this.render();
  }

  render() {
    this.$backdrop.innerHTML = ``;
    this.$backdrop.append(this.content);
  }

  bindEvent() {
    this.$el.addEventListener("click", this.hide);
  }
}
