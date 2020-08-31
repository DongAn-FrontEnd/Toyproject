import Component from "../Component";

export default class Switch extends Component {
  constructor(tag, config, mountDOM) {
    super(tag, config, mountDOM);

    this.isDarkMode = config.sessionStorage.get("darkMode");
    this.setSessionStorage = config.sessionStorage.set;

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  render() {
    this.$el.innerHTML = `
    <label class="switch">
      <input type="checkbox" id="switch-toggler" />
      <span class="switch-ball"></span>
    </label>
    `;
  }

  toggleDarkMode(e) {
    // 두 번 트리거되는 현상 제거
    if (e.target.className === "switch-ball") return;

    document.body.classList.toggle("dark");
    this.isDarkMode = !this.isDarkMode;
    this.setSessionStorage("darkMode", this.isDarkMode);
  }

  bindEvent() {
    this.$el.addEventListener("click", this.toggleDarkMode);
  }
}
