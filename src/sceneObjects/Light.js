import * as THREE from 'three';
import SceneObject from './SceneObject';

// const startingAngle = 30;
// const angleMultiplier = 0.02;
// let lightRadius = 3;

// const generateLight = () => {
//     const light = new THREE.DirectionalLight(0xffffff);
//     return light;
// }

// export const getNextLightPos = (newAngle, radius) => {
//     return [
//         radius * Math.cos(newAngle), // x
//         radius * Math.sin(newAngle) // z
//     ];
// } 

// export default generateLight;


class Light extends SceneObject {
    constructor(spinRadius = 5, startingAngle = 30, angleMultiplier = 0.02) {
        super();
        this.light = new THREE.DirectionalLight(0xffffff);
        this.spinRadius = spinRadius;
        this.currAngle = startingAngle;
        this.angleMultiplier = angleMultiplier;
        this.light.position.set(1, 5, 0).normalize();
    }
    
    getNextAngle() {
        return (this.currAngle + this.angleMultiplier) % 360;
    }

    getNextLightPos(nextAngle) {
        return [
            this.spinRadius * Math.cos(nextAngle), // x
            this.spinRadius * Math.sin(nextAngle) // z
        ];
    }

    get threeJSObject() {
        return this.light;
    }

    rerender() {
        // this.currAngle = this.getNextAngle();
        // let [x, z] = this.getNextLightPos(this.currAngle);

        // this.light.position.set(x, 5, z).normalize();
    }
}

export default Light;