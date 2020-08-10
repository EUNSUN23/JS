var 상대영웅 = document.getElementById("rival-hero");
var 내영웅 = document.getElementById("my-hero");
var 상대덱 = document.getElementById("rival-deck");
var 내덱 = document.getElementById("my-deck");
//화면과 별개의 관리용 데이터 만들기. push로 만든 카드 넣어줄것임.
var 상대덱data = [];
var 내덱data = [];
var 상대영웅data;
var 내영웅data;

function Card(영웅) {
  if (영웅) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5 + 25);
  } else {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
} // 카드 생성자. 카드찍어낼때마다 선언되는걸 막기 위해서 바깥에 둠.
// 인자로 true 넣을때는(매개변수 영웅에 true 대입) 영웅카드, 그냥 내버려두면 영웅이 undefined되면서 else이하(보통카드)

function 카드공장(영웅) {
  return new Card(영웅);
}

function 상대덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    상대덱data.push(카드공장());
  }
  상대덱data.forEach(function (data) {
    var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
    카드.querySelector(".cost").textContent = data.cost;
    카드.querySelector(".card-att").textContent = data.att;
    카드.querySelector(".card-hp").textContent = data.hp;
    상대덱.appendChild(카드);
  });
}

function 내덱생성(개수) {
  for (var i = 0; i < 개수; i++) {
    내덱data.push(카드공장());
  }
  내덱data.forEach(function (data) {
    var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
    카드.querySelector(".cost").textContent = data.cost;
    카드.querySelector(".card-att").textContent = data.att;
    카드.querySelector(".card-hp").textContent = data.hp;
    내덱.appendChild(카드);
  });
}

function 상대영웅생성() {
  상대영웅data = 카드공장(true);
  var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
  카드.querySelector(".card-att").textContent = 상대영웅data.att;
  카드.querySelector(".card-hp").textContent = 상대영웅data.hp;
  카드.querySelector(".cost").style.display = "none";
  상대영웅.appendChild(카드);
}

function 내영웅생성() {
  내영웅data = 카드공장(true);
  var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
  카드.querySelector(".card-att").textContent = 내영웅data.att;
  카드.querySelector(".card-hp").textContent = 내영웅data.hp;
  카드.querySelector(".cost").style.display = "none";
  내영웅.appendChild(카드);
}

function 초기세팅() {
  상대덱생성(5);
  내덱생성(5);
  내영웅생성();
  상대영웅생성();
}

초기세팅();
