

export default class utilits{
    static async loadCharConfigs(charName){
        const res = await fetch("Configs/Config.json");
        const data = await res.json();
        return data['CharConfigs'][charName]
    }
   
}