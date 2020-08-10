var 가위바위보 = {
  가위: "-200px",
  바위: 0,
  보: "300px",
};

var 점수표 = {
  가위: -1,
  바위: 0,
  보: 1,
};

//컴퓨터로 무한 가위바위보 돌리기(background의 position값 계속 바꿔주기)
var width = 0;
var 인터벌;
var 인터벌메이커 = function () {
  인터벌 = setInterval(function () {
    if (width === 0) {
      width = 가위바위보.보;
    } else if (width === 가위바위보.보) {
      width = 가위바위보.가위;
    } else {
      width = 가위바위보.바위;
    }
    document.querySelector(
      "#computer"
    ).style.background = `url(rcp.png) ${width} 0`;
  }, 100);
};

인터벌메이커();

//버튼클릭하면 나의답 내고, 컴퓨터의답 내고, 둘이 비교해서 승부결과 표현하기.
//컴퓨터무한반복 잠시멈췄다가 다시 실행하기.

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    clearTimeout(인터벌);
    setTimeout(function () {
      return 인터벌메이커();
    }, 1000);
    //클릭했을 때 나의선택과 컴퓨터선택 출력
    //*컴퓨터의선택 --> width값이 바뀌면 그 바뀐 width값에 따른 키(가위,바위,보)값을 return하는 함수만들어주기.
    var 나의선택 = this.textContent;
    function 컴퓨터의선택(width) {
      return Object.entries(가위바위보).find(function (v) {
        return v[1] === width;
      })[0];
    }
    console.log(나의선택, 컴퓨터의선택(width));

    //나의선택과 컴퓨터의선택 비교해서 승부결과 표시하기.
    /*같은값이면 비기고, ??하면 이기고, ??하면 지고. 승부규칙을 수학적으로표현해보자.  
    1,0,-1를 키-속성값으로 넣어서.  */

    if (점수표[나의선택] - 점수표[컴퓨터의선택(width)] === 0) {
      console.log("비겼습니다!");
    } else if (
      [1, -2].includes(점수표[나의선택] - 점수표[컴퓨터의선택(width)])
    ) {
      console.log("이겼습니다!!");
    } else {
      console.log("졌습니다ㅠㅠ");
    }
  });
});
