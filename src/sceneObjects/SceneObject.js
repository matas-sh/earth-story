import SceneObjectIdentifier from './SceneObjectIdentifier';

class SceneObject {
    constructor() {
        this._sid = SceneObjectIdentifier.generateSID();
    }

    get sid() {
        return this.sid;
    }

    get threeJSObject() {
        return null;
    }

    rerender() {
    }
}

export default SceneObject;