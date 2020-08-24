var 테이블 = document.getElementById("table");
var 데이터 = [];
var 빈칸배열 = [];
var 점수표 = document.getElementById("score");
var 시작좌표;
var 끝좌표;
var 드래그시작 = false; //마우스가 드래그하는 방향알기 screenx : 모니터기준좌표 pagex:페이지(스크롤포함), clientx:브라우저화면기준, offsetx:이벤트타겟기준
var 드래그중 = false;

function 초기화() {
  var fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(function () {
    // for문 대신 forEach로.
    var 열데이터 = [];
    데이터.push(열데이터);
    var tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      열데이터.push(0);
      var td = document.createElement("td");
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  테이블.appendChild(fragment);
}

function 랜덤생성() {
  // 화면의 빈칸을 돌면서 랜덤으로 한군데에 숫자 2넣기
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (!행데이터) {
        //조건문에서 '0'은 '거짓'임. 빈칸임.
        빈칸배열.push([i, j]);
        console.log(빈칸배열);
      }
    });
  });
  if (빈칸배열.length === 0) {
    // 게임끝나면 다시 테이블을 전부 0인 배열로 초기화.
    alert(`게임오버: ${점수표.textContent}`);
    테이블.innerHTML = "";
    초기화();
  } else {
    var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
    if (!데이터[랜덤칸[0]][랜덤칸[1]]) {
      데이터[랜덤칸[0]][랜덤칸[1]] = 2;
    }

    그리기();
    console.log(랜덤칸);
  }
}

function 그리기() {
  //화면에 데이터 연결해서 그리기
  데이터.forEach(function (열데이터, i) {
    열데이터.forEach(function (행데이터, j) {
      if (행데이터 > 0) {
        테이블.children[i].children[j].textContent = 행데이터;
      } else {
        테이블.children[i].children[j].textContent = "";
      }
      //테이블에 자동으로 tbody생기지는 않는지 주의.
    });
  });
}

초기화();
랜덤생성();
그리기();

window.addEventListener("mousedown", function (이벤트) {
  드래그시작 = true;
  시작좌표 = [이벤트.clientX, 이벤트.clientY];
});
window.addEventListener("mousemove", function (이벤트) {
  if (드래그시작) {
    드래그중 = true;
  }
});
window.addEventListener("mouseup", function (이벤트) {
  if (드래그중) {
    //클릭했다가 바로 떼었을 때는 방향이 나오지 않도록
    var 방향;
    끝좌표 = [이벤트.clientX, 이벤트.clientY];
    var x차이 = 끝좌표[0] - 시작좌표[0];
    var y차이 = 끝좌표[1] - 시작좌표[1];

    if (x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = "왼쪽";
    } else if (x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
      방향 = "오른쪽";
    } else if (y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = "위";
    } else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
      방향 = "아래";
    }
  }
  드래그시작 = false;
  드래그중 = false;
  switch (방향) {
    case "왼쪽":
      var 새데이터 = [[], [], [], []];
      데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
          if (행데이터) {
            if (
              새데이터[i][새데이터[i].length - 1] &&
              새데이터[i][새데이터[i].length - 1] === 행데이터
            ) {
              //행데이터는 push로 뒤에서부터 들어옴. 새데이터[i]의 0번째,1번째2번째 요소..
              새데이터[i][새데이터[i].length - 1] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[i][0];
            } else {
              새데이터[i].push(행데이터); //행은 그대로, 열데이터 인덱스만 감소해야 왼쪽으로 이동함.
            }
          }
        });
      });

      [1, 2, 3, 4].forEach(function (열데이터, i) {
        [1, 2, 3, 4].forEach(function (행데이터, j) {
          데이터[i][j] = 새데이터[i][j] || 0; // 왼쪽 정렬하려면 행그대로, 열은 왼쪽에서부터 데이터가 0번째-1번째 이렇게 쌓여야한다.
        });
      });

      break;
    case "오른쪽": //오른쪽도 왼쪽과 마찬가지로 줄고정. 다만 행데이터가 unshift로 새데이터의 앞쪽부터 들어오고,
      var 새데이터 = [[], [], [], []];
      데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
          console.log(행데이터);
          if (행데이터) {
            if (새데이터[i][0] && 새데이터[i][0] === 행데이터) {
              새데이터[i][0] *= 2;
            } else {
              새데이터[i].unshift(행데이터);
            }
          }
        });
      });

      [1, 2, 3, 4].forEach(function (열데이터, i) {
        [1, 2, 3, 4].forEach(function (행데이터, j) {
          데이터[i][3 - j] = 새데이터[i][j] || 0;
        });
      });

      break;
    case "위":
      //데이터배열의 숫자들을(0아닌경우)열별로 데이터배열 첫 행으로(맨위로) 올리기
      var 새데이터 = [[], [], [], []];
      데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
          if (행데이터) {
            if (
              새데이터[j][새데이터[j].length - 1] &&
              새데이터[j][새데이터[j].length - 1] === 행데이터
            ) {
              새데이터[j][새데이터[j].length - 1] *= 2;
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
            } else {
              새데이터[j].push(행데이터);
            }
          }
        });
      });

      [1, 2, 3, 4].forEach(function (행데이터, i) {
        [1, 2, 3, 4].forEach(function (열데이터, j) {
          데이터[j][i] = 새데이터[i][j] || 0;
        });
      });

      break;
    case "아래":
      var 새데이터 = [[], [], [], []];
      데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
          if (행데이터) {
            if (새데이터[j][0] && 새데이터[j][0] === 행데이터) {
              새데이터[j][0] *= 2;
            } else {
              var 현점수 = parseInt(점수표.textContent, 10);
              점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
              새데이터[j].unshift(행데이터);
            }
          }
        });
      });

      [1, 2, 3, 4].forEach(function (행데이터, i) {
        [1, 2, 3, 4].forEach(function (열데이터, j) {
          데이터[3 - j][i] = 새데이터[i][j] || 0;
        });
      });

      break;
  }
  그리기();
  console.log(새데이터);
  console.log(데이터);
  랜덤생성();
});
