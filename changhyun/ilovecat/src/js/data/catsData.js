function _catsData() {
  this.data = [];

  this.get = () => this.data;
  this.set = (data) => {
    this.data = data;
  };
}

const catsData = new _catsData();
export default catsData;
