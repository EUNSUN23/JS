var tetris = document.querySelector("#tetris");
var tetrisData = [];
var currentBlock;
var nextBlock;

var currentTopLeft = [0, 3];
var blocks = [
  //도형이 아니라 3*3 or 4*4구역으로 판단함
  {
    name: "s", //네모
    center: false,
    numCode: 1,
    color: "red",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ],
    ],
  },

  {
    name: "t", //t자
    center: true,
    numCode: 2,
    color: "orange",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "z", //지그재그
    center: true,
    numCode: 3,
    color: "yellowgreen",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "zr", //반대지그재그
    center: true,
    numCode: 4,
    color: "green",
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  {
    name: "l", //l자
    center: true,
    numCode: 5,
    color: "pink",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ],
  },
  {
    name: "lr", //반대l
    center: false,
    numCode: 6,
    color: "navy",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  {
    name: "b", //1자
    center: true,
    numCode: 7,
    color: "violet",
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ],
  },
];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);

function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement("tr");
    fragment.appendChild("tr");
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement("td");
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}

function draw() {
tetrisData.forEach((col,i) => {
  forEach((raw, j) => {
    if(raw > 0){
      tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10-1] : 
    }else{
      tetris.children[i].children[j].className = '';
    }
  });
});

}

function drawNext() {}

function generate() {
  if (!currentBlock) {
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    currentBlock = nextBlock;
  }
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)];
  drawNext();
  currentTopLeft = [-1, 3];
  let isGameover = false;
  currentBlock.shape[0].slice(1).forEach((col, i) => { // 3*3을 2*3으로 만든 후 반복문
    col.forEach((row, j) => {
      if (row && tetrisData[i][j + 3]) {
        //게임오버판단
        isGameover = true;
      }
    });
  });
  currentBlock.shape[0].slice(1).forEach((col, i) => {
    col.forEach((row, j) => {
      if (row) {
        //블록 데이터 생성
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  if (isGameOver) {
    clearInterval();
    draw();
    alert("gameover");
  } else {
    draw();
  }
}

function tick(){//한칸 내리기
  const nextTopLeft = [currentTopLeft[0]+1, currentTopLeft[1]];
  const activeBlocks = [];
  let canGoDown = true;

}
init();
generate();
