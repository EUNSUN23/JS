var board = document.createElement("div");
board.classList.add("board");
document.body.appendChild(board);
var 가로 = 4;
var 세로 = 3;
var 시작시간;
var 클릭실행 = true;
var 클릭칸 = [];
var 완성칸 = [];
var 색깔자료 = [
  "red",
  "orange",
  "yellow",
  "pink",
  "beige",
  "green",
  "red",
  "orange",
  "yellow",
  "pink",
  "beige",
  "green",
];
var 색깔 = 색깔자료.slice();
var 색깔후보 = [];
function 색깔뽑기() {
  while (색깔.length > 0) {
    var 뽑기 = 색깔.splice(Math.floor(Math.random() * 색깔.length), 1)[0];
    색깔후보.push(뽑기);
  }
}

색깔뽑기();

function 카드세팅() {
  클릭실행 = false;
  for (var i = 0; i < 가로 * 세로; i++) {
    var card = document.createElement("div");
    card.classList.add("card");
    board.append(card);
    var cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    card.append(cardInner);
    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardInner.append(cardFront);
    var cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundColor = 색깔후보[i];
    cardInner.append(cardBack);
    (function (c) {
      시작시간 = new Date();
      card.addEventListener("click", function () {
        if (클릭실행 && !클릭칸.includes(c) && !완성칸.includes(c)) {
          클릭칸.push(c);
          c.classList.toggle("flipped");
          if (클릭칸.length === 2) {
            setTimeout(function () {
              클릭실행 = false;
            }, 100);
            setTimeout(function () {
              클릭실행 = true;
            }, 1300);
            if (
              클릭칸[0].querySelector(".card-back").style.backgroundColor ===
              클릭칸[1].querySelector(".card-back").style.backgroundColor
            ) {
              완성칸.push(클릭칸[0]);
              완성칸.push(클릭칸[1]);
              클릭칸 = [];
              if (완성칸.length === 가로 * 세로) {
                setTimeout(function () {
                  var 끝시간 = new Date();
                  alert(`성공! ${(끝시간 - 시작시간) / 1000}초 걸렸습니다`);
                  완성칸 = [];
                  클릭칸 = [];
                  board.innerHTML = "";
                  색깔 = 색깔자료.slice();
                  색깔뽑기();
                  카드세팅();
                }, 1000);
              }
            } else {
              setTimeout(function () {
                클릭칸[0].classList.remove("flipped");
                클릭칸[1].classList.remove("flipped");
                클릭칸 = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelectorAll(".card").forEach(function (card, index) {
      setTimeout(function () {
        card.classList.add("flipped");
      }, 1000 + 100 * index);
    });
    setTimeout(function () {
      document.querySelectorAll(".card").forEach(function (card) {
        card.classList.remove("flipped");
      });
      클릭실행 = true;
    }, 5000);
  }
}

카드세팅();
