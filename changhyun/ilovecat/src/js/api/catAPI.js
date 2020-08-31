const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 10;
const MAXIMUM_LIMIT = 100;
const CATAPI_ENDPOINT = `https://api.thecatapi.com/v1`;

const fetchJSON = async (url, errorCallback = undefined) => {
  try {
    return await fetch(url).then((res) => res.json());
  } catch (e) {
    errorCallback && errorCallback();
    console.error(e);
  }
};
const queriesToURL = (queries, callback) =>
  Object.entries(queries)
    .filter(([query, value]) => value !== undefined)
    .map(([query, value], i) => {
      callback && callback(query, value);
      return `${i === 0 ? "?" : "&"}${query}=${value}`;
    })
    .join("");

const catAPI = (function () {
  let instance;

  function CatAPI() {
    this.ENDPOINT = CATAPI_ENDPOINT;
    this.page = DEFAULT_PAGE;
    this.limit = DEFAULT_LIMIT;
    // assigned by methods
    this.URL = "";
    this.path = [];
    this.queries = {};

    // helper in catAPI
    const isValidPage = (page) => page > 0;
    const isValidLimit = (limit) => limit > 0 && limit <= MAXIMUM_LIMIT;

    // path
    this.pathToURL = (path) => {
      return typeof path === "string"
        ? "/" + path
        : Array.isArray(path) && path.map((path) => `/${path}`).join("");
    };
    this.movePath = (path) => {
      // @param : 'path' or ['path1', 'path2']
      this.URL = this.ENDPOINT;
      this.URL += this.pathToURL(path);

      this.path = path;

      return this.URL;
    };

    // queries
    this.setQueries = (queries) => {
      // @param : {query1: value1, query2:value2};
      const queriesURL = queriesToURL(queries);
      this.URL += queriesURL;

      this.queries = { ...queries };
    };
    this.addQueries = (queries) => {
      const queriesURL = queriesToURL(queries, (query, value) => {
        this.queries[query] = value;
      });
      this.URL += queriesURL;
    };

    // pagination
    this.navigatePage = async (number, reverse = false) => {
      try {
        let page = this.queries.page;
        console.log(this.queries);
        page += reverse ? -number : number;

        if (!isValidPage(page)) {
          throw error("can not find prev pagination");
        }

        this.queries.page = page;

        this.URL = this.ENDPOINT + "/" + this.path.join("/");
        this.URL += queriesToURL(this.queries);

        return await fetchJSON(this.URL);
      } catch (e) {
        console.error(e);
      }
    };

    this.next = async () => {
      return await this.navigatePage(1);
    };

    this.prev = async () => {
      return await this.navigatePage(1, "reverse");
    };

    // /breeds

    this.searchBreeds = async ({
      q,
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
    }) => {
      try {
        if (!isValidLimit) {
          throw error("maximum limit is 100");
        }

        const path = q ? ["breeds", "search"] : "breeds";
        this.movePath(path);

        q ? this.setQueries({ q }) : this.setQueries({ page, limit });
        console.log(this.URL);

        return await fetchJSON(this.URL);
      } catch (e) {
        console.error(e);
      }
    };

    this.getAllBreedsInfo = async (option = {}) => {
      const { page, limit } = option;
      return await this.searchBreeds({ page, limit });
    };
    this.getBreedsInfo = async (q) => await this.searchBreeds({ q });

    // /images

    this.searchImages = async ({
      breed_id,
      page = DEFAULT_PAGE,
      limit = DEFAULT_LIMIT,
      order,
      mime_types,
    }) => {
      try {
        if (!isValidLimit(limit)) {
          console.error("maximum limit is 100");
          return;
        }

        const path = ["images", "search"];
        this.movePath(path);

        this.setQueries({ mime_types, breed_id, page, limit, order });

        return await fetchJSON(this.URL);
      } catch (e) {
        console.error(e);
      }
    };
    this.getImages = async (option = {}) => {
      const { page, limit, order } = option;
      return await this.searchImages({ page, limit, order });
    };
    this.getGifImages = async (option = {}) => {
      const { page, limit, order } = option;
      return await this.searchImages({ page, limit, order, mime_types: "gif" });
    };
    this.getImageByBreedId = async (breed_id) =>
      await this.searchImages({ breed_id });
  }

  return {
    init() {
      if (!instance) {
        instance = new CatAPI();
      }
      return instance;
    },
  };
})();

export default catAPI;
