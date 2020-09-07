import Item from "./Item.js";
import { lazyLoad } from "../lazyLoad.js";

export default class SearchResult {
  constructor($target) {
    this.$target = $target;
    this.data = [];

    this.render();
  }

  updateData(data) {
    this.data = data;
    this.render();
    lazyLoad();
  }

  render() {
    //modal

    const modalWrapper = document.createElement("div");
    const modalContent = document.createElement("div");
    modalWrapper.className = "modal-wrapper";
    modalContent.className = "modal-content";
    modalWrapper.classList.add("hidden");
    document.body.appendChild(modalWrapper);
    modalWrapper.appendChild(modalContent);

    const itemGroupWrapper = document.createElement("div");
    itemGroupWrapper.className = "wrapper";

    const itemGroup = document.createElement("div");
    itemGroup.className = "item-group";

    this.data.map((cat) => {
      new Item(itemGroup, cat, modalWrapper);
    });

    itemGroupWrapper.appendChild(itemGroup);
    this.$target.appendChild(itemGroupWrapper);
  }
}
