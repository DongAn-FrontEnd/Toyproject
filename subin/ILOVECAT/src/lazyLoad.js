export function lazyLoad() {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        //entries는 들어오는 target elements.
        //isIntersecting은 boolean을 리턴, 현재 화면에 타겟이 들어왔는지 아닌지 판단
        //들어왔다면 이미지 경로를 알려주어 이미지를 로딩.
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          console.log(lazyImage.src);
          lazyImage.classList.remove("lazy");
          lazyImage.classList.add("fade");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

//console을 확인해보면 화면안에 보이는 사진들만 찍혀있고 스크롤 내리면서
//img를 가져와지는 것이 보임.
