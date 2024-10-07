import Char from "./char.js"
import utilits from "./utilits.js";

function _createCtx(){
    let canva = document.getElementById('canva');
    return canva.getContext('2d');
}



let anim = await utilits.loadCharConfigs("Zoro")
let ctx = _createCtx();
let velocity = 0;
let gravityForce = 10;
let inputsPlayer = {
    'd' : () =>{
        if(!mainChar.attacking){
            mainChar.walk('R');
            velocity = 4;
        }
    },
    'a' : () => {
        if(!mainChar.attacking){
            mainChar.walk('L');
            velocity = -4;
        }
    },
    'f': () => {
        if(!mainChar.attacking)
            mainChar.attack1();
    },
    'g': () => {
        if(!mainChar.attacking)
            mainChar.attack2();
    },
    'e': () => {
        if(!mainChar.attacking)
            mainChar.attack3();
    },
    'w':() =>{
        gravityForce = 10;
        mainChar.jump();
    }
}
let keys = Object.keys(inputsPlayer)
let gameAssets;
let currentBackgroundFrame = 0;
let currentFrame = 0;

ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false; 
ctx.webkitImageSmoothingEnabled = false; 
ctx.msImageSmoothingEnabled = false; 

let mainChar = new Char("Zoro", "/Assets/ZoroSprites.png", anim,"R",ctx,canva.height);
mainChar.posY = canva.height / 2

async function loadGameAssets(){
    let gameAssets = new Object();
    gameAssets['background'] = await loadBackground();
    return gameAssets;
}

function loadBackground(){
    let promises = [];
    for(let i = 0; i < 8; i++){
        let promise = new Promise((resolve) => {
            let background = new Image();

            background.src = `Assets/Background/background (${i+1}).gif`;
            background.onload = () => {
                resolve(background); 
            };
        })
        promises.push(promise)

    }
    return Promise.all(promises);
}

function mainLoop(){
    if(currentFrame > 59){
        currentFrame = 0;
    }
    ctx.clearRect(0,0,canva.width,canva.height);
    drawBackground(currentFrame);
    mainChar.draw(currentFrame);
    mainChar.posX += velocity
    currentFrame++;
    gravity();
}

function gravity(){
    if(mainChar.acceleration > 0){
        mainChar.posY -= mainChar.acceleration * 0.10;
        mainChar.acceleration = mainChar.acceleration - mainChar.jumpForce * 0.10 > 0 ? mainChar.acceleration - mainChar.jumpForce * 0.10 : 0; 
    }
    if(mainChar.posY >= canva.height / 2){
        mainChar.posY = canva.height / 2;
        gravityForce = 0.2;
    }else{
        mainChar.posY += gravityForce
        gravityForce += 0.5;

    }
}

function drawBackground(){
    currentBackgroundFrame = Math.floor(currentFrame / (60 / 8))
    if(currentBackgroundFrame >= 8 ){
        currentBackgroundFrame = 0;
    }
    ctx.drawImage(gameAssets['background'][currentBackgroundFrame],0,0,canva.width,canva.height)
}

gameAssets = await loadGameAssets();

document.addEventListener('keydown', (event) => {
    if(keys.includes(event.key)){
        inputsPlayer[event.key]()
    }
})

document.addEventListener('keyup', (event) =>{
    if(event.key == 'd' || event.key == 'a'){
        mainChar.idle();
        velocity = 0;
    }
});
// setInterval(() => {
//     gravity();
//  },60);


setInterval(() => {
   mainLoop()
},16.6);