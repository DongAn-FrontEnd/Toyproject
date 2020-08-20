function SearchedKeyword() {
  this.value = null;

  this.get = () => this.value;
  this.set = (searchedKeyword) => {
    this.value = searchedKeyword;
  };
}

const _searchedKeyword = new SearchedKeyword();
export default _searchedKeyword;
