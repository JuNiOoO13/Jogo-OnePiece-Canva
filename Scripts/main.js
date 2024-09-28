import Char from "./char.js"
import utilits from "./utilits.js";

function _createCtx(){
    let canva = document.getElementById('canva');
    return canva.getContext('2d');
}



let anim = await utilits.loadCharConfigs("Zoro")
let ctx = _createCtx();
let velocity = 0;
let inputsPlayer = {
    'd' : () =>{
        mainChar.walk('R');
        velocity = 4;
    },
    'a' : () => {
        mainChar.walk('L');
        velocity = -4;
    },
    'f': () => {
        if(!mainChar.attacking)
            mainChar.attack1();
    }
}
let keys = Object.keys(inputsPlayer)
ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false; 
ctx.webkitImageSmoothingEnabled = false; 
ctx.msImageSmoothingEnabled = false; 

let mainChar = new Char("Zoro", "/Assets/ZoroSprites.png", anim,"R",ctx);
mainChar.posY = canva.height / 2 - 100


function mainLoop(){
    ctx.clearRect(0,0,canva.width,canva.height);    
    mainChar.draw();
    mainChar.posX += velocity
}



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
//     mainLoopLogics()
//  },250);

setInterval(() => {
   mainLoop()
},16.6);