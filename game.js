const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ===== ẢNH =====
const background = new Image();
background.src = "background1.jpg";

const martin = new Image();
martin.src = "martin.png";

const dog = new Image();
dog.src = "cunbeo.png";

const bone = new Image();
bone.src = "kono.png";

// ===== ÂM THANH =====
const eatSound = new Audio("chomp.ogg");
const failSound = new Audio("fail.ogg");
const bgMusic = new Audio("redred.ogg");

bgMusic.loop = true;
bgMusic.volume = 0.4;

// ===== NHÂN VẬT =====
let martinX = 100;
let martinY = 420;

let dogX = Math.random() * 700;
let dogY = -120;

let dog2X = Math.random() * 700;
let dog2Y = -350;

let boneX = Math.random() * 700;
let boneY = 500;

// ===== GAME =====
let dogSpeed = 2.5;
let speed = 6;
let score = 0;
let gameOver = false;
let lives = 3;

// ===== ĐIỀU KHIỂN =====
const keys = {};

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

// Laptop
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Điện thoại
leftBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keys["ArrowLeft"] = true;
});

leftBtn.addEventListener("touchend", (e) => {
    e.preventDefault();
    keys["ArrowLeft"] = false;
});

rightBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keys["ArrowRight"] = true;
});

rightBtn.addEventListener("touchend", (e) => {
    e.preventDefault();
    keys["ArrowRight"] = false;
});

// Chuột
leftBtn.addEventListener("mousedown", () => {
    keys["ArrowLeft"] = true;
});

leftBtn.addEventListener("mouseup", () => {
    keys["ArrowLeft"] = false;
});

leftBtn.addEventListener("mouseleave", () => {
    keys["ArrowLeft"] = false;
});

rightBtn.addEventListener("mousedown", () => {
    keys["ArrowRight"] = true;
});

rightBtn.addEventListener("mouseup", () => {
    keys["ArrowRight"] = false;
});

rightBtn.addEventListener("mouseleave", () => {
    keys["ArrowRight"] = false;
});

// ===== KHỞI ĐỘNG =====
background.onload = () => {
    bgMusic.play().catch(() => {});
    gameLoop();
};
function gameLoop() {

    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "bold 60px Arial";
        ctx.fillText("GAME OVER", 170, 220);

        ctx.font = "35px Arial";
        ctx.fillText("Score: " + score, 300, 300);
        ctx.fillText("chạm để chơi lại i mò ><", 200, 380);

        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // điều khiển martin
    if (keys["ArrowLeft"]) martinX -= speed;
    if (keys["ArrowRight"]) martinX += speed;

    if (martinX < 0) martinX = 0;
    if (martinX > canvas.width - 120)
        martinX = canvas.width - 120;

    // nền
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // martin
    ctx.drawImage(martin, martinX, martinY, 120, 120);

    // cún 1
    dogY += dogSpeed;

    if (dogY > canvas.height) {
        dogY = -120;
        dogX = Math.random() * 700;
        score++;
        dogSpeed += 0.08;
    }

    ctx.drawImage(dog, dogX, dogY, 120, 120);

    // cún 2
    dog2Y += dogSpeed + 1;

    if (dog2Y > canvas.height) {
        dog2Y = -350;
        dog2X = Math.random() * 700;
    }

    ctx.drawImage(dog, dog2X, dog2Y, 120, 120);

    // xương
    ctx.drawImage(bone, boneX, boneY, 80, 80);

    // điểm
    ctx.fillStyle = "yellow";
    ctx.font = "bold 32px Arial";
    ctx.fillText("⭐ " + score, 20, 40);

    ctx.fillStyle = "red";
    ctx.font = "bold 32px Arial";
    ctx.fillText("❤️ " + lives, 20, 80);

    // va chạm cún 1
    if (
    martinX < dogX + 120 &&
    martinX + 120 > dogX &&
    martinY < dogY + 120 &&
    martinY + 120 > dogY
) {
    failSound.play();

    lives--;

    dogY = -120;
    dogX = Math.random() * 700;

    if (lives <= 0) {
        bgMusic.pause();
        gameOver = true;
    }
}

    // va chạm cún 2
    if (
    martinX < dog2X + 120 &&
    martinX + 120 > dog2X &&
    martinY < dog2Y + 120 &&
    martinY + 120 > dog2Y
) {
    failSound.play();

    lives--;

    dog2Y = -350;
    dog2X = Math.random() * 700;

    if (lives <= 0) {
        bgMusic.pause();
        gameOver = true;
    }
}

    // ăn xương
    if (
        martinX < boneX + 80 &&
        martinX + 120 > boneX &&
        martinY < boneY + 80 &&
        martinY + 120 > boneY
    ) {
        score += 5;

        eatSound.currentTime = 0;
        eatSound.play();

        boneX = Math.random() * 700;
        boneY = 500;
    }

    requestAnimationFrame(gameLoop);
}

// chạm để chơi lại
canvas.addEventListener("click", () => {
    if (gameOver) {
        location.reload();
    }
});