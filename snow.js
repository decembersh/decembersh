let canvas, ctx;
let width, height;
let flakes = [];
let snowActive = false;

function initSnow() {
    canvas = document.getElementById("snow");
    ctx = canvas.getContext("2d");

    resize();
    window.addEventListener("resize", resize);

    flakes = [];
    for (let i = 0; i < 150; i++) {
        flakes.push(new Snowflake());
    }

    snowActive = true;
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Snowflake {
    constructor() {
        this.reset(true);
    }

    reset(fromTop = false) {
        this.x = Math.random() * width;
        this.y = fromTop ? Math.random() * -height : Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > height) {
            this.reset(true); // always respawn from top
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

function animate() {
    if (!snowActive) return;

    ctx.clearRect(0, 0, width, height);
    flakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animate);
}
