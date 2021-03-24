import * as THREE from 'three';
import SceneObject from './SceneObject';

const getLocationOnParent = (radius, loc) => {
    const [lat, long] = loc;
    const phi = (90-lat) * (Math.PI/180); // polar 
    const theta = (long+180) * (Math.PI/180); // azimuthal
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    console.log('radius: ', radius);
    console.log('long: ', long);
    return [x, y, z];
}

class HistoricalPoint extends SceneObject {
    constructor(data, parentRadius) {
        super();
        this.sphere = new THREE.Mesh(
            // sphere geometry
            new THREE.SphereGeometry(0.025, 32, 32),
            // sphere texture 
            new THREE.MeshPhongMaterial({
                color: '#fc3903',
                emissive: '#a85432'
            })
        );

       
        console.log('this.sphere.position1: ', this.sphere.position);
        console.log('modify to: ', getLocationOnParent(parentRadius, data.location));
        this.sphere.position.set(...getLocationOnParent(parentRadius, data.location));
        console.log('this.sphere.position2: ', this.sphere.position);
    }
    get threeJSObject() {
        return this.sphere;
    }
    rerender(scene) {
    }

}

export default HistoricalPoint;