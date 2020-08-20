import Component from "../Component";
import _sessionStorage from "../../data/sessionStorage";
import Card from "./Card";

export default class Main extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { searchedKeyword, catAPI } = config;
    this.searchedKeyword = searchedKeyword;
    this.catAPI = catAPI;
  }

  async fetchCatsInfo() {
    const breedsInfo = await this.catAPI.getBreedsInfo(
      this.searchedKeyword.value
    );
    const restBreedsInfo = breedsInfo.splice(6);

    const catsInfoPromise = breedsInfo.map(({ id }) =>
      this.catAPI.getImageByBreedId(id)
    );

    const catsInfo = await Promise.all(catsInfoPromise);

    this.catsInfo = catsInfo
      .filter((catInfo) => catInfo.length)
      .map((catInfo) => {
        const { breeds, url } = catInfo[0];
        const { name, origin } = breeds[0];
        return { name, origin, imageURL: url };
      });
  }

  async renderCatCards() {
    await this.fetchCatsInfo();

    this.$cardBox.innerHTML = ``;

    !this.catsInfo.length && this.showCatCardsFallback();

    this.cards = this.catsInfo.map(({ name, origin, imageURL }) => {
      const $li = document.createElement("li");
      this.$cardBox.append($li);

      return new Card("div", {
        $parent: $li,
        className: "card",
        name,
        origin,
        imageURL,
      });
    });
    this.cards.map((card) => card.render());
  }

  async showCatCardsFallback() {
    !this.allBreeds &&
      (await this.catAPI
        .getAllBreedsInfo({ page: 0, limit: 100 })
        .then((data) => {
          this.allBreeds = data
            .map(({ name }) => `<li style="padding:0.5em;">${name}</li>`)
            .join("");
        }));

    this.$cardBox.innerHTML = `
      <h2 style="width: 100%; padding: 1em; text-align: center;">고양이 품종을 검색해주세요.</h2>
      ${this.allBreeds}
    `;
  }

  render() {
    if (!this.$cardBox) {
      this.$el.innerHTML = `
        <ul class="card-box">
        </ul>
      `;
      this.$cardBox = this.$el.querySelector(".card-box");
    }
    this.searchedKeyword.value && this.renderCatCards();
  }
}
