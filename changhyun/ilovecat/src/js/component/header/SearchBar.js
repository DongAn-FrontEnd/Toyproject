import Component from "../Component";
import debounce from "../../utils/debounce";
import catsData from "../../data/catsData";
import lazyLoad from "../../utils/lazyLoad";
export default class SearchBar extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { sessionStorage, handler, catAPI, searchedKeyword } = config;

    this.searchedKeyword = searchedKeyword;
    this.catAPI = catAPI;

    this.keyword = sessionStorage.get("keyword");
    this.updateSessionStorage = () => sessionStorage.update("keyword");

    this.renderMain = handler.renderMain;

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleBadgesOnClick = this.handleBadgesOnClick.bind(this);
    this.fetchCatsInfo = this.fetchCatsInfo.bind(this);
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
              `<li>
                <div class="btn btn--dark">${keyword}<i class="fa fa-minus-circle"></i></div>
              </li>`
          )
          .join("")}
        `;
  }

  async fetchCatsInfo() {
    console.log(document);
    document.querySelector(".card-box").innerHTML = `
    <li>
      <div class="card">
        <div class="card__image">
        <div class="placeholder-img show"></div>
        </div>
        <div class="card__content">
          <h2 class="card__title">loading...</h2>
          <p>loading...</p>
        </div>
      </div>
    </li>
    `.repeat(10);
    const breedsInfo = await this.catAPI.getBreedsInfo(
      this.searchedKeyword.value
    );

    const catsInfoPromise = breedsInfo.map(({ id }) => {
      return this.catAPI.getImageByBreedId(id);
    });

    const catsInfo = await Promise.all(catsInfoPromise);

    catsData.set(
      catsInfo
        .filter((catInfo) => catInfo.length)
        .map((catInfo) => {
          return catInfo.map((cat) => {
            const { breeds, url } = cat;
            const {
              description,
              name,
              life_span: lifeSpan,
              origin,
              weight,
              wikipedia_url: wikiURL,
            } = breeds[0];

            return {
              name,
              origin,
              description,
              lifeSpan,
              weight,
              wikiURL,
              imageURL: url,
            };
          });
        })
    );

    document.querySelector(".card-box").innerHTML = ``;

    return catsData.get().length ? true : false;
  }

  addKeyword(keyword) {
    const originData = this.keyword;
    this.keyword.push(keyword);

    originData.length === 5 && this.keyword.shift();

    this.updateSessionStorage();
  }

  async handleInputOnChange(e) {
    if (e.code === "Backspace") return;

    const searchedKeyword = e.target.value;
    if (!searchedKeyword) return;

    this.searchedKeyword.set(searchedKeyword);

    const isFetchedData = await this.fetchCatsInfo();
    if (isFetchedData) {
      this.addKeyword(searchedKeyword);
      this.renderBadges();
    }

    this.renderMain();
    lazyLoad();
  }

  async handleBadgesOnClick(e) {
    const deleteBtn = e.target.closest("i");

    if (deleteBtn) {
      const badge = deleteBtn.closest("li");
      badge.remove();

      this.keyword.splice(this.keyword.lastIndexOf(badge.textContent), 1);
      this.updateSessionStorage();
      return;
    }

    const clickedKeyword = e.target.closest("div").textContent;
    this.searchedKeyword.set(clickedKeyword);

    await this.fetchCatsInfo();
    this.renderMain();
    lazyLoad();
  }

  bindEvent() {
    this.$input.addEventListener(
      "keyup",
      debounce(this.handleInputOnChange.bind(this), 400)
    );
    this.$badges.addEventListener("click", this.handleBadgesOnClick);
  }
}
