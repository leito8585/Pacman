const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Grenze {
  static width = 40;
  static height = 40;
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    //context.fillStyle = "blue";
    //context.fillRect(this.position.x, this.position.y, this.width, this.height);

    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Spieler {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const grenzen = [];
const spieler = new Spieler({
  position: {
    x: Grenze.width + Grenze.width / 2,
    y: Grenze.height + Grenze.height / 2,
  },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = "";

const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeHorizontal.png"),
          })
        );
        break;
      case "|":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeVertical.png"),
          })
        );
        break;
      case "1":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeCorner1.png"),
          })
        );
        break;
      case "2":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeCorner2.png"),
          })
        );
        break;
      case "3":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeCorner3.png"),
          })
        );
        break;
      case "4":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/pipeCorner4.png"),
          })
        );
        break;
      case "b":
        grenzen.push(
          new Grenze({
            position: {
              x: Grenze.width * j,
              y: Grenze.height * i,
            },
            image: createImage("./img/block.png"),
          })
        );
        break;
      case "[":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/capLeft.png"),
          })
        );
        break;
      case "]":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/capRight.png"),
          })
        );
        break;
      case "_":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/capBottom.png"),
          })
        );
        break;
      case "^":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/capTop.png"),
          })
        );
        break;
      case "+":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/pipeCross.png"),
          })
        );
        break;
      case "5":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorTop.png"),
          })
        );
        break;
      case "6":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorRight.png"),
          })
        );
        break;
      case "7":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            color: "blue",
            image: createImage("./img/pipeConnectorBottom.png"),
          })
        );
        break;
      case "8":
        grenzen.push(
          new Grenze({
            position: {
              x: j * Grenze.width,
              y: i * Grenze.height,
            },
            image: createImage("./img/pipeConnectorLeft.png"),
          })
        );
        break;
    }
  });
});

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.w.pressed && lastKey === "w") {
    for (let i = 0; i < grenzen.length; i++) {
      const grenze = grenzen[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...spieler, velocity: { x: 0, y: -5 } },
          rectangle: grenze,
        })
      ) {
        spieler.velocity.y = 0;
        break;
      } else {
        spieler.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === "a") {
    for (let i = 0; i < grenzen.length; i++) {
      const grenze = grenzen[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...spieler, velocity: { x: -5, y: 0 } },
          rectangle: grenze,
        })
      ) {
        spieler.velocity.x = 0;
        break;
      } else {
        spieler.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === "s") {
    for (let i = 0; i < grenzen.length; i++) {
      const grenze = grenzen[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...spieler, velocity: { x: 0, y: 5 } },
          rectangle: grenze,
        })
      ) {
        spieler.velocity.y = 0;
        break;
      } else {
        spieler.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === "d") {
    for (let i = 0; i < grenzen.length; i++) {
      const grenze = grenzen[i];
      if (
        circleCollidesWithRectangle({
          circle: { ...spieler, velocity: { x: 5, y: 0 } },
          rectangle: grenze,
        })
      ) {
        spieler.velocity.x = 0;
        break;
      } else {
        spieler.velocity.x = 5;
      }
    }
  }

  grenzen.forEach((grenze) => {
    grenze.draw();
    if (circleCollidesWithRectangle({ circle: spieler, rectangle: grenze })) {
      spieler.velocity.x = 0;
      spieler.velocity.y = 0;
    }
  });

  spieler.update();

  //spieler.velocity.x = 0;
  //spieler.velocity.y = 0;
}

animate();

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
