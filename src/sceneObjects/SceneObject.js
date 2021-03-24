import SceneObjectIdentifier from './SceneObjectIdentifier';

class SceneObject {
    constructor(displayName = null) {
        this._sid = SceneObjectIdentifier.generateSID();
        this._displayName = displayName;
    }

    get sid() {
        return this.sid;
    }

    get threeJSObject() {
        return null;
    }
    get displayName() {
        return this._displayName
    }

    rerender(scene, camera, callBack=()=>{}) {
        callBack();
    }
}

export default SceneObject;