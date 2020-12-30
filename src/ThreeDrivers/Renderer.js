import * as THREE from 'three';

class Renderer {
    constructor(
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 )
    ) {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this._sceneObjects = [];
        this.scene = scene;
        this.renderer.setClearColor(0x878782, 1);
        this.camera = camera;
        this.camera.position.z = 5;
    }

    register(sceneObject) {
        this.sceneObjects.push(sceneObject);
        this.scene.add(sceneObject.threeJSObject);
    }

    unregister(sceneObject) {
        this._sceneObjects = sceneObjects.filter(so => {
            return sceneObject.id !== so.id;
        });
    }

    get sceneObjects() {
        return this._sceneObjects;
    }

    render() {
        this.sceneObjects.forEach(sceneObject => {
            sceneObject.rerender();
        });

        this.renderer.render(this.scene, this.camera);
    }
}

export default Renderer;