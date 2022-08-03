var mapX = document.getElementById("mapX");
var mapY = document.getElementById("mapY");

const myRobot = document.createElement("img");
myRobot.setAttribute("src", "./robot.png");

createGameMap();

window.onload = function () {
  document
    .getElementById(robot1.position.y + "x" + robot1.position.x)
    .appendChild(myRobot);
};

function createGameMap() {
  var tableBody = document.getElementById("gameMap");

  for (var i = 0; i < 5; i++) {
    var newRow = tableBody.insertRow(i);

    for (var j = 0; j < 5; j++) {
      var newCell = newRow.insertCell(j);
      newCell.id = i + "x" + j;
      newCell.className = "celula";
    }
  }
}

function robotMove() {
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

  document
    .getElementById(robot1.position.y + "x" + robot1.position.x)
    .appendChild(myRobot);
  console.log(
    robot1.position.y + "x" + robot1.position.x + "x" + robot1.direction
  );
}

function limparTabela() {
  document.querySelectorAll("#gameMap  tbody tr").forEach((a) => {
    a.remove();
  });
  robot.position.x = 0;
  robot.position.y = 0;
  robot.direction = "NORTH";
}

function moveLeft() {
  robot1.direction = coordinates[robot.direction].LEFT;
}

function moveRight() {
  robot1.direction = coordinates[robot.direction].RIGHT;
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
