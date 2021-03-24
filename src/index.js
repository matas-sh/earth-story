import * as THREE from 'three';
import Leaflet from 'leaflet';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import EarthSphere from './sceneObjects/EarthSphere';
import Light from './sceneObjects/Light';
import HistoricalPoint from './sceneObjects/HistoricalPoint';
import Renderer from './ThreeDrivers/Renderer';
import mockEvent from './mockData/mockEvent';
import mockEvent2 from './mockData/mockEvent2';
import './styles/main.css';


console.log('*****: ', Leaflet);
const leafletMap = Leaflet.map('mapid').setView([51.505, -0.09], 5);
Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(leafletMap);

const renderer = new Renderer(leafletMap);

// setup devtools 
if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: renderer.scene }));
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: renderer.renderer }));
}


// register scene objects objects
renderer.register(new Light());
// const earthSphere = new EarthSphere();
// console.log(' earthSphere.threeJSObject: ',  );
// const earthSphereRadius = earthSphere.threeJSObject.geometry.parameters.radius;
// earthSphere.threeJSObject.add(new HistoricalPoint(mockEvent, earthSphereRadius).threeJSObject);
// renderer.register(earthSphere);

const loader = new GLTFLoader();
console.log('loader: ', loader);
console.log('renderer.scene: ', renderer.scene);

loader.load(
    './earth/earth.glb',
    ( gltf ) => {
        let earthSphereRadius;
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.geometry.center(); // center here
                child.geometry.computeBoundingSphere();
                console.log('!----- tunning hrere: ',  child.geometry.boundingSphere.radius)
                earthSphereRadius = child.geometry.boundingSphere.radius;
                child.name = 'earthSphere';
                console.log('CHILD_NAME: ', child.name)

                const worldAxis = new THREE.AxesHelper(20);
                child.add(worldAxis);
            }
        });
        console.log('!!!!! ', gltf.scene.getObjectByName('earthSphere'))
        console.log('radius: ',gltf.scene);
        gltf.scene.scale.set(1,1,1) 
        // called when the resource is loaded
        gltf.scene.add(new HistoricalPoint(mockEvent, earthSphereRadius).threeJSObject);
        gltf.scene.add(new HistoricalPoint(mockEvent2, earthSphereRadius).threeJSObject);
        renderer.scene.add( gltf.scene );


    },
    undefined,
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
);
console.log('renderer.scene: ', renderer.scene);

function mainLoop() {
    requestAnimationFrame( mainLoop );
    renderer.render();
}

mainLoop();