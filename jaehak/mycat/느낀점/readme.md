# 느낀점 정리

## SearchResult.js

마우스 클릭 이벤트로 전파하는 것이 신기함..

이를 사용하여 성능 개선함

본인은 `{cpature: true}`로 하향식 전파를함

`e.path` 로 해당 element를 찾는 게 신기 했음

`e.path`로 되어 있는데 `composedPath()` 가 표준

## lazyLoad.js

**Intersection Observer** 해서 구현

이에 **card**를 `img.src=""` 를 하고 진짜 `src`를 `data-src`에 넣음

## scrollFetch.js

- `document.documentElement`
  - 루트 엘리먼트를 가져옴
  - 읽기 전용

- 나머지 `element.속성` 은 아래 그림 참고

  <br/>

  <p align="center">
    <img src="./pic/widthHeight.PNG" />
  </p>

  - **client** : `border`, `padding`, `margin` 포함 안함
  - **offset** : `border`, `padding` 포함한 크기
  - **scroll** : 보이지 않은 부분까지 포함

  <br/>

  > 사진 출처: https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

