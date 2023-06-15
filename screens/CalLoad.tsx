interface ICar {
    weight : number,//นน รถโฟล์คลิฟ
    w2 : number,//นนสิ่งของ
    x3:number,
    x11:number,
    carWidth:number,//x4
    x9:number,
    baseWheel : number,//x5
    x6:number,
    x10:number,
    height : number,//x7
    x8 : number,
}

interface IData {
    pitch: number;
    roll: number;
}

const CalLoad = (data: IData ,car: ICar) =>{
    return data.pitch + data.roll
}

module.exports = { CalLoad }