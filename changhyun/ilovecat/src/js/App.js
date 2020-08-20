import _catAPI from "./api/catAPI";
import _sessionStorage from "./data/sessionStorage";
import _searchedKeyword from "./data/searchedKeyword";
import Header from "./component/header/Header";
import "../css/style.css";
import Main from "./component/main/Main";

window.addEventListener("load", () => {
  if (_sessionStorage.get("darkMode")) {
    document.body.classList.add("dark");
    document.getElementById("switch-toggler").checked = true;
  }
});

const catAPI = _catAPI.init();

function App() {
  this.sessionStorage = _sessionStorage;
  this.searchedKeyword = _searchedKeyword;

  this.init = () => {
    if (this.$el) return;

    this.$el = document.getElementById("App");
    this.$el.innerHTML = `
      <div id="header"></div>
      <div id="main"></div>
      <div id="modal"></div>
    `;

    const mainConfig = {
      $parent: this.$el.querySelector("#main"),
      catAPI: catAPI,
      searchedKeyword: this.searchedKeyword,
    };
    this.$main = new Main("main", mainConfig);

    const headerConfig = {
      $parent: this.$el.querySelector("#header"),
      className: "header",
      sessionStorage: this.sessionStorage,
      searchedKeyword: this.searchedKeyword,
      handler: {
        renderMain: this.$main.render.bind(this.$main),
      },
    };
    this.$header = new Header("header", headerConfig);

    const modalConfig = {
      $parent: this.$el.querySelector("#modal"),
      className: "modal",
    };
  };

  this.render = () => {
    this.$header.render();
    this.$main.render();
    // this.$modal.render();
  };

  this.bindEvent = () => {
    this.$header.bindEvent();
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
