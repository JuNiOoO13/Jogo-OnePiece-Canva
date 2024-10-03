import utilits from "./utilits.js";

export default class Char{
    
    constructor(nome, spritesUrl, configs,direction,screen){
        this.nome = nome;
        this.screen = screen;
        this.currentFrame = 0;
        this.anim = this._loadAllAnimations(nome,configs['Anim']);
        this.animConfigs = configs['Anim'];
        this.direction = direction;
        this.currentSprite = 0;
        this.currentAction = `idle`;
        this.posX = 0;
        this.posY = 0;
        this.loadFinish = false;
        this.isWalking = false;
        this.quantLoadImgs = 0;
        this.attacking = false;
    }
    _loadAllAnimations(charName,configs){
        let animNames = Object.keys(configs);
        let allAnimations = new Object()
        animNames.forEach(async (anim) =>  {
            let directionAnim = new Object();
            directionAnim['R'] = await this._loadAnimation(charName,anim,configs[anim],'R')
            console.log(directionAnim['R'][0])
            directionAnim['L'] = await this._loadAnimation(charName,anim,configs[anim],'L')
            allAnimations[anim] = directionAnim;
        });
        return allAnimations;
    }   
    _loadAnimation(charName,anim,config,direction){
        let promises = [];

        for (let i = 0; i < config.QuantFrames; i++) {
            let path = `Assets/${charName}/${anim}/${anim}${direction}_${i+1}.png`;

            promises.push(new Promise((resolve, reject) => {
                let sprite = new Image();
                sprite.src = path;

                sprite.onload = () => {
                    resolve(sprite); 
                };

                sprite.onerror = (error) => {
                    console.error(`Erro ao carregar a imagem: ${sprite.src}`, error);
                    reject(error);
                };
            }));
        }

    try {
        return  Promise.all(promises);
    } catch (error) {
        console.error("Erro ao carregar uma ou mais imagens", error);
    }
       
    }

    
    _animate(){
        let atualImg = this.anim[this.currentAction][this.direction][this.currentSprite];
        if(this.currentAction == 'attack1')
            console.log(this.currentFrame * this.animConfigs[this.currentAction]['Velocity']);

        this.screen.drawImage(atualImg,
            this.posX,
            this.posY,
            atualImg.naturalWidth * 3,
            atualImg.naturalHeight * 3
            
        )
        this.currentSprite = Math.floor(this.currentFrame  / (59 * this.animConfigs[this.currentAction]['Velocity'] / this.animConfigs[this.currentAction].QuantFrames));
        if(this.currentSprite > this.animConfigs[this.currentAction].QuantFrames - 1){
            this.currentSprite = 0;
            if(this.attacking){
                this.attacking = false;
                this.idle()
            }
        }

        this.currentFrame++;
        if(this.currentFrame > 59){
            this.currentFrame = 0;
        }
        
    }

    walk(direction){
        if(!this.isWalking){
            this.isWalking = true;
            this.direction = direction
            this.currentAction = `walk`;
            this.currentSprite = 0;
        }
        
    }

    idle(){
        if(!this.attacking){
            this.currentAction = `idle`;
            this.currentSprite = 0;
            this.isWalking = false;
        }
    }
    attack1(){
        this.currentAction = `attack1`;
        this.currentSprite = 0;
        this.isWalking = false;
        this.attacking = true;
        this.currentFrame = 0;
    }

    draw(frame){
        // if(this.quantLoadImgs >=42)
           this._animate(frame);
    }
}