import * as THREE from 'three';
import SceneObject from './SceneObject';

class EarthSphere extends SceneObject {
    constructor(radius = 0.5) {
        super();
        this.sphere = new THREE.Mesh(
            // sphere geometry
            new THREE.SphereGeometry(radius, 32, 32),
            // sphere texture 
            new THREE.MeshPhongMaterial({
                color: '#ebb13d',
                emissive: '#9c7a38'
            })
        );
    }

    get threeJSObject() {
        return this.sphere;
    }
    
    rerender() {
        this.sphere.rotation.y += 0.002;
    }
}

export default EarthSphere;