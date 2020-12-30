import * as THREE from 'three';
import EarthSphere from './sceneObjects/EarthSphere';
import Light from './sceneObjects/Light';
import Renderer from './ThreeDrivers/Renderer';

import './styles/main.css';

const renderer = new Renderer();

// setup devtools 
if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: renderer.scene }));
    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: renderer.renderer }));
}

// register scene objects objects
renderer.register(new Light());
renderer.register(new EarthSphere());


function mainLoop() {
    requestAnimationFrame( mainLoop );
    renderer.render();
}

mainLoop();