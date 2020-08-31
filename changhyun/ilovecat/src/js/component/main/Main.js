import Component from "../Component";
import _sessionStorage from "../../data/sessionStorage";
import Card from "./Card";

export default class Main extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { searchedKeyword, catAPI, catsData, modal } = config;
    this.searchedKeyword = searchedKeyword;
    this.catAPI = catAPI;
    this.catsData = catsData;
    this.modal = modal;

    this.HandleOnClick = this.HandleOnClick.bind(this);
  }

  async renderCatCards() {
    this.$cardBox.innerHTML = ``;
    const catsData = this.catsData.get();
    !catsData.length && this.showCatCardsFallback();

    this.cards = catsData.map((data) => {
      const cards = data.map((item) => {
        const {
          name,
          origin,
          imageURL,
          description,
          lifeSpan,
          weight,
          wikiURL,
        } = item;
        const $li = document.createElement("li");
        console.log(weight, wikiURL);
        $li.dataset.info = JSON.stringify({
          description,
          lifeSpan,
          weight,
          wikiURL,
        });
        this.$cardBox.append($li);

        return new Card("div", {
          $parent: $li,
          className: "card",
          name,
          origin,
          imageURL,
        });
      });
      cards.map((card) => card.render());
    });
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

  HandleOnClick(e) {
    const card = e.target.closest(".card");
    const li = e.target.closest("li");
    if (card) {
      const info = JSON.parse(card.parentElement.dataset.info);
      const { description, lifeSpan, weight, wikiURL } = info;
      console.log(card);
      console.log(info);

      const $card = card.cloneNode(true);

      const $info = document.createElement("div");
      console.log(weight);
      $info.innerHTML = `
      <p>${description}</p>
      <table>
      <thead>
      <th>life span</th>
      <th>weight</th>
      <thead>
      <tbody>
      <tr>
      <td rowspan="2">${lifeSpan}</td>
      <td>
      metric : ${weight.metric}
      </td>
      <tr>
        <td>
        imperial : ${weight.imperial}
        </td>
        </tr>
      </tbody>
      <tfoot >
      <th colspan="2">wiki URL</th>
      <tr >
      <td colspan="2">${wikiURL}</td>
      </tr>
      </tfoot>
      </table>
      `;

      $card.querySelector(".card__content").append($info);
      const modalContent = document.createElement("div");
      modalContent.append($card);

      this.modal.setContent(modalContent);
      this.modal.show();
      console.log(this.modal);
      return;
    }
    if (li) {
    }
  }

  render() {
    if (!this.$cardBox) {
      this.$el.innerHTML = `
        <ul class="card-box">
        </ul>
      `;
      this.$cardBox = this.$el.querySelector(".card-box");
    }
    this.renderCatCards();
  }
  bindEvent() {
    this.$el.addEventListener("click", this.HandleOnClick);
  }
}
