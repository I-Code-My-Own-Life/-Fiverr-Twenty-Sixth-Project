// First of all, I have to make total 5 scenes : 

// 1 - Splash scene or loading scene
// 2 - Main menu scene  
// 3 - Game Level 1  
// 4 - Game Level 2 
// 5 - Leaderboard scene

let currentScene = 0;

// All of our scenes : 
let scenes = {
    splashScene: 0,
    mainMenu: 1,
    level1: 2,
    level2: 3,
    leaderboard: 4
}

// This object keeps track of our mouse's x and y coordinates, but for the time being they are set to undefined : 
let mouse = {
    x: undefined,
    y: undefined
}

// Our canvas size object : 
let canvas = {
    width: innerWidth,
    height: innerHeight
}
// Our preload function which loads all our assets and sounds :
let splash_img;
let soundOnBtn;
let soundOffBtn;
let menu_logo;
let play_btn;
let soundImg;
let track1;
let map;

function preload() {
    // Loading our images : 
    splash_img = loadImage("Assets/splash_logo.png");
    menu_logo = loadImage("Assets/menu_logo.png");
    play_btn = loadImage("Assets/play.png");
    soundOnBtn = loadImage("Assets/SoundOnBtn.png");
    soundOffBtn = loadImage("Assets/SoundOffBtn.png");
    // Loading our map : 
    map = loadStrings("Levels/level1_data.txt");
    // Loading our sounds : 
    track1 = loadSound("Sounds/track1.wav");
}

// Our setup function which sets up our game environment : 
function setup() {
    new Canvas(canvas.width, canvas.height);
    console.log(canvas.width, canvas.height)
    world.gravity.y = 10;
}

let drawSoundImg = true;
let i = 0;
let pointRectCollision = true;
let drawLev = true;
let playerSpeed = 5;
let playerJumpSpeed = 30;
let player;
let traps;
// Our draw function that acts as our animation loop : 
function draw() {
    // Loading scene : 
    if (currentScene == scenes.splashScene) {
        // Our background : 
        background(175, 207, 240)
        image(splash_img, 0, 0, canvas.width, canvas.height)
        // Starting the music : 
        if (!track1.isPlaying()) {
            track1.play();
        }
    }
    // Main menu scene : 
    else if (currentScene == scenes.mainMenu) {
        // Our background :
        background(175, 207, 240);
        menu_logo.width = 300;
        menu_logo.height = 200;
        image(menu_logo, (canvas.width / 2) - menu_logo.width / 2, canvas.height / 6);
        // Now drawing buttons : 
        // Play button : 
        play_btn.width = 140;
        play_btn.height = 60;
        image(play_btn, (canvas.width / 2) - play_btn.width / 2, canvas.height / 2);
        if (pointRectDist(mouse.x, mouse.y, (canvas.width / 2) - play_btn.width / 2, canvas.height / 2, play_btn.width, play_btn.height)) {
            currentScene = scenes.level1
        }
        if (drawSoundImg) {
            soundImg = soundOnBtn;
        }
        // Sound on/off button : 
        soundImg.width = 140;
        soundImg.height = 60;
        // Drawing our sound button image : 
        image(soundImg, (canvas.width / 2) - soundOnBtn.width / 2, canvas.height / 1.5);
        if (pointRectDist(mouse.x, mouse.y, (canvas.width / 2) - soundImg.width / 2, canvas.height / 1.5, soundImg.width, soundImg.height) && pointRectCollision) {
            i++
            soundImg = soundOffBtn;
            if (i % 2 == 0) {
                drawSoundImg = true;
                pointRectCollision = true;
            }
            else {
                drawSoundImg = false;
                pointRectCollision = false;
                track1.stop();
            }
        }
    }
    // Level 1 : 
    else if (currentScene == scenes.level1) {
        // Drawing the background : 
        background(175, 207, 240);
        // Drawing the level : 
        drawLevel(1);
        // Handling player movement : 
        if (kb.pressed('up')) player.vel.y = playerJumpSpeed;
        else if (kb.pressing('left')) player.vel.x = -playerSpeed;
        else if (kb.pressing('right')) player.vel.x = playerSpeed;
        else player.vel.x = 0;
        if (player.x >= 576) {
            camera.x = player.x;
        }
        // Collision of player with traps : 
        traps.forEach(trap => {
            if (player.collides(trap)) {
                player.x = 250;
                player.y = 150;
                camera.x = (player.x + canvas.width / 2) - 250;
            }
        });
    }
    else if (currentScene == scenes.level2) {
        z
    }
    else if (currentScene == scenes.leaderboard) {

    }

}


setTimeout(() => {
    currentScene = 1;
})

// Our resize event listener function : 
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawLevel(1);
}

addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

// Takes a circle and rectangle's coordinates and tells if they are colliding : 
function pointRectDist(px, py, rx, ry, rwidth, rheight) {
    if (px >= rx &&         // right of the left edge AND
        px <= rx + rwidth &&    // left of the right edge AND
        py >= ry &&         // below the top AND
        py <= ry + rheight) // above the bottom
    {
        return true;
    }
    else {
        return false;
    }
}


function drawLevel(level) {
    if (drawLev) {
        // Creating our bricks : 
        bricks = new Group();
        bricks.img = "Assets/Tiles/1.png";
        bricks.w = 15;
        bricks.h = 15;
        bricks.tile = '=';
        bricks.collider = "static";
        // Creating traps : 
        traps = new Group();
        traps.img = "Assets/Tiles/11.png";
        traps.w = 15;
        traps.h = 15;
        traps.tile = "-";
        traps.collider = "static"
        new Tiles(
            map,
            10,
            10,
            bricks.w,
            bricks.h + 2
        );
        // Drawing the player : 
        player = new Sprite();
        player.scale = 1.5;
        player.img = 'Assets/ball2.png';
        player.diameter = 30;
        drawLev = false;
    }
}

// function drawLevel(level){
//     if(drawLev){
//         bricks = new Group();
//         bricks.img = "Assets/Tiles/1.png";
//         // bricks.scale = 8
//         // bricks.setCollider("rectangle", 50, 50, 30, 30)
//         bricks.tile = '=';
//         bricks.collider = "static"
//         console.log(bricks)
//         new Tiles(
//             [
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "=           ",
//                 "===================================================================================",
//             ],
//             10,
//             10,
//             bricks.w ,
//             bricks.h + 2
//         );
//         // Drawing the player :
//         player = new Sprite();
//         player.img = 'Assets/ball.png';
//         player.diameter = 25;
//         drawLev = false;
//     }
// }

