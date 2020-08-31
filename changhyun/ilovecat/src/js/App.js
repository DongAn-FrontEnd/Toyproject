import _catAPI from "./api/catAPI";
import _sessionStorage from "./data/sessionStorage";
import _searchedKeyword from "./data/searchedKeyword";
import catsData from "./data/catsData";
import Header from "./component/header/Header";
import "../css/style.css";
import Main from "./component/main/Main";
import Modal from "./component/Modal";

window.addEventListener("load", () => {
  console.log("hi");
  if (_sessionStorage.get("darkMode")) {
    document.body.classList.add("dark");
    document.getElementById("switch-toggler").checked = true;
  }
});

const catAPI = _catAPI.init();

function App() {
  this.sessionStorage = _sessionStorage;
  this.searchedKeyword = _searchedKeyword;
  this.catsData = catsData;

  this.init = () => {
    if (this.$el) return;

    this.$el = document.getElementById("App");
    this.$el.innerHTML = `
      <div id="header"></div>
      <div id="main"></div>
    `;

    const modalConfig = {
      $parent: document.body,
      className: "modal",
      position: "afterbegin",
    };
    this.$modal = new Modal("div", modalConfig);

    const mainConfig = {
      $parent: this.$el.querySelector("#main"),
      catAPI: catAPI,
      catsData: this.catsData,
      modal: this.$modal,
    };
    this.$main = new Main("main", mainConfig);

    const headerConfig = {
      $parent: this.$el.querySelector("#header"),
      className: "header",
      catAPI: catAPI,
      sessionStorage: this.sessionStorage,
      searchedKeyword: this.searchedKeyword,
      catsData: this.catsData,
      handler: {
        renderMain: this.$main.render.bind(this.$main),
      },
    };
    this.$header = new Header("header", headerConfig);
  };

  this.render = () => {
    this.$header.render();
    this.$main.render();
  };

  this.bindEvent = () => {
    this.$header.bindEvent();
    this.$main.bindEvent();
    this.$modal.bindEvent();
  };
}
const app = new App();
app.init();
app.render();
app.bindEvent();
// (async () => {
//   await catAPI
//     .getImages()
//     .then((data) => {
//       console.log(data);
//       console.log(catAPI.queries.page);
//     })
//     .then(() => catAPI.next())
//     .then((data) => {
//       console.log(data);
//       console.log(catAPI.queries.page);
//     });

//   await catAPI
//     .getGifImages()
//     .then((data) => {
//       console.log(data);
//       console.log(catAPI.queries.page);
//     })
//     .then(() => catAPI.next())
//     .then((data) => {
//       console.log(catAPI.queries.page);
//       console.log(data);
//     });
// })();
// console.log(catAPI);
// console.log(catAPI);

console.log(app);
console.log(app.sessionStorage);
console.log(app.sessionStorage.get("keyword"));
