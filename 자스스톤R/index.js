var 나 = {
  영웅: document.querySelector(".my-hero"),
  영웅data: [],
  덱: document.querySelector(".my-deck"),
  덱data: [],
  필드: document.querySelector(".my-cards"),
  필드data: [],
};

var 상대 = {
  영웅: document.querySelector(".rival-hero"),
  영웅data: [],
  덱: document.querySelector(".rival-deck"),
  덱data: [],
  필드: document.querySelector(".rival-cards"),
  필드data: [],
};

var 턴 = true;
var 턴버튼 = document.querySelector("#btn");

function Card(영웅, 내카드) {
  if (영웅) {
    this.att = Math.floor(Math.random() * 4 + 1);
    this.hp = Math.floor(Math.random() * 10 + 20);
    this.field = true;
    this.hero = true;
  } else {
    this.att = Math.floor(Math.random() * 5 + 1);
    this.hp = Math.floor(Math.random() * 5 + 1);
    this.cost = Math.floor((this.att + this.hp) / 2);
    this.field = false;
    if (내카드) {
      this.mine = true;
    }
  }
}

function 카드생성(영웅, 내카드) {
  return new Card(영웅, 내카드);
}

function 카드돔연결(데이터, dom, 영웅) {
  var 카드 = document.querySelector(".card").cloneNode(true);
  카드.querySelector(".att").textContent = 데이터.att;
  카드.querySelector(".hp").textContent = 데이터.hp;
  카드.querySelector(".cost").textContent = 데이터.cost;
  if (영웅) {
    카드.querySelector(".cost").style.display = "none";
  }

  카드.addEventListener("click", function () {
    if (턴) {
      //내가 클릭
      console.log(데이터);
      var 인덱스 = 나.덱data.indexOf(데이터);

      나.덱data.splice(인덱스, 1);
      나.필드data.push(데이터);

      나.필드data.forEach(function (data) {
        나.필드.innerHTML = "";
        카드돔연결(data, 나.필드, false);
      });

      나.덱data.forEach(function (data) {
        나.덱.innerHTML = "";
        카드돔연결(data, 나.덱, false);
        console.log(나.덱data);
      });
    } else {
    }
  });
  dom.appendChild(카드);
}

function 내덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    나.덱data.push(카드생성(false, true));
  }
  나.덱data.forEach(function (data) {
    카드돔연결(data, 나.덱, false);
  });
}

function 상대덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    상대.덱data.push(카드생성(false, true));
  }
  상대.덱data.forEach(function (data) {
    카드돔연결(data, 상대.덱, false);
  });
}

function 내영웅생성() {
  나.영웅data = 카드생성(true, true);

  카드돔연결(나.영웅data, 나.영웅, true);
}

function 상대영웅생성() {
  상대.영웅data = 카드생성(true, false);
  카드돔연결(상대.영웅data, 상대.영웅, true);
}

턴버튼.addEventListener("click", function () {
  턴 = !턴;
  if (턴) {
    document.querySelector("#rival").classList.remove("turn");
    document.querySelector("#my").classList.add("turn");
  } else {
    document.querySelector("#my").classList.remove("turn");
    document.querySelector("#rival").classList.add("turn");
  }
});

function 초기세팅() {
  내덱생성(5);
  상대덱생성(5);
  내영웅생성();
  상대영웅생성();
}

초기세팅();
