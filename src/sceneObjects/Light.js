import * as THREE from 'three';
import SceneObject from './SceneObject';

class Light extends SceneObject {
    constructor(spinRadius = 5, startingAngle = 30, angleMultiplier = 0.02) {
        super();
        this.light = new THREE.DirectionalLight(0xffffff, 2);
        this.spinRadius = spinRadius;
        this.currAngle = startingAngle;
        this.angleMultiplier = angleMultiplier;
        this.light.position.set(4, 0, 5).normalize();
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

    rerender(scene, camera) {
        this.light.position.set(
            camera.position.x,
            camera.position.y,
            camera.position.z + 1
        );
    }
}

export default Light;