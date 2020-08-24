const body = document.querySelector("body");

const IMG_NUMBER = 3;

/*노마드코더 스타일 : 첨부터 다 function으로 만들어버림. 
제로초에서 배운대로 하면 function으로 따로 밖으로 안꺼내고 
그냥 init안에서 필요한 변수, 함수 선언했을 것. 제로초 스타일이 처음 로직 생각해낼때 차근차근 하게 하는 장점있음. 
노마드코더 스타일로 한번, 제로초 스타일로 한번하고 리팩토링 해보기. */

function genRandomNumber() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `bgimg/${imgNumber}.jpg`;
  image.classList.add("bgimg");
  body.appendChild(image);
}

function init() {
  const randomNumber = genRandomNumber();
  paintImage(randomNumber);
}

init();
