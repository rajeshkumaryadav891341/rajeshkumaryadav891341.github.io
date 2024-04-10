const para1 = document.querySelector(".player1");
const para2 = document.querySelector(".player2");

// define canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate balls and its construction
function Shape(x, y, velX, velY, exist) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exist = exist;
}
function Ball(x, y, velX, velY, color, size, exist) {
  Shape.call(this, x, y, velX, velY, exist);
  this.color = color;
  this.size = size;
}

//balls prototype
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
Ball.prototype.update = function () {
  this.x += this.velX;
  this.y += this.velY;
  if (this.size + this.x >= width) {
    this.velX = -this.velX;
  } else if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  } else if (this.size + this.y >= height) {
    this.velY = -this.velY;
  } else if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }
};
Ball.prototype.collision = function () {
  for (let k = 0; k < balls.length; k++) {
    if (!(this === balls[k])) {
      const dx = this.x - balls[k].x;
      const dy = this.y - balls[k].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[k].size) {
        balls[k].color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(
          0,
          255
        )})`;
      }
    }
  }
};

//Blackholes constructor
function Blackhole(x, y, velX, velY, color, size, exist) {
  Shape.call(this, x, y, 20, 20, exist);
  this.color = "white";
  this.size = 15;
}
//Blackhole prototypes
Blackhole.prototype.draw = function () {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};
Blackhole.prototype.setBound = function () {
  if (this.x + this.size >= width) {
    this.x -= this.size;
  } else if (this.x - this.size <= 0) {
    this.x += this.size;
  } else if (this.y + this.size >= height) {
    this.y -= this.size;
  } else if (this.y - this.size <= 0) {
    this.y += this.size;
  }
};
Blackhole.prototype.control = function () {
  let presskey = this;
  window.onkeypress = function (e) {
    if (e.key === "a") {
      presskey.x -= presskey.velX;
    }
    if (e.key === "d") {
      presskey.x += presskey.velX;
    }
    if (e.key === "w") {
      presskey.y -= presskey.velY;
    }
    if (e.key === "s") {
      presskey.y += presskey.velY;
    }
  };
};
Blackhole.prototype.collision = function () {
  for (let k = 0; k < balls.length; k++) {
    if (balls[k].exist === true) {
      const dx = this.x - balls[k].x;
      const dy = this.y - balls[k].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[k].size) {
        balls[k].exist = false;
        count1++;
        para1.textContent = "Player 1 ball count: " + count1;
      }
    }
  }
};

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
