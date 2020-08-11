var 상대영웅 = document.getElementById("rival-hero");
var 내영웅 = document.getElementById("my-hero");
var 상대덱 = document.getElementById("rival-deck");
var 내덱 = document.getElementById("my-deck");
var 내필드 = document.getElementById("my-cards");
var 상대필드 = document.getElementById("rival-cards");
//화면과 별개의 관리용 데이터 만들기. push로 만든 카드 넣어줄것임.
var 내카드;
var 상대덱data = [];
var 내덱data = [];
var 상대영웅data;
var 내영웅data;
var 상대필드data = [];
var 내필드data = [];
var 내코스트 = document.getElementById("my-cost");
var 상대코스트 = document.getElementById("rival-cost");
var 턴 = true;
var 턴버튼 = document.getElementById("turn-button");

function 카드돔연결(data, dom, 영웅) {
  var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
  카드.querySelector(".cost").textContent = data.cost;
  카드.querySelector(".card-att").textContent = data.att;
  카드.querySelector(".card-hp").textContent = data.hp;
  if (영웅) {
    var 이름 = document.createElement("div");
    이름.textContent = "영웅";
    카드.appendChild(이름);
    카드.querySelector(".cost").style.display = "none";
  }
  카드.addEventListener("click", function (card) {
    if (턴) {
      console.log(data);
      console.log(data.mine);
      var 현재코스트 = Number(내코스트.textContent);
      if (현재코스트 < data.cost) {
        return;
      }
      if (!data.mine || data.field) {
        // data가 객체타입이기때문에 다 가능. 참조관계라 어디서 바꿔도 수정이 됨.
        return;
      }
      var idx = 내덱data.indexOf(data);
      내덱data.splice(idx, 1);
      data.field = true;
      내필드data.push(data);
      내덱.innerHTML = "";
      내필드.innerHTML = "";
      내필드data.forEach(function (data) {
        카드돔연결(data, 내필드);
      });
      내덱data.forEach(function (data) {
        카드돔연결(data, 내덱);
      });
      console.log(data.cost);
      내코스트.textContent = 현재코스트 - Number(data.cost);
      내덱생성(1);
    } else {
      if (data.mine || data.field) {
        return;
      }
      var 현재코스트 = Number(상대코스트.textContent);
      if (현재코스트 < data.cost) {
        return;
      }
      var idx = 상대덱data.indexOf(data);
      상대덱data.splice(idx, 1);
      data.field = true;
      상대필드data.push(data);
      상대덱.innerHTML = "";
      상대필드.innerHTML = "";
      상대필드data.forEach(function (data) {
        카드돔연결(data, 상대필드);
      });
      상대덱data.forEach(function (data) {
        카드돔연결(data, 상대덱);
      });
      console.log(data.cost);
      상대코스트.textContent = 현재코스트 - Number(data.cost);
      상대덱생성(1);
    }
  });
  dom.appendChild(카드);
}

function Card(영웅, 내카드) {
  if (영웅) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5 + 25);
    this.hero = true;
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
    상대덱data.push(카드공장(false, false));
  }
  상대덱.innerHTML = "";
  상대덱data.forEach(function (data) {
    카드돔연결(data, 상대덱);
  });
}

function 내덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    내덱data.push(카드공장(false, true));
  }
  내덱.innerHTML = "";
  내덱data.forEach(function (data) {
    카드돔연결(data, 내덱);
  });
}

function 상대영웅생성() {
  상대영웅data = 카드공장(true, false);
  카드돔연결(상대영웅data, 상대영웅, true);
}

function 내영웅생성() {
  내영웅data = 카드공장(true, true);
  카드돔연결(내영웅data, 내영웅, true);
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
    상대코스트.textContent = 10;
  } else {
    내코스트.textContent = 10;
  }
});
초기세팅();
