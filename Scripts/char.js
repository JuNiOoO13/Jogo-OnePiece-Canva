export default class Char{
    
    constructor(nome, spritesUrl, configs,direction,screen){
        this.nome = nome;
        this.screen = screen;
        this.anim = this._loadAllAnimations(configs['actions']);
        this.direction = direction;
        this.currentSprite = 0;
        this.currentAction = `Stand${this.direction}`;
        this.posX = 0;
        this.posY = 0;
        this.loadFinish = false;
        this.sprites = this._loadImage(spritesUrl);
    }
    _loadAllAnimations(configsAnim){
        let keys = Object.keys(configsAnim);
        keys.forEach((key) => {
            configsAnim[key]['frames'] = this._loadAnimation(configsAnim[key],key[key.length-1])
        });
        return configsAnim;
    }   
    _loadAnimation(configAnim,direction){
        let frames = [];
        let posX = configAnim.StartPosX;
        let posY = configAnim.StartPosY;
        for(let i = 0; i < configAnim.QuantFrames;i++){
            frames.push([posX,posY]);
            if(direction == "L"){
                posX -= (configAnim.Width + configAnim.SpaceBetween);
            }else{
                posX += (configAnim.Width + configAnim.SpaceBetween);
            }
        }
        return frames;
    }
    _loadImage(spritesUrl){
        this.screen.imageSmoothingEnabled = false;

        // Ou para garantir compatibilidade com todos os navegadores:
        this.screen.webkitImageSmoothingEnabled = false;
        this.screen.mozImageSmoothingEnabled = false;
        this.screen.msImageSmoothingEnabled = false;
        this.screen.imageSmoothingEnabled = false; 
        let sprites = new Image();
        sprites.src = spritesUrl
        sprites.onload = () => {
            console.log(this.posY)
            this.screen.drawImage(this.sprites,
                this.anim[this.currentAction].frames[this.currentSprite][0],
                this.anim[this.currentAction].frames[this.currentSprite][1],
                this.anim[this.currentAction].Width,
                this.anim[this.currentAction].Height,
                this.posX,
                this.posY,
                this.anim[this.currentAction].Width,
                this.anim[this.currentAction].Height

            )
            this.loadFinish = true;
        }
        return sprites;
    }
    

    draw(){
        
    }
}