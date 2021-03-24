import * as THREE from 'three';
import SceneObject from './SceneObject';

class EarthSphere extends SceneObject {
    constructor(sphere, radius = 1) {
        super('EarthSphere');
        this.sphere = sphere;
        this.radius = radius
    }

    get threeJSObject() {
        return this.sphere;
    }
    
    rerender(scene) {

    }
}

export default EarthSphere;