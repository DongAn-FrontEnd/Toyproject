import ID from "../utils/ID";

const DARKMODE_ITEM_KEY = "darkMode"
  .split("")
  .map((c) => c.charCodeAt(0))
  .join("");
const KEYWORD_ITEM_KEY = "keyword"
  .split("")
  .map((c) => c.charCodeAt(0))
  .join("");

const ITEM_KEYS = {
  darkMode: DARKMODE_ITEM_KEY,
  keyword: KEYWORD_ITEM_KEY,
};
const SessionStorage = (function () {
  // const KEYWORD_ITEM_ID = ID();

  return function SessionStorage() {
    this.keyword = JSON.parse(sessionStorage.getItem(KEYWORD_ITEM_KEY)) || [];
    this.darkMode =
      JSON.parse(sessionStorage.getItem(DARKMODE_ITEM_KEY)) || false;

    this.get = (key) => {
      return this[key];
    };

    this.update = (key) => {
      sessionStorage.setItem(ITEM_KEYS[key], JSON.stringify(this[key]));
    };

    this.set = (key, data) => {
      sessionStorage.setItem(ITEM_KEYS[key], JSON.stringify(data));
    };
  };
})();

const _sessionStorage = new SessionStorage();

export default _sessionStorage;

/*

get(key)
- sessionStorage에서 키를 통해 data를 가져올 떄 사용
set(key, value)
- data를 통째로 sessionStorage에 set할 때 사용
update(key)
- 로컬에서 사용하고 있는 reference data를 sessionStorage에 set할 때 사용

reference type이 아닐 경우, set을 통해 업데이트해야됨.
*/
