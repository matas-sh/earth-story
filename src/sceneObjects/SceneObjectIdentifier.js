class SceneObjectIdentifier {
    constructor() {
        if(!SceneObjectIdentifier.instance) {
            this.SIDCounter = 0;
            SceneObjectIdentifier.instance = this;
        }

        return SceneObjectIdentifier.instance; 
    }

    generateSID() {
        this.SIDCounter += 1;
        return this.SIDCounter;
    }
}

const SceneObjectIdentifierSingleton = new SceneObjectIdentifier();

export default SceneObjectIdentifierSingleton;