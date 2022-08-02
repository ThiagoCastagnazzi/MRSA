var MAP_SIZE_X = 5;
var MAP_SIZE_Y = 10;

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
    dados[i] == "L" || "R" ? rotate(dados[i]) : "";
    dados[i] == "M" ? move(robot.direction) : "";
    console.log("{dado:" + dados[i] + "}");
    console.log(robot);
    console.log("\n");
  }
}

main("rRrR");
