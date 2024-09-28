import Char from "./char.js"
import utilits from "./utilits.js";

function _createCtx(){
    let canva = document.getElementById('canva');
    return canva.getContext('2d');
}
let anim = await utilits.loadCharConfigs("Zoro")
let ctx = _createCtx();
ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false; // Desativa a suavização
ctx.mozImageSmoothingEnabled = false; // Compatibilidade com Firefox
ctx.webkitImageSmoothingEnabled = false; // Compatibilidade com Webkit
ctx.msImageSmoothingEnabled = false; // Compatibilidade com IE

let mainChar = new Char("Zoro", "/Assets/ZoroSprites.png", anim,"R",ctx);



setInterval(() => {
    mainChar.draw()
    
},200);