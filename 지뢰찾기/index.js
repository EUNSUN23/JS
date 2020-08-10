var tbody = document.querySelector("#table tbody");
var dataset = [];

document.querySelector("#exec").addEventListener("click", function () {
  //내부 먼저 초기화
  tbody.innerHTML = "";
  //ver,hor 입력했을 때 입력한 값대로 화면에 지뢰찾기칸 출력(화면 테이블 구성) & 화면 시뮬레이트하는 이차원배열 만들기(dataset > arr > 1)
  var ver = parseInt(document.querySelector("#ver").value);
  var hor = parseInt(document.querySelector("#hor").value);
  var mine = parseInt(document.querySelector("#mine").value);
  console.log(hor, ver, mine);

  //지뢰 테이블 만들기

  for (var i = 0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);
    for (var j = 0; j < hor; j++) {
      arr.push(1);
      var td = document.createElement("td");
      //td 우클릭했을 때 몇번째 줄,칸인지 알기.(깃발꼽기위해)
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var 부모tr = e.currentTarget.parentNode;
        var 부모tbody = e.currentTarget.parentNode.parentNode;
        e.currentTarget, e.target;
        var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
        var 줄 = Array.prototype.indexOf.call(부모tbody.children, tr);
        console.log(줄, 칸);
        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          if (dataset[줄][칸] === 1) {
            e.currentTarget.textContent = "";
          } else if (dataset[줄][칸] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log(dataset);

  // ver(세로)*hor(가로) 100개 중 랜덤숫자 20개 뽑기(지뢰위치뽑기) .
  // 뽑은 20개에 지뢰심기
  /* 59 --> 화면상 6줄 9번째칸 */
  //지뢰후보만들기, 지뢰심기

  var 후보군 = Array(ver * hor)
    .fill()
    .map(function (요소, 인덱스) {
      return 인덱스;
    });
  var 후보군배열 = [];
  while (후보군.length > 80) {
    var 뽑기 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
    후보군배열.push(뽑기);
  }

  console.log(후보군배열);

  for (var k = 0; k < 후보군배열.length; k++) {
    // EX: 59라면 세로 6번째 가로 9번째
    var 세로 = Math.floor(후보군배열[k] / 10); // 59 -> 5 / 6 -> 0
    var 가로 = 후보군배열[k] % 10; // 59 -> 9 / 6 -> 6
    tbody.children[세로].children[가로].textContent = "X"; // 배열상에서는 세로 6번째, 가로 9번째.
    dataset[세로][가로] = "X";
  }
});
