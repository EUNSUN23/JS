var 바디 = document.body;
var 테이블 = document.createElement("table");
var 칸들 = [];
var 줄들 = [];
var 턴 = "X";
var 결과 = document.createElement("div");

var 콜백함수 = function (e) {
  var 몇줄 = 줄들.indexOf(e.target.parentNode);
  var 몇칸 = 칸들[몇줄].indexOf(e.target);
  //클릭한 칸이 빈 칸인지 아닌지 확인 -> 빈칸이면 체크
  if (칸들[몇줄][몇칸].textContent !== "") {
    console.log("빈칸아닙니다");
  } else {
    console.log("빈칸입니다");
    칸들[몇줄][몇칸].textContent = 턴;
    //방금 체크함으로써 가로/세로/대각선 줄이 1줄이라도 다 찼는지 검사.
    //가로줄 검사 '다참' 이 false가 될지 true가 될지
    var 다참 = false;
    if (
      칸들[몇줄][0].textContent === 턴 &&
      칸들[몇줄][1].textContent === 턴 &&
      칸들[몇줄][2].textContent === 턴
    ) {
      다참 = true;
    }
    //세로줄 검사
    if (
      칸들[0][몇칸].textContent === 턴 &&
      칸들[1][몇칸].textContent === 턴 &&
      칸들[2][몇칸].textContent === 턴
    ) {
      다참 = true;
    }
    //대각선 검사
    if (
      칸들[0][0].textContent === 턴 &&
      칸들[1][1].textContent === 턴 &&
      칸들[2][2].textContent === 턴
    ) {
      다참 = true;
    }

    if (
      칸들[0][2].textContent === 턴 &&
      칸들[1][1].textContent === 턴 &&
      칸들[2][0].textContent === 턴
    ) {
      다참 = true;
    }

    //다찼으면(위에서 다참이 true가 되면) 초기화시켜주고 결과 내보냄
    if (다참) {
      결과.textContent = `${턴}님이 승리!`;
      //초기화

      
      턴 = "X";
      칸들.forEach(function (줄) {
        줄.forEach(function (칸) {
          칸.textContent = "";
        });
      });
    } else {
      // 다 안 찼으면 턴 바꾸기(컴퓨터의 턴)
      턴 = "O";
      //forEach는 자체로 배열을 return값으로 내지 못한다. 배열에 push해서 return한거면 몰라도.  
      var 후보칸 = 칸들.forEach(function (줄) {
        줄.filter(function (칸) {
          return 칸.textContent === "";
        });
      });
      console.log(후보칸);
      

      if (
        칸들[몇줄][0].textContent === 턴 &&
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent === 턴
      ) {
        다참 = true;
      }
      //세로줄 검사
      if (
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴
      ) {
        다참 = true;
      }
      //대각선 검사
      if (
        칸들[0][0].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][2].textContent === 턴
      ) {
        다참 = true;
      }

      if (
        칸들[0][2].textContent === 턴 &&
        칸들[1][1].textContent === 턴 &&
        칸들[2][0].textContent === 턴
      ) {
        다참 = true;
      }
      if (다참) {
        결과.textContent = `${턴}님이 승리!`;
        //초기화
        턴 = "X";
        칸들.forEach(function (줄) {
          줄.forEach(function (칸) {
            칸.textContent = "";
          });
        });
      }
    }
  }
};

for (var i = 1; i <= 3; i++) {
  var 줄 = document.createElement("tr");
  줄들.push(줄);
  칸들.push([]);

  for (var j = 1; j <= 3; j++) {
    var 칸 = document.createElement("td");
    칸들[i - 1].push(칸);
    칸.addEventListener("click", 콜백함수);
    줄.appendChild(칸);
  }
  테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.append(결과);
console.log(칸들);
