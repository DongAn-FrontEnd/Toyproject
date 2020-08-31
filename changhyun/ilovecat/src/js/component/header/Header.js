import Component from "../Component";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Switch from "./Switch";

const LOGO_URL =
  "https://img.icons8.com/pastel-glyph/64/000000/cat-back-view.png";

export default class Header extends Component {
  constructor(tag, config, shouldRender) {
    super(tag, config, shouldRender);
    const { catAPI, sessionStorage, handler, catsData } = config;

    const componentConfig = {
      logo: {
        $parent: this.$el,
        catAPI,
        catsData,
        className: "header__logo",
        imageURL: LOGO_URL,
      },
      searchBar: {
        $parent: this.$el,
        className: "header__searchBar",
        sessionStorage,
        catAPI,
        catsData,
        searchedKeyword: config.searchedKeyword,
        handler,
      },
      darkMode: {
        $parent: this.$el,
        className: "header__darkMode",
        sessionStorage,
      },
    };
    // mount children Components
    this.$logo = new Logo("div", componentConfig.logo);
    this.$searchBar = new SearchBar("div", componentConfig.searchBar);
    this.$darkMode = new Switch("div", componentConfig.darkMode);
  }

  render() {
    this.$logo.render();
    this.$searchBar.render();
    this.$darkMode.render();
  }

  bindEvent() {
    this.$searchBar.bindEvent();
    this.$darkMode.bindEvent();
  }
}

// <header class="header">
//   <h1 class="header__title">프로그래머스 데브매칭</h1>
//   <div class="header__body">
//     <div class="header__logo">
//       <img src="https://img.icons8.com/pastel-glyph/64/000000/cat-back-view.png" />
//     </div>
//     <div class="header__search">
//       <input type="text" />
//       <ul class="badges">
//         <li>
//           <span class="btn btn--dark">dev</span>
//         </li>
//         <li>
//           <span class="btn btn--dark">dev</span>
//         </li>
//         <li>
//           <span class="btn btn--dark">dev</span>
//         </li>
//         <li>
//           <span class="btn btn--dark">dev</span>
//         </li>
//         <li>
//           <span class="btn btn--dark">dev</span>
//         </li>
//       </ul>
//     </div>
//     <div class="header__darkMode">
//       <label class="switch">
//         <input type="checkbox" id="switch-toggler" />
//         <span class="switch-ball"></span>
//       </label>
//     </div>
//   </div>
// </header>;
