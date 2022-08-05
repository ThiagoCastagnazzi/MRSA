var mapXValue = document.getElementById("mapX");
var mapYValue = document.getElementById("mapY");
var mapX = mapXValue.value;
var mapY = mapYValue.value;
var robot_positionX = document.getElementById("robot-position-X");
var robot_positionY = document.getElementById("robot-position-Y");
var robot_direction = document.getElementById("robot-direction");
var robot_command = document.getElementById("robot-command");

var robot = {
  position: {
    x: 0,
    y: 0,
  },
  direction: "NORTH",
};

const coordinates = {
  NORTH: { LEFT: "WEST", RIGHT: "EAST" },
  EAST: { LEFT: "NORTH", RIGHT: "SOUTH" },
  SOUTH: { LEFT: "EAST", RIGHT: "WEST" },
  WEST: { LEFT: "SOUTH", RIGHT: "NORTH" },
};

const myRobot = document.createElement("img");
myRobot.setAttribute("src", "../../assets/imgs/robot.png");

createGameMap();

function robotPosition() {
  robot_positionX.innerHTML = `X: ${robot.position.y}`;
  robot_positionY.innerHTML = `Y: ${robot.position.x}`;
  robot_direction.innerHTML = `${robot.direction}`;
}

function render() {
  document
    .getElementById(robot.position.y + "x" + robot.position.x)
    .appendChild(myRobot);
  myRobot.setAttribute("direction", robot.direction);
}

function createGameMap() {
  robotPosition();
  limparTabela();
  var x = document.getElementById("mapX");
  var y = document.getElementById("mapY");
  mapX = x.value;
  mapY = y.value;
  var tableBody = document.getElementById("gameMap");

  if (mapX < 5 || mapY < 5 || mapX > 8 || mapY > 8) {
    alert("O mapa deve ter entre 5 e 8 linhas e colunas");
    mapX = 5;
    mapY = 5;
  }
  for (var i = 0; i < mapY; i++) {
    var newRow = tableBody.insertRow(i);

    for (var j = 0; j < mapX; j++) {
      var newCell = newRow.insertCell(j);
      newCell.id = i + "x" + j;
      newCell.className = "celula";
    }
  }

  render();
}

function runCommand() {
  var dados = robot_command.value;
  dados = dados.replace(/\s+/g, "").toUpperCase();
  for (let i = 0; i < dados.length; i++) {
    getCommand(dados[i]);
    document.getElementById("robot-command").value = "";
  }
}

function getCommand(dado) {
  dado !== "L" && dado !== "R" && dado !== "M"
    ? alert(`Caracter ${dado} inválido`)
    : dado === "L"
    ? moveLeft()
    : dado === "R"
    ? moveRight()
    : dado === "M"
    ? robotMove()
    : "";
}

function robotRotate() {
  document.getElementById(robot.position.y + "x" + robot.position.x);
  myRobot.setAttribute("direction", robot.direction);
  myRobot.style.setProperty(
    "transform",
    `rotate(${
      robot.direction == "NORTH"
        ? 0
        : robot.direction == "EAST"
        ? 90
        : robot.direction == "SOUTH"
        ? 180
        : 270
    }deg)`
  );
  robotPosition();
}

function robotMove() {
  switch (robot.direction) {
    case "NORTH":
      robot.position.y + 1 < mapY ? robot.position.y++ : robot.position.y;
      break;
    case "EAST":
      robot.position.x + 1 < mapX ? robot.position.x++ : robot.position.x;
      break;
    case "SOUTH":
      robot.position.y - 1 >= 0 ? robot.position.y-- : robot.position.y;
      break;
    case "WEST":
      robot.position.x - 1 >= 0 ? robot.position.x-- : robot.position.x;
      break;

    default:
      break;
  }

  document
    .getElementById(robot.position.y + "x" + robot.position.x)
    .appendChild(myRobot);
  myRobot.setAttribute("direction", robot.direction);
  myRobot.style.setProperty(
    "transform",
    `rotate(${
      robot.direction == "NORTH"
        ? 0
        : robot.direction == "EAST"
        ? 90
        : robot.direction == "SOUTH"
        ? 180
        : 270
    }deg)`
  );
  robotPosition();
}

function limparTabela() {
  robot.position.x = 0;
  robot.position.y = 0;
  robot.direction = "NORTH";
  robotRotate();
  robotPosition();
  document.querySelectorAll("#gameMap  tbody tr").forEach((a) => {
    a.remove();
  });
}

function moveLeft() {
  robot.direction = coordinates[robot.direction].LEFT;
  robotRotate();
}

function moveRight() {
  robot.direction = coordinates[robot.direction].RIGHT;
  robotRotate();
}
