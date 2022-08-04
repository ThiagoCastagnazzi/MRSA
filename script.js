var mapXValue = document.getElementById("mapX");
var mapYValue = document.getElementById("mapY");
var robot_positionX = document.getElementById("robot-position-X");
var robot_positionY = document.getElementById("robot-position-Y");
var robot_direction = document.getElementById("robot-direction");

var mapX = mapXValue.value;
var mapY = mapYValue.value;

var robot1 = {
  position: {
    x: 0,
    y: 0,
  },
  direction: "NORTH",
};

const myRobot = document.createElement("img");
myRobot.setAttribute("src", "./robot.png");

createGameMap();

function robotPosition() {
  robot_positionX.innerHTML = `X: ${robot1.position.x}`;
  robot_positionY.innerHTML = `Y: ${robot1.position.y}`;
  robot_direction.innerHTML = `Direction: ${robot1.direction}`;
}

function render() {
  document
    .getElementById(robot1.position.y + "x" + robot1.position.x)
    .appendChild(myRobot);
  myRobot.setAttribute("direction", robot1.direction);
}

function createGameMap() {
  robotPosition();
  limparTabela();

  var mapX = mapXValue.value;
  var mapY = mapYValue.value;
  console.log(`Mapa X: ${mapX} Mapa Y: ${mapY}`);
  if (mapX < 5 || mapY < 5) {
    alert("Terreno minimo de 5x5");
  } else {
    var tableBody = document.getElementById("gameMap");

    for (var i = 0; i < mapX; i++) {
      var newRow = tableBody.insertRow(i);

      for (var j = 0; j < mapY; j++) {
        var newCell = newRow.insertCell(j);
        newCell.id = i + "x" + j;
        newCell.className = "celula";
      }
    }
  }
  render();
}

function robotRotate() {
  document.getElementById(robot1.position.y + "x" + robot1.position.x);
  myRobot.setAttribute("direction", robot1.direction);
  myRobot.style.setProperty(
    "transform",
    `rotate(${
      robot1.direction == "NORTH"
        ? 0
        : robot1.direction == "EAST"
        ? 90
        : robot1.direction == "SOUTH"
        ? 180
        : 270
    }deg)`
  );
  robotPosition();
}

function robotMove() {
  robot1.direction == "NORTH" && robot1.position.y + 1 < mapY
    ? robot1.position.y++
    : robot1.position.y;
  robot1.direction == "EAST" && robot1.position.x + 1 < mapX
    ? robot1.position.x++
    : robot1.position.x;
  robot1.direction == "SOUTH" && robot1.position.y - 1 >= 0
    ? robot1.position.y--
    : robot1.position.y;
  robot1.direction == "WEST" && robot1.position.x - 1 >= 0
    ? robot1.position.x--
    : robot1.position.x;

  document
    .getElementById(robot1.position.y + "x" + robot1.position.x)
    .appendChild(myRobot);
  myRobot.setAttribute("direction", robot1.direction);
  myRobot.style.setProperty(
    "transform",
    `rotate(${
      robot1.direction == "NORTH"
        ? 0
        : robot1.direction == "EAST"
        ? 90
        : robot1.direction == "SOUTH"
        ? 180
        : 270
    }deg)`
  );
  robotPosition();
}

function limparTabela() {
  robot1.position.x = 0;
  robot1.position.y = 0;
  robot1.direction = "NORTH";
  robotRotate();
  robotPosition();
  document.querySelectorAll("#gameMap  tbody tr").forEach((a) => {
    a.remove();
  });
}

function moveLeft() {
  robot1.direction = coordinates[robot1.direction].LEFT;
  robotRotate();
}

function moveRight() {
  robot1.direction = coordinates[robot1.direction].RIGHT;
  robotRotate();
}

// NODE EXEC BELOW

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
    console.log(`Posição: ${robot.position.x}x${robot.position.y}`);
    console.log(`Direção: ${robot.direction}`);
    console.log("\n");
  }
}

main("MML");
