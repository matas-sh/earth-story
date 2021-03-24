import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Leaflet from 'leaflet';
import { getPlanetaryScale, getClosestsZoomLevel } from '../utils';

const getLatLongFromSpherePoint = (loc) => {
    const {x, y, z} = loc;
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    const polar = Math.asin(y/r) * (180 / Math.PI);
    let azimuthal;
    if(x > 0) {
        azimuthal = Math.atan(z/x) * (180 / Math.PI);
    } else if ( z > 0) {
        azimuthal = Math.atan(z/x) * (180 / Math.PI) + 180;
    } else {
        azimuthal = Math.atan(z/x) * (180 / Math.PI) - 180;
    }


    const lat = polar;
    const long = azimuthal;  

    return [ lat, -long];
}


class Renderer {
    constructor(
        leafletMap,
        scene = new THREE.Scene(),
        camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    ) {

        this.sphereView = true;
        this.leafletMap = leafletMap;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this._sceneObjects = [];
        this.scene = scene;
        this.renderer.setClearColor(0x878782, 1);
        this.camera = camera;
        this.camera.position.z = 20;
        this.camera.lookAt(new THREE.Vector3(0,0,0)) 
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        const boundGetX = this.onDocumentMouseMove.bind(this)
        document.addEventListener( 'mousemove', boundGetX );
        window.addEventListener( 'resize', this.onWindowResize(this.camera) );
        // this.scene.background = new THREE.Color( 0xff0000 );
    }


    register(sceneObject) {
        console.log('sceneObject: ',sceneObject);
        this.sceneObjects.push(sceneObject);
        this.scene.add(sceneObject.threeJSObject);
    }

    unregister(sceneObject) {
        this._sceneObjects = sceneObjects.filter(so => {
            return sceneObject.id !== so.id;
        });
    }

    onWindowResize(camera) {
        return function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

    }
    onDocumentMouseMove() {
        console.log('running');
        if(this.sphereView) {
            const dirVec = new THREE.Vector3();
            const camPos = new THREE.Vector3();
            this.camera.getWorldDirection(dirVec);
            this.camera.getWorldPosition(camPos)
            this.raycaster.set(camPos, dirVec);
            const earthSphere = this.scene.getObjectByName('earthSphere')
            earthSphere && this.updateMapView(earthSphere);
        }

    }

    get sceneObjects() {
        return this._sceneObjects;
    }
    updateMapView(sphere) {
       const intersects = this.raycaster.intersectObject(sphere);
       console.log('intersects: ', intersects);
       if(intersects && intersects[0]) {
        const { point } = intersects[0];
        const latAndLong = getLatLongFromSpherePoint(point, sphere.geometry.boundingSphere.radius);
        console.log('latAndLong: ', latAndLong);
        this.leafletMap.setView(new Leaflet.LatLng(...latAndLong));
       }
    }
    updateEarthView() {
        let cameraPostion = new THREE.Vector3();
        this.camera.getWorldPosition(cameraPostion);
        let MapZoomLevel =  this.leafletMap.getZoom();
        let cameraDistanceFromOrigin = Math.sqrt(
            Math.pow(cameraPostion.x, 2) + 
            Math.pow(cameraPostion.y, 2) + 
            Math.pow(cameraPostion.z, 2)
        );
        const earthScale = getPlanetaryScale(this.scene.getObjectByName('earthSphere').geometry.boundingSphere.radius);
        const distnaceToEarth = cameraDistanceFromOrigin / earthScale;

        console.log('distnaceToEarth: ', distnaceToEarth);
        console.log('closestZoomLevel: ', getClosestsZoomLevel(distnaceToEarth));
        let SphereZoomLevel = getClosestsZoomLevel(distnaceToEarth);
        if(SphereZoomLevel > 7  && this.sphereView) {
            document.getElementById('mapid').style.visibility = 'visible';
            this.camera.position.set(cameraPostion.x *1.1, cameraPostion.y *1.1, cameraPostion.z *1.1);
            this.sphereView = false;
            this.leafletMap.setZoom(SphereZoomLevel);
            console.log('leafletMap cameraPostion: ', this.leafletMap.getCenter());
        } else if(MapZoomLevel < 5 && !this.sphereView) {

            console.log('this runs ...')
            document.getElementById('mapid').style.visibility = 'hidden';
            this.leafletMap.setZoom(5);
            this.sphereView = true;
        }
    }
    render() {

        // this.camera.lookAt(this.scene.position );

        // this.camera.updateMatrixWorld();

        this.sceneObjects.forEach(sceneObject => {
            sceneObject.rerender(this.scene, this.camera);
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.updateEarthView();
    }
}

export default Renderer;