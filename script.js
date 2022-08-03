var btn_create_table = document.querySelector(".btn-create-table");
var btn_move_foward = document.querySelector(".btn-move-foward");
var btn_move_left = document.querySelector(".btn-move-left");
var btn_move_right = document.querySelector(".btn-move-right");
var text_warning = document.querySelector("#text-warning");

btn_create_table.addEventListener("click", makerTable);
btn_move_foward.addEventListener("click", moveFoward);
btn_move_left.addEventListener("click", moveLeft);
btn_move_right.addEventListener("click", moveRight);

var terrenoX = document.querySelector("#terrenoX");
var terrenoY = document.querySelector("#terrenoY");

function makerTable() {
  if (terrenoX.value >= 5 && terrenoY.value >= 5) {
    makeBox();
  } else text_warning.innerHTML = "Tamanho do terreno inválido";
}

function makeBox() {
  let tr = document.createElement("tr");
  document.querySelector(".game-wrapper").appendChild(tr).className =
    "game-table";
  tr.style.setProperty(
    "grid-template-columns",
    `repeat(${terrenoY.value}, 1fr)`
  );

  for (let i = terrenoX.value - 1; i >= 0; i--) {
    for (let j = 0; j < terrenoY.value; j++) {
      let td = document.createElement("td");
      document.querySelector(".game-table").appendChild(td).className = "box";
      td.setAttribute("x", `${i}`);
      td.setAttribute("y", `${j}`);
    }
  }

  let img = document.createElement("img");
  let box = document.querySelector(
    `.box[x="${robot1.position.x}"][y="${robot1.position.y}"]`
  );
  let boxChild = box.appendChild(img);
  boxChild.id = "robot";
  boxChild.setAttribute("src", "./robot.png");
  boxChild.setAttribute("direction", robot1.direction);
  console.log(box);
}

function moveFoward() {
  move(robot1.direction);
  robot1.direction == "NORTH"
    ? (robot1.position.y = robot1.position.y + 1)
    : robot1.position.y;
  robot1.direction == "EAST"
    ? (robot1.position.x = robot1.position.x + 1)
    : robot1.position.x;
  robot1.direction == "SOUTH"
    ? (robot1.position.y = robot1.position.y - 1)
    : robot1.position.y;
  robot1.direction == "WEST"
    ? (robot1.position.x = robot1.position.x - 1)
    : robot1.position.x;

  let box = document.querySelector(
    `.box[x="${robot1.position.y}"][y="${robot1.position.x}"]`
  );
  let img = document.createElement("img");
  let boxChild = box.appendChild(img);
  boxChild.id = "robot";
  boxChild.setAttribute("src", "./robot.png");
  boxChild.setAttribute("direction", robot1.direction);
}

var robot1 = {
  position: {
    x: 0,
    y: 0,
  },
  direction: "NORTH",
};

function moveLeft() {
  robot1.direction = coordinates[robot1.direction].LEFT;
}

function moveRight() {
  robot1.direction = coordinates[robot1.direction].RIGHT;
}

var MAP_SIZE_Y = 5;
var MAP_SIZE_X = 5;
var MAP_SIZE = MAP_SIZE_X * MAP_SIZE_Y;

const coordinates = {
  NORTH: { LEFT: "WEST", RIGHT: "EAST" },
  EAST: { LEFT: "NORTH", RIGHT: "SOUTH" },
  SOUTH: { LEFT: "EAST", RIGHT: "WEST" },
  WEST: { LEFT: "SOUTH", RIGHT: "NORTH" },
};

var robot = {
  position: {
    x: 0,
    y: 0,
  },
  direction: "NORTH",
};

function move(direction) {
  direction == "NORTH" && robot.position.y + 1 < MAP_SIZE_Y
    ? robot.position.y++
    : robot.position.y;
  direction == "EAST" && robot.position.x + 1 < MAP_SIZE_X
    ? robot.position.x++
    : robot.position.x;
  direction == "SOUTH" && robot.position.y - 1 >= 0
    ? robot.position.y--
    : robot.position.y;
  direction == "WEST" && robot.position.x - 1 >= 0
    ? robot.position.x--
    : robot.position.x;
}

function rotate(direction) {
  direction == "R"
    ? (robot.direction = coordinates[robot.direction].RIGHT)
    : robot.direction;
  direction == "L"
    ? (robot.direction = coordinates[robot.direction].LEFT)
    : robot.direction;
}

function main(dados) {
  dados = dados.replace(/\s+/g, "").toUpperCase();
  for (let i = 0; i < dados.length; i++) {
    dados[i] != "L" && dados[i] != "R" && dados[i] != "M"
      ? console.log(`Caracter ${dados[i]} inválido`)
      : "";
    dados[i] == "L" || "R" ? rotate(dados[i]) : "";
    dados[i] == "M" ? move(robot.direction) : "";
    console.log("{dado:" + dados[i] + "}");
    console.log(robot);
    console.log("\n");
  }
}
