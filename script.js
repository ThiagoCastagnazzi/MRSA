var TAM_MAPA_X = 5;
var TAM_MAPA_Y = 10;

const coordenadas = {
  NORTH: { LEFT: "WEST", RIGHT: "EAST" },
  EAST: { LEFT: "NORTH", RIGHT: "SOUTH" },
  SOUTH: { LEFT: "WEST", RIGHT: "EAST" },
  WEST: { LEFT: "SOUTH", RIGHT: "NORTH" },
};

var robo = {
  posicao: {
    x: 0,
    y: 0,
  },
  sentido: "NORTH",
};

function andar(direction) {
  direction == "NORTH" && robo.posicao.y + 1 < TAM_MAPA_Y
    ? robo.posicao.y++
    : robo.posicao.y;
  direction == "EAST" && robo.posicao.x + 1 < TAM_MAPA_X
    ? robo.posicao.x++
    : robo.posicao.x;
  direction == "SOUTH" && robo.posicao.y - 1 >= 0
    ? robo.posicao.y--
    : robo.posicao.y;
  direction == "WEST" && robo.posicao.x - 1 >= 0
    ? robo.posicao.x--
    : robo.posicao.x;
}

function novaPosicao(sentido) {
  if (sentido == "R") robo.sentido = coordenadas[robo.sentido].RIGHT;

  if (sentido == "L") robo.sentido = coordenadas[robo.sentido].LEFT;
}

function main(dados) {
  for (let i = 0; i < dados.length; i++) {
    if (dados[i] == "L" || "R") novaPosicao(dados[i]);
    if (dados[i] == "M") andar(robo.sentido);
    console.log("{dado:" + dados[i] + "}");
    console.log(robo);
    console.log("\n");
  }
}

main("MMR");
