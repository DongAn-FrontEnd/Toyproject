const addButton = document.querySelector('#button-input');
const answerList = document.querySelector('#multiple_answer_list');
let answerArr;
let total;

function getItem(key){
    const value = localStorage.getItem(key);
    if(key === 'vocabulary') return value === null ? [] : JSON.parse(value);
    else return value === null ? [] : JSON.parse(value);
}
//LocalStorage로부터 JSON 객체 형식으로 불러오는 함수


const saveWord = ()=> {
    const inputWord = document.querySelector('#input-word');
    const inputMeaning = document.querySelector('#input-meaning');
    let wordObj = getItem("vocabulary");
    const newObj = {
        idx : wordObj.length,
        word : inputWord.value,
        meaning : inputMeaning.value, 
    };
    if(wordObj === null){
        wordObj = [newObj];
    }
    wordObj.push(newObj);
    localStorage.setItem('vocabulary',JSON.stringify(wordObj));
 
    inputWord.value = ''; //textContent가 아니라 value를 ''로 만들어줘야 
    inputMeaning.value = '';
}
//LocalStorage로부터 불러온 뒤 new Object를 생성하여 push, 다시 set 하는 형식으로 
//단어를 save


const displayQuiz= () =>{
    const wordObj = getItem('vocabulary'); //단어 object들 불러온다.
    const displayWord = document.querySelector("#quiz_word");
    //정답 index, 나머지 2개 index를 겹치지않게 추출해야 함
    const copy_wordObj = JSON.parse(JSON.stringify(wordObj)); //이미 사용한 단어 삭제 후 인덱스 변동을 하기 위해 copy를 만든다.
    console.log(JSON.stringify(localStorage).length);

    let arr = new Array(3).fill(0);
    answerArr = arr.map(val => {
        const idx = Math.floor(Math.random() * copy_wordObj.length);
        const ret = copy_wordObj[idx];
        copy_wordObj.splice(idx,1);
        return ret;
    });

   
    displayWord.textContent = answerArr[0].word;
    const range = [0, 1, 2];
    for(let i=0;i<3;i++){
        let idx = Math.floor(Math.random() * (range.length)); // 0~2
        answerList.children[i].textContent = answerArr[range[idx]].meaning;
        range.splice(idx,1);
    }
    
    //checkAnswer(answerArr);
};

    

function checkAnswer(e){
    if (e.target.textContent === answerArr[0].meaning) {
        alert("정답입니다.");
        total+=1;
        displayQuiz();
        displayScore();
    } else {
        alert("틀렸습니다.");
        }
}

function displayScore(){
    const score = document.querySelector('#score');
    console.log("scroe : "+score.textContent);
    score.textContent = "score : "+total;
}

function init(){
   let storage = getItem('vocabulary');
   total = 0;
   addButton.addEventListener("click", saveWord);
   answerList.addEventListener("click", checkAnswer);
   if(storage && storage.length > 3){
       displayQuiz();
       displayScore();
      }
}


init();
