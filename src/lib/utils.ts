



export interface Dimention {
    width: number;
    height: number;
};


export interface Position {
    x: number;
    y: number;
};

export enum AngleType {
    DEGREE,
    RADIANS
};

export const DEG2RAD: number = Math.PI/180;
export const RAD2DEG: number = 180/Math.PI;

export function getRotationFunction(angle: number, angleType: AngleType): (x: number, y: number) => Position {
    if(angleType === AngleType.DEGREE) angle *= DEG2RAD;
    const cos   = Math.cos;
    const sin   = Math.sin;
    const round = Math.round;
    return (x: number, y: number): Position => {
        return {
            x: round(x*cos(angle)-y*sin(angle)),
            y: round(x*sin(angle)+y*cos(angle)) 
        };
    }
}