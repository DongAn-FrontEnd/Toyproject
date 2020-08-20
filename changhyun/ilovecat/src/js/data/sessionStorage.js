import ID from "../utils/ID";

const SessionStorage = (function () {
  // const KEYWORD_ITEM_ID = ID();
  const DARKMODE_ITEM_KEY = 'darkMode';
  const KEYWORD_ITEM_KEY = 'keyword'

  return function SessionStorage() {
    this.keyword = JSON.parse(sessionStorage.getItem('keyword')) || [];
    this.darkMode = JSON.parse(sessionStorage.getItem("darkMode")) || false;

    this.get = (key) => {
      return this[key];
    };
    this.update = (key) => {
      // if data is reference type, update data in other context.
      sessionStorage.setItem(key, JSON.stringify(this[key]));
    };
    this.set = (key, data) => {
      this[key] = data;
      sessionStorage.setItem(key, JSON.stringify(this[key]));
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
