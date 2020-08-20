import Component from "../Component";
import debounce from "../../utils/debounce";

export default class SearchBar extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { sessionStorage, handler } = config;

    this.keyword = sessionStorage.get("keyword");
    this.updateSessionStorage = () => sessionStorage.update("keyword");
    this.searchedKeyword = config.searchedKeyword;

    this.renderMain = handler.renderMain;

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
  }

  render() {
    this.$el.innerHTML = `
        <h1 class="header__title">프로그래머스 데브매칭</h1>
        <input type="text" />
        <ul class="badges"></ul>
    `;
    this.$input = this.$el.querySelector("input");
    this.$badges = this.$el.querySelector("ul");
    this.renderBadges();
  }

  renderBadges() {
    this.$badges.innerHTML = `
        ${this.keyword
          .map(
            (keyword) =>
              `<li><span class="btn btn--dark">${keyword}</span></li>`
          )
          .join("")}
        `;
  }

  addKeyword(keyword) {
    const originData = this.keyword;
    this.keyword.push(keyword);

    originData.length === 5 && this.keyword.shift();

    this.updateSessionStorage();
  }

  handleInputOnChange(e) {
    // backspace일 경우 return
    if (e.code === "Backspace") return;
    const searchedKeyword = e.target.value;
    if (!searchedKeyword) return;

    this.addKeyword(searchedKeyword);
    this.searchedKeyword.set(searchedKeyword);
    this.renderBadges();
    this.renderMain();
  }

  handleDeleteBtnOnClick(e) {
    const badge = e.target.closest("li");
    badge && badge.remove();
  }
  handleBadgesOnClick() {}

  bindEvent() {
    this.$input.addEventListener(
      "keyup",
      debounce(this.handleInputOnChange.bind(this), 400)
    );
    this.$badges.addEventListener("click", this.handleBadgesOnClick);
  }
}
