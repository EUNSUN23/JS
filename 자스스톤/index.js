var 나 = {
  영웅: document.getElementById("my-hero"),
  덱: document.getElementById("my-deck"),
  필드: document.getElementById("my-cards"),
  코스트: document.getElementById("my-cost"),
  덱data: [],
  영웅data: [],
  필드data: [],
  선택카드: null,
  선택카드data: null,
};
var 상대 = {
  영웅: document.getElementById("rival-hero"),
  덱: document.getElementById("rival-deck"),
  필드: document.getElementById("rival-cards"),
  코스트: document.getElementById("rival-cost"),
  덱data: [],
  영웅data: [],
  필드data: [],
  선택카드: null,
  선택카드data: null,
};

var 턴 = true;
var 턴버튼 = document.getElementById("turn-button");

function 덱에서필드로(내턴, 데이터) {
  var 객체 = 내턴 ? 나 : 상대;
  var 현재코스트 = Number(객체.코스트.textContent);
  if (현재코스트 < 데이터.cost) {
    return true;
  }
  데이터.field = true;
  var idx = 객체.덱data.indexOf(데이터);
  객체.덱data.splice(idx, 1);
  객체.필드data.push(데이터);
  객체.덱.innerHTML = "";
  객체.필드.innerHTML = "";
  객체.필드data.forEach(function (데이터) {
    카드돔연결(데이터, 객체.필드);
  });
  객체.덱data.forEach(function (데이터) {
    카드돔연결(데이터, 객체.덱);
  });
  console.log(데이터.cost);
  객체.코스트.textContent = 현재코스트 - Number(데이터.cost);
}

function 화면다시그리기(내화면) {
  //이미 있는 card데이터들로 화면 다시구성하기.
  var 객체 = 내화면 ? 상대 : 나;
  객체.필드.innerHTML = "";
  객체.덱.innerHTML = "";
  객체.영웅.innerHTML = "";
  객체.필드data.forEach(function (데이터) {
    카드돔연결(데이터, 객체.필드);
  });
  객체.덱data.forEach(function (데이터) {
    카드돔연결(데이터, 객체.덱);
  });
  카드돔연결(객체.영웅data, 객체.영웅, true);
}

function 카드돔연결(데이터, dom, 영웅) {
  var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
  카드.querySelector(".cost").textContent = 데이터.cost;
  카드.querySelector(".card-att").textContent = 데이터.att;
  카드.querySelector(".card-hp").textContent = 데이터.hp;
  if (영웅) {
    var 이름 = document.createElement("div");
    이름.textContent = "영웅";
    카드.appendChild(이름);
    카드.querySelector(".cost").style.display = "none";
  }
  카드.addEventListener("click", function () {
    console.log(카드, 데이터);
    if (턴) {
      console.log(카드.classList.contains("card-turnover"));
      if (카드.classList.contains("card-turnover")) {
        return;
      }
      if (!데이터.mine && 나.선택카드) {
        데이터.hp = 데이터.hp - 나.선택카드data.att;
        화면다시그리기(true);

        나.선택카드.classList.remove("card-selected");

        나.선택카드.classList.add("card-turnover");

        나.선택카드 = null;
        나.선택카드data = null; //카드를 담은 선택카드/선택카드data를 null로 해도 본 카드의

        return;
      } else if (!데이터.mine) {
        return;
      }
      if (데이터.mine && 데이터.field) {
        카드.parentNode.querySelectorAll(".card").forEach(function (card) {
          card.classList.remove("card-selected");
        });
        카드.classList.add("card-selected");
        나.선택카드 = 카드;
        나.선택카드data = 데이터;
        //클릭할때마다 중복select하지않고 클릭한것만 selected되도록.
      } else {
        if (덱에서필드로(true, 데이터) !== "end") {
          //현재코스트가 data.cost보다 작을 때 덱에서필드로()는 true 반환함.
          내덱생성(1);
        }
      }
    } else {
      if (카드.classList.contains("card-turnover")) {
        return;
      }
      if (데이터.mine && 상대.선택카드) {
        데이터.hp = 데이터.hp - 상대.선택카드data.att;
        화면다시그리기(false);
        상대.선택카드.classList.remove("card-selected");
        상대.선택카드.classList.add("card-turnover");
        상대.선택카드 = null;
        상대.선택카드data = null; //카드를 담은 선택카드/선택카드data를 null로 해도 본 카드의
        return;
      } else if (데이터.mine) {
        return;
      }
      if (!데이터.mine && 데이터.field) {
        카드.parentNode.querySelectorAll(".card").forEach(function (card) {
          card.classList.remove("card-selected");
        });
        카드.classList.add("card-selected");
        상대.선택카드 = 카드;
        상대.선택카드data = 데이터;
      } else {
        if (덱에서필드로(false, 데이터) !== "end") {
          // 함수를 조건에 넣을경우 함수가 실행되면서 조건을 살피므로 함수가 중복실행되지 않게하기.
          //현재코스트가 data.cost보다 작을 때 덱에서필드로()는 true 반환함.
          상대덱생성(1);
        }
      }
    }
  });
  dom.appendChild(카드);
}

function Card(영웅, 내카드) {
  if (영웅) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5 + 25);
    this.hero = true;
    this.field = true;
  } else {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
    this.field = false;
  }
  if (내카드) {
    this.mine = true;
  }
} // 카드 생성자. 카드찍어낼때마다 선언되는걸 막기 위해서 바깥에 둠.
// 인자로 true 넣을때는(매개변수 영웅에 true 대입) 영웅카드, 그냥 내버려두면 영웅이 undefined되면서 else이하(보통카드)

function 카드공장(영웅, 내카드) {
  return new Card(영웅, 내카드);
}

function 상대덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    상대.덱data.push(카드공장(false, false));
  }
  상대.덱.innerHTML = "";
  상대.덱data.forEach(function (data1) {
    카드돔연결(data1, 상대.덱, false);
  });
}

function 내덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    나.덱data.push(카드공장(false, true));
  }

  나.덱.innerHTML = "";
  나.덱data.forEach(function (data2) {
    카드돔연결(data2, 나.덱);
  });
}

function 상대영웅생성() {
  상대.영웅data = 카드공장(true, false);
  카드돔연결(상대.영웅data, 상대.영웅, true);
}

function 내영웅생성() {
  나.영웅data = 카드공장(true, true);
  카드돔연결(나.영웅data, 나.영웅, true);
}

function 초기세팅() {
  상대덱생성(5);
  내덱생성(5);
  내영웅생성();
  상대영웅생성();
}
턴버튼.addEventListener("click", function () {
  턴 = !턴;
  document.getElementById("my").classList.toggle("turn");
  document.getElementById("rival").classList.toggle("turn");
  if (턴) {
    상대.코스트.textContent = 10;
  } else {
    나.코스트.textContent = 10;
  }
});
초기세팅();
