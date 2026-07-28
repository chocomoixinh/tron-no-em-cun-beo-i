
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "background1.jpg";

const martin = new Image();
martin.src = "martin.png";

let martinX = 100;
let martinY = 420;
let dogX = Math.random() * 700;
let dogY = -120;

let dog2X = Math.random() * 700;
let dog2Y = -350;

let dogSpeed = 5;
let score = 0;
let gameOver = false;

const dog = new Image();
dog.src = "cunbeo.png";
const bone = new Image();
bone.src = "kono.png";
const eatSound = new Audio("chomp.ogg");
const failSound = new Audio("fail.ogg");
const bgMusic = new Audio("redred.ogg");

bgMusic.loop = true;
bgMusic.volume = 0.4;

let boneX = Math.random() * 700;
let boneY = 500;
let boneSpeed = 4;
let speed = 6;

const keys = {};
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

leftBtn.addEventListener("touchstart", () => keys["ArrowLeft"] = true);
leftBtn.addEventListener("touchend", () => keys["ArrowLeft"] = false);

rightBtn.addEventListener("touchstart", () => keys["ArrowRight"] = true);
rightBtn.addEventListener("touchend", () => keys["ArrowRight"] = false);

background.onload = function () {

    bgMusic.play().catch(() => {});

    gameLoop();
};

function gameLoop() {
if (gameOver) {

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 60px Arial";
    ctx.fillText("GAME OVER",180,220);

    ctx.font = "35px Arial";
    ctx.fillText("Score: " + score,290,300);

    ctx.fillText("chạm để chơi lại i mò ><",240,380);

    return;
}
    ctx.clearRect(0, 0, canvas.width, canvas.height);
if (keys["ArrowLeft"]) {
    martinX -= speed;
}

if (keys["ArrowRight"]) {
    martinX += speed;
}

// không cho chạy ra ngoài màn hình
if (martinX < 0) martinX = 0;
if (martinX > canvas.width - 120)
    martinX = canvas.width - 120;
    // nền
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // martin
    ctx.drawImage(martin, martinX, martinY, 120, 120);
dogY += dogSpeed;

if (dogY > canvas.height) {
    dogY = -120;
    dogX = Math.random() * 700;

    score++;
    dogSpeed += 0.2;
}

ctx.drawImage(dog, dogX, dogY, 120, 120);
dog2Y += dogSpeed + 1;

if (dog2Y > canvas.height) {
    dog2Y = -350;
    dog2X = Math.random() * 700;
}

ctx.drawImage(dog, dog2X, dog2Y, 120, 120);


ctx.drawImage(bone, boneX, boneY, 80, 80);
ctx.fillStyle = "yellow";
ctx.font = "bold 32px Arial";
ctx.fillText("⭐ " + score, 20, 40);
if (
    martinX < dogX + 120 &&
    martinX + 120 > dogX &&
    martinY < dogY + 120 &&
    martinY + 120 > dogY
) {failSound.play();
bgMusic.pause();

    gameOver = true;
}
if (
    martinX < dog2X + 120 &&
    martinX + 120 > dog2X &&
    martinY < dog2Y + 120 &&
    martinY + 120 > dog2Y
) {
    gameOver = true;
}
if (
    martinX < boneX + 80 &&
    martinX + 120 > boneX &&
    martinY < boneY + 80 &&
    martinY + 120 > boneY
) {
    score += 5;
eatSound.currentTime = 0;
eatSound.play();
    boneY = 500;
    boneX = Math.random() * 700;
}
    requestAnimationFrame(gameLoop);
}
canvas.addEventListener("click", function(){

    if(gameOver){

        location.reload();

    }

});