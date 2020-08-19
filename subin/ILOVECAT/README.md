
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
SearchResult가 render될 때 modal을 생성시키고 new Item()의 인자로 같이 모달을 넘겨줘서 item의 클릭 시 모달의 visibility 를 변화시킴.

# Lazy Load 개념
로딩을 뒤로 미루는 것. 레이지 로딩을 적용시키지 않은 웹페이지를 열면 브라우저가 모든 이미지를 읽고 불러와 DOM에 렌더링함. 
이미지가 많을 수록 오랜 시간이 걸림. 따라서 어떤 이미지를 로딩할 필요가 있으면 그 때 이미지를 불러옴. 스크롤 애니메이션을 통해 구현.
레이지 로딩을 사용하면 페이지가 placeholder 콘텐츠로 작성되며, 필요할 때만 실제 콘텐츠로 대체. 
  * 기본 로직
   1. img 태그에 data-src와 같은 data 어트리뷰트를 사용하여 해당 data         어트리뷰트에 실제 로드할 이미지 주소 기입
   2. 이미지들을 모두 읽어서 객체에 담는다.
   3. 해당 이미지가 로드가 완료되면 dara-src에 있는 주소값을 src값으로 셋팅,    data-src 어트리뷰트는 삭제.

  * 방법
  1. Intersection Observer API
   - 요소가 화면에 표시하는 것을 계산하는 코드를 작성. 대신 관찰자를 등록하기만 하면 되기 때문에 다양한 이벤트 핸들러에 의존한는 코드보다 사용하고 읽는 것이 쉽다. 호환성이 떨어짐. 
    뷰포트의 가장 위부터 계산하여 노출 여부를 판단.
    > ?가장 상단부터 현 페이지의 가장 밑, 교차지점까지만 노출 여부를 true로 판단하여 src에 img 주소를 넣어주고,  
    노출 여부가 false인 교차지점 밑부분은 true로 판단되지 않았으므로 여전히 img를 로드하지 않는 것 같다. 
  2. window scroll event
  * scroll을 감지하여 각 이미지에 대한 상단으로부터의 위치를 지정하고,
    그 위치가 페이지의 높이 내에 들어왔다면을 판단하여 이미지가 로딩될 타이밍을 계산

https://medium.com/@krpeppermint100/js-%EB%A0%88%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9-%EA%B8%B0%EB%B2%95-5e3d5dfcb4c1
https://scarlett-dev.gitbook.io/all/it/lazy-loading


# Event Delegation 
  DOM event delegation이란 각각의 child보다, 하나의 공통된 부모를 통해 ui-events를 대응시키는 것 ('bubbling'을 통해서.)
  한 마디로 부모한테 이벤트를 넣으면 자식 각각에도 적용된다는 개념인 듯.
  
  * benefit 
    - 새로운 element를 만들때마다 같은 방법을 적용하기 위해 onclick을 rebind할 필요 없음. 
    - event binding의 숫자가 줄어드므로 event listener가 사용하는 total 메모리 사용공간이 줄어든다는 것. 
  
  여기선 각각의 item에 onclick을 주는게 아니라 item의 부모 element에게 onclick을 주면 맞는 것 같음. 
  아니나다를까 모달 어떻게 썼는지 보니까 item.onclick으로 각각 이벤트를 줬었음. itemWrapper에 EventListener를 넣으니까 그대로 실행되긴 하는데 이게 정확히 event delegation이라고 할 수 있는건진 모르겠음. 


https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/ 버블링, 캡쳐링까지 쉽게 설명되어있음.
Q. delegation은 진행방향을 보면 버블링보단 캡처링이 맞는 거 같은데 왜 delegation을 버블링을 통해서라고 하는지?
https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation
> With event delegation the number of event bindings can be drastically decreed by moving them to a common parent element, and code that dynamically create new elements on the fly can be decoupled from the logic of binding their event handlers. 
delegation과 함께 이벤트 바인딩의 수를 공통 상위 요소로 이동시킴. 
즉석에서 새로운 요소를 동적으로 생성하는 코드는 이벤트 핸들러를 바인딩하는 논리에서 분리할 수 있다. 

>event.stopPropagation()을 통해 이벤트 버블링을 멈출 수도 있음. 그러나 잘 사용되지 않음. 

# Web Storage API

 새로고침을 눌러도 현재 정보가 사라지지 않도록, 유지하고 싶은 정보를 저장. Storage 객체는 단순한 key-value 저장소임. 하지만 페이지 로딩에도 온전하게 유지되며, key,value 는 항상 문자열. 
  이 API는 두 가지 저장소를 제공한다.  
 * Local Storage
  - 직접 데이터를 삭제하지 않는 한 계속 유지. 브라우저가 닫히거나 다시         열리더라도 유지함. 
 * Session Storage
  - 페이지 세션이 유지되는 동안 데이터가 유지. 

  단순하게 App.js에서 sessionStorage.setItem, getItem으로 저장해서만 하면 되지 않나 했는데 배열 형식이 아니라 searchResult에서 map이 실행이 안됨.
  그냥 그대로 `sessionStorage.getItem('data')` 했더니 문자 "[object object]" 이런 식으로 저장이 되어있었다.
  JSON 형식으로 왜 따로 바꿔주나 했는데 이 부분 때문에 따로 함수 적용하는 부분이 필요했음. 


# ilovecat

https://github.com/woohyeonjo/ilovecat-javascript 의 프로젝트를 참고함

프로그래머스 2020 Dev-Matching
