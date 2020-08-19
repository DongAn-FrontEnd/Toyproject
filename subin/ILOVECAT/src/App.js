import SearchBar from "./components/SearchBar.js";
import SearchResult from "./components/SearchResult.js";
import { api } from "./api/theCatAPI.js";

export default class App {
  constructor() {
    console.log("App is created!");

    const top = document.createElement("div");
    top.className = "top";

    const bottom = document.createElement("div");
    bottom.className = "bottom";

    const searchBar = new SearchBar(top, (keyword) => {
      // api call & searchResult update
      api.fetchImage(keyword).then((data) => {
        searchResult.updateData(data);
      });
    });

    const searchResult = new SearchResult(bottom);

    // const images = document.querySelectorAll('img');

    // window.addEventListener("scroll",(e)=>{
    //     console.log("e");
    //     images.forEach((img)=>{
    //         console.log("Scrolling...");
    //         const rect = img.getBoundingClientRect().top;
    //         //getBoundingClientRect().top은 페이지 가장 위부터 그 엘리먼트의 top까지의 크기
    //         //
    //         console.log("rect : "+rect);
    //         console.log("height ; "+window.innerHeight);
    //         if(rect <= window.innerHeight){
    //             console.log("AA");
    //             //이미지가 보일 타이밍 계산
    //             const src = img.getAttribute("data-lazy");
    //             img.setAttribute("src",src);
    //             img.classList.add('fade'); //트랜지션 추가
    //         }
    //     });
    // });

    const darkmodeBtn = document.createElement("button");
    darkmodeBtn.className = "darkmode-btn";
    darkmodeBtn.innerText = "DARK";

    document.body.appendChild(top);
    document.body.appendChild(bottom);
    document.body.appendChild(darkmodeBtn);
  }
}
