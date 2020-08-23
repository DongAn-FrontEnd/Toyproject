import SearchBar from "./components/SearchBar.js";
import SearchResult from "./components/SearchResult.js";
import DatailModal from "./components/DeatilModal.js";
import Loading from "./components/Loading.js";
import Error from "./components/Error.js";
import DarkMode from "./components/DarkMode.js";
import { api } from "./api/theCatAPI.js";
import { setItem, getItem } from "./util/sessionStorage.js";

export default class App {
	constructor($target) {
		console.log("App is created!");
		const searchBar = new SearchBar({
			$target,
			onSearch: async (keyword) => {
				loading.toggleSpinner();

				const response = await api.fetchImages(keyword);

				if (!response.isError) {
					setItem("data", response.data);
					searchResult.updateData(response.data);
				} else {
					searchResult.updateData([]);
					errorPage.setState(response.data);
				}

				loading.toggleSpinner();
			},

			randomSearch: async () => {
				loading.toggleSpinner();

				const response = await api.fetchRandomImages();

				if (!response.isError) {
					setItem("data", response.data);
					searchResult.updateData(response.data);
				} else {
					console.error("에러 발생!!");
				}

				loading.toggleSpinner();
			},
		});

		const searchResult = new SearchResult({
			$target,
			data: getItem("data"),
			cardClick: (newItem) => {
				detailModal.setState(newItem);
				detailModal.toggleModal();
			},
			onScroll: async () => {
				loading.toggleSpinner();

				const response = await api.fetchRandomImages();

				if (!response.isError) {
					const beforeData = getItem("data");
					const nextData = beforeData.concat(response.data);

					setItem("data", nextData);
					searchResult.updateData(nextData);
				} else {
					console.log("에러!!!! 끝");
				}

				loading.toggleSpinner();
			},
		});

		const loading = new Loading({ $target });
		const detailModal = new DatailModal($target);
		const errorPage = new Error($target);
		const darkMode = new DarkMode($target);
	}
}
