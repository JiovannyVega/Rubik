let cubies = [];
const N = 3;
const tiempo = 500;
const moves = "rRlLuUdDfFbB".split("");

function setup() {
  createCanvas(1000, 1000, WEBGL);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        cubies.push(new Cubie(i, j, k));
      }
    }
  }
  noStroke();
  createButton("Scramble").mousePressed(() => {
    for (let i = 0; i < 40; i++) {
      doMove(random(moves));
    }
  });
}

let lastMoveTime = 0;

function doMove(move) {
  const currentTime = new Date().getTime();
  if (currentTime - lastMoveTime < tiempo + 50) {
    setTimeout(doMove, tiempo + 50 - (currentTime - lastMoveTime), move);
    return;
  }
  lastMoveTime = currentTime;
  if (move === "r") {
    for (const c of cubies) {
      if (c.i === N - 1) {
        anime({
          targets: c,
          j: [c.j, -(c.k - (N - 1) / 2) + (N - 1) / 2],
          k: [c.k, c.j],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("x");
      }
    }
  } else if (move === "R") {
    for (const c of cubies) {
      if (c.i === N - 1) {
        anime({
          targets: c,
          j: [c.j, c.k],
          k: [c.k, -(c.j - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear',
        });
        c.rotations.unshift("x'");
      }
    }
  } else if (move === "L") {
    for (const c of cubies) {
      if (c.i === 0) {
        anime({
          targets: c,
          j: [c.j, -(c.k - (N - 1) / 2) + (N - 1) / 2],
          k: [c.k, c.j],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("x");
      }
    }
  } else if (move === "l") {
    for (const c of cubies) {
      if (c.i === 0) {
        anime({
          targets: c,
          j: [c.j, c.k],
          k: [c.k, -(c.j - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("x'");
      }
    }
  } else if (move === "D") {
    for (const c of cubies) {
      if (c.j === N - 1) {
        anime({
          targets: c,
          i: [c.i, -(c.k - (N - 1) / 2) + (N - 1) / 2],
          k: [c.k, c.i],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("y");
      }
    }
  } else if (move === "d") {
    for (const c of cubies) {
      if (c.j === N - 1) {
        anime({
          targets: c,
          i: [c.i, c.k],
          k: [c.k, -(c.i - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("y'");
      }
    }
  } else if (move === "u") {
    for (const c of cubies) {
      if (c.j === 0) {
        anime({
          targets: c,
          i: [c.i, -(c.k - (N - 1) / 2) + (N - 1) / 2],
          k: [c.k, c.i],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("y");
      }
    }
  } else if (move === "U") {
    for (const c of cubies) {
      if (c.j === 0) {
        anime({
          targets: c,
          i: [c.i, c.k],
          k: [c.k, -(c.i - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("y'");
      }
    }
  } else if (move === "F") {
    for (const c of cubies) {
      if (c.k === N - 1) {
        anime({
          targets: c,
          j: [c.j, -(c.i - (N - 1) / 2) + (N - 1) / 2],
          i: [c.i, c.j],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("z'");
      }
    }
  } else if (move === "f") {
    for (const c of cubies) {
      if (c.k === N - 1) {
        anime({
          targets: c,
          j: [c.j, c.i],
          i: [c.i, -(c.j - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("z");
      }
    }
  } else if (move === "b") {
    for (const c of cubies) {
      if (c.k === 0) {
        anime({
          targets: c,
          j: [c.j, -(c.i - (N - 1) / 2) + (N - 1) / 2],
          i: [c.i, c.j],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("z'");
      }
    }
  } else if (move === "B") {
    for (const c of cubies) {
      if (c.k === 0) {
        anime({
          targets: c,
          j: [c.j, c.i],
          i: [c.i, -(c.j - (N - 1) / 2) + (N - 1) / 2],
          duration: tiempo,
          easing: 'linear'
        });
        c.rotations.unshift("z");
      }
    }
  }
}

function keyPressed() {
  doMove(key);
}

function draw() {
  background(220);
  pointLight(255, 255, 255, 400, 0, 0);
  pointLight(255, 255, 255, -400, 0, 0);
  pointLight(255, 255, 255, 0, 400, 0);
  pointLight(255, 255, 255, 0, -400, 0);
  pointLight(255, 255, 255, 0, 0, 400);
  pointLight(255, 255, 255, 0, 0, -400);
  orbitControl();
  fill(17);
  push();
  translate(0, 0, -500);
  plane(1200);
  pop();
  rotateX(-PI / 6);
  rotateY(-PI / 6);
  for (const c of cubies) {
    c.render();
  }
}

class Cubie {
  constructor(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
    this.sz = 50;
    this.stickers = [
      new Sticker("R"),
      new Sticker("L"),
      new Sticker("U"),
      new Sticker("D"),
      new Sticker("F"),
      new Sticker("B"),
    ];
    this.rotations = [];
  }

  get x() {
    return (this.i - (N - 1) / 2) * this.sz;
  }

  get y() {
    return (this.j - (N - 1) / 2) * this.sz;
  }

  get z() {
    return (this.k - (N - 1) / 2) * this.sz;
  }

  render() {
    push();
    translate(this.x, this.y, this.z);
    for (const rot of this.rotations) {
      if (rot === "x") {
        rotateX(PI / 2);
      } else if (rot === "y") {
        rotateY(-PI / 2);
      } else if (rot === "z") {
        rotateZ(PI / 2);
      } else if (rot === "x'") {
        rotateX(-PI / 2);
      } else if (rot === "y'") {
        rotateY(PI / 2);
      } else if (rot === "z'") {
        rotateZ(-PI / 2);
      }
    }
    for (const sticker of this.stickers) {
      sticker.render();
    }
    pop();
  }
}

class Sticker {
  constructor(axis) {
    this.axis = axis;
    this.sz = 50;
  }

  get x() {
    return 0;
  }

  get y() {
    return 0;
  }

  get z() {
    return 0;
  }

  render() {
    push();
    if (this.axis === "R") {
      translate(this.x + this.sz / 2, this.y, this.z);
      fill("red");
    } else if (this.axis === "L") {
      translate(this.x - this.sz / 2, this.y, this.z);
      fill("orange");
    } else if (this.axis === "U") {
      translate(this.x, this.y - this.sz / 2, this.z);
      fill("white");
    } else if (this.axis === "D") {
      translate(this.x, this.y + this.sz / 2, this.z);
      fill("yellow");
    } else if (this.axis === "F") {
      translate(this.x, this.y, this.z + this.sz / 2);
      fill("lime");
    } else if (this.axis === "B") {
      translate(this.x, this.y, this.z - this.sz / 2);
      fill("dodgerblue");
    }
    if (this.axis === "R" || this.axis === "L") {
      rotateY(PI / 2);
    } else if (this.axis === "U" || this.axis === "D") {
      rotateX(PI / 2);
    }
    box(this.sz - 2, this.sz - 2, 2);
    fill(0);
    plane(this.sz);
    pop();
  }
}
