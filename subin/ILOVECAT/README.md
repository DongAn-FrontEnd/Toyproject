
# media query
CSS3에서 소개된 기술로, 명시한 특정 조건이 참일 때 CSS 속성의 block에 조건을 적용. 

@media only screen and (max-width:600px) : {}
-screen, print, all 등으로 대상 미디어 선언. 
media 쿼리로 디바이스별 픽셀을 따로 적용해서 grid-template-columns로 하려 했는데 픽셀을 몇 단위로 설정해야하는 것인지 구글링을 해봐도 크기가 정확하지 않고 깔끔하게 어떻게 해야될 지 감이 안 옴.

https://hyeonseok.com/soojung/css/2019/12/25/855.html 에서 반응형 그리드 레이아웃 짜는 코드 참고.
auto-fill, auto-fit : column의 개수를 설정된 너비가 허용하는 한 최대의 셀을 채움.  
minmax(300px,1fr) : 최소한의 너비 300px은 확보하고, 최대는 1fr까지만. 
단, IE10부터 적용되지 않아 media 쿼리에 min-width를 따로 적용시켜야함.

# autofill vs autofit
https://studiomeal.com/archives/533
https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
` grid-template-columns : repeat(12,minmax(250px,1fr));`
이렇게 작성 시, new row는 wrap 되지 않음.
 auto-fill과 auto-fit의 차이는 row가 더 많은 column을 포함할 수 있을 정도로 넓을 때 나게 된다. 
  auto-fit 사용 시, 내용물이 늘어나 전체 row width를 채움. 
  auto-fill 사용 시, 브라우저는 빈 column이 row의 공간을 차지하도록 허용한다. auto-fill의 사용 경우가 더 많은 듯. 

# Dark mode
https://davidwalsh.name/prefers-color-scheme
http://yoonbumtae.com/?p=2440
https://gosink.in/javascript-css-toggle-dark-light-theme-based-on-your-users-preferred-scheme/
solution : https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting


# Modal 
파일을 따로 만들어서 해보려했으나 아직 컴포넌트화가 익숙치않아 포기.
처음엔 item의 render()안에서 onClick으로 모달을 생성해서 했는데, 해보니 모달이 아이템 개수만큼 생성됨.
SearchResult가 render될 때 modal을 생성시키고 new Item()의 인자로 같이 모달을 넘겨줘서 item의 클릭 시 모달의 visibility를 변화시킴.

# Lazy Load 개념
로딩을 뒤로 미루는 것. 레이지 로딩을 적용시키지 않은 웹페이지를 열면 브라우저가 모든 이미지를 읽고 불러와 DOM에 렌더링함. 
이미지가 많을 수록 오랜 시간이 걸림. 따라서 어떤 이미지를 로딩할 필요가 있으면 그 때 이미지를 불러옴. 스크롤 애니메이션을 통해 구현.
레이지 로딩을 사용하면 페이지가 placeholder 콘텐츠로 작성되며, 필요할 때만 실제 콘텐츠로 대체. 
  1. Intersection Observer API
   - 요소가 화면에 표시하는 것을 계산하는 코드를 작성. 대신 관찰자를 등록하기만 하면 되기 때문에 다양한 이벤트 핸들러에 의존한는 코드보다 사용하고 읽는 것이 쉽다. 
  2. window scroll event
  * 



https://medium.com/@krpeppermint100/js-%EB%A0%88%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9-%EA%B8%B0%EB%B2%95-5e3d5dfcb4c1





# ilovecat

https://github.com/woohyeonjo/ilovecat-javascript 의 프로젝트를 참고함

프로그래머스 2020 Dev-Matching
