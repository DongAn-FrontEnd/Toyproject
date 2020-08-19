export default class Item {
  constructor($target, data, modalWrapper) {
    this.$target = $target;
    this.data = data;
    this.modalWrapper = modalWrapper;
    this.render();
  }

  render() {
    // const modalWrapper = document.createElement("div");
    // const modalContent = document.createElement('div');
    // modalWrapper.className = "modal-wrapper";
    // modalContent.className = 'modal-content';
    // modalWrapper.classList.add('hidden');
    // document.body.appendChild(modalWrapper);
    // modalWrapper.appendChild(modalContent);

    const url = this.data.url;
    const { temperament, origin } = this.data.breeds[0];

    const itemWrapper = document.createElement("div");
    itemWrapper.className = "wrapper";

    const item = document.createElement("div");
    item.className = "item";

    const itemImg = document.createElement("img");
    itemImg.className = "item-img";
    itemImg.classList.add("lazy");
    itemImg.dataset.src = url;
    itemImg.src = url;

    //itemImg.setAttribute('src',itemImg.getAttribute('data-lazy'));

    const itemDescription = document.createElement("div");
    itemDescription.className = "item-description";

    const itemTemper = document.createElement("p");
    itemTemper.className = "item-temper";
    itemTemper.innerText = temperament;

    const itemOrigin = document.createElement("p");
    itemOrigin.className = "item-origin";
    itemOrigin.innerText = origin;

    itemDescription.appendChild(itemTemper);
    itemDescription.appendChild(itemOrigin);
    item.appendChild(itemImg);
    item.appendChild(itemDescription);
    itemWrapper.appendChild(item);
    this.$target.appendChild(itemWrapper);

    const closeBtn = document.createElement("button");
    closeBtn.className = "close";
    closeBtn.innerText = "X";
    item.onclick = (e) => {
      this.modalWrapper.classList.add("visible");
      this.modalWrapper.classList.remove("hidden");
      const modalContent = this.modalWrapper.firstChild;
      //modalContent = querySelector('.modal-content')로는 안됐는데 왜?
      modalContent.innerHTML = `
                <div class=modal-card>
                    <img id=innerImg src=${url}>
                    <div>${origin}</div>
                    <div>${temperament}</div>
                </div>
            `;
      modalContent.appendChild(closeBtn);
      console.log(modalContent.firstChild);
    };

    closeBtn.onclick = () => {
      this.modalWrapper.classList.add("hidden");
      this.modalWrapper.classList.remove("visible");
    };

    window.onclick = (e) => {
      if (e.target == this.modalWrapper) {
        this.modalWrapper.classList.add("hidden");
        this.modalWrapper.classList.remove("visible");
      }
    };
  }
}
