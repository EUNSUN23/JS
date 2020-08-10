var 가로 = 4;
var 세로 = 3;
var 클릭플래그 = true;
var 카드판 = document.querySelector(".frame");
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;
var 색깔들 = [
  "red",
  "red",
  "orange",
  "orange",
  "pink",
  "pink",
  "yellow",
  "yellow",
  "green",
  "green",
  "beige",
  "beige",
];
var 색깔후보 = 색깔들.slice();
var 색깔 = [];
function 셔플() {
  while (색깔후보.length > 0) {
    색깔 = 색깔.concat(
      색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1)
    );
  }
}

function 카드세팅(가로, 세로) {
  클릭플래그 = false;
  for (var i = 0; i < 가로 * 세로; i++) {
    var card = document.createElement("div");
    card.className = "card";
    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    var cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.style.backgroundColor = 색깔[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener("click", function () {
        if (클릭플래그 && !완성카드.includes(c) && !클릭카드.includes(c)) {
          c.classList.toggle("flipped");
          클릭카드.push(c);
          if (클릭카드.length === 2) {
            setTimeout(function () {
              클릭플래그 = false;
            }, 100);
            setTimeout(function () {
              클릭플래그 = true;
            }, 1500);
            if (
              클릭카드[0].querySelector(".card-back").style.backgroundColor ===
              클릭카드[1].querySelector(".card-back").style.backgroundColor
            ) {
              완성카드.push(클릭카드[0]);
              완성카드.push(클릭카드[1]);
              클릭카드 = [];
              console.log(완성카드.length);
              if (완성카드.length === 가로 * 세로) {
                var 끝시간 = new Date();
                클릭플래그 = false;
                setTimeout(function () {
                  alert(`성공! ${(끝시간 - 시작시간) / 1000} 초 걸렸습니다. `);
                  카드판.innerHTML = "";
                  완성카드 = [];
                  색깔 = [];
                  색깔후보 = 색깔들.slice();
                  셔플();
                  카드세팅(가로, 세로);
                }, 1000);
              }
            } else {
              setTimeout(function () {
                클릭카드[0].classList.remove("flipped");
                클릭카드[1].classList.remove("flipped");
                클릭카드 = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    카드판.appendChild(card);
  }
  document.body.appendChild(카드판);

  document.querySelectorAll(".card").forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });

  setTimeout(function () {
    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.remove("flipped");
    });
    클릭플래그 = true;
    시작시간 = new Date();
  }, 5000);
}

셔플();
카드세팅(가로, 세로);
