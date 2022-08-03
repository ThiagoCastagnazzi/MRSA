var btn_create_table = document.querySelector(".btn-create-table");
btn_create_table.addEventListener("click", makerTable);

function makerTable() {
  let tr = document.createElement("tr");
  document.querySelector(".game-wrapper").appendChild(tr).className =
    "game-table";
  tr.style.setProperty("grid-template-columns", `repeat(${MAP_SIZE_Y}, 1fr)`);
  for (let i = 0; i < MAP_SIZE_X; i++) {
    for (let j = 0; j < MAP_SIZE_Y; j++) {
      let td = document.createElement("td");
      document.querySelector(".game-table").appendChild(td).className = "box";
      td.setAttribute("x", `${i}`);
      td.setAttribute("y", `${j}`);
    }
  }
}

var MAP_SIZE_Y = 5;
var MAP_SIZE_X = 5;
var MAP_SIZE = MAP_SIZE_X * MAP_SIZE_Y;

const coordinates = {
  NORTH: { LEFT: "WEST", RIGHT: "EAST" },
  EAST: { LEFT: "NORTH", RIGHT: "SOUTH" },
  SOUTH: { LEFT: "", RIGHT: "WEST" },
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

main("MMLK");
