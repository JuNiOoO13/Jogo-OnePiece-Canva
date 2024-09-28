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
        this.isWalking = false;
        this.attacking = false;
        this.frame = 0;
    }
    _loadAllAnimations(configsAnim){
        let keys = Object.keys(configsAnim);
        keys.forEach((key) => {
            if(!configsAnim[key].hasOwnProperty('frames'))
                configsAnim[key]['frames'] = this._loadAnimation(configsAnim[key])
        });
        return configsAnim;
    }   
    _loadAnimation(configAnim){
        let frames = [];
        let posX = configAnim.StartPosX;
        let posY = configAnim.StartPosY;
        for(let i = 0; i < configAnim.QuantFrames;i++){
            frames.push([posX,posY]);
                posX += (configAnim.Width + configAnim.SpaceBetween);
        }
        return frames;
    }
    _loadImage(spritesUrl){
        this.screen.imageSmoothingEnabled = false;

        let sprites = new Image();
        sprites.src = spritesUrl
        sprites.onload = () => {
            this.loadFinish = true;
        }
        return sprites;
    }
    
    _animate(){
        this.screen.drawImage(this.sprites,
            this.anim[this.currentAction].frames[this.currentSprite][0],
            this.anim[this.currentAction].frames[this.currentSprite][1],
            this.anim[this.currentAction].Width,
            this.anim[this.currentAction].Height,
            this.posX,
            this.posY,
            this.anim[this.currentAction].Width * 2.5, 
            this.anim[this.currentAction].Height * 2.5
        )
        this.currentSprite = Math.floor(this.frame  / (59 / this.anim[this.currentAction].QuantFrames));
        if(this.currentSprite > this.anim[this.currentAction].QuantFrames - 1){
            this.currentSprite = 0;
            if(this.attacking){
                this.attacking = false;
                this.idle()
            }
        }
        this.frame++;
        if(this.frame >= 60){
            this.frame = 0;
        }
    }

    walk(direction){
        if(!this.isWalking){
            this.isWalking = true;
            this.direction = direction
            this.currentAction = `Walk${direction}`;
            this.currentSprite = 0;
        }
        
    }

    idle(){
        if(!this.attacking){
            this.currentAction = `Stand${this.direction}`;
            this.currentSprite = 0;
            this.isWalking = false;
        }
    }
    attack1(){
        this.currentAction = `Attack1${this.direction}`;
        this.currentSprite = 0;
        this.isWalking = false;
        this.attacking = true;
    }

    draw(){
        if(this.loadFinish)
           this._animate();
    }
}