const EARTH_DIAMETER = 12732000;

// taken from - https://gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to
const ZOOM_TO_METER_MAP = {
    20: 1128.497220,
    19: 2256.994440,
    18: 4513.988880,
    17: 9027.977761,
    16: 18055.955520,
    15: 36111.911040,
    14: 72223.822090,
    13: 144447.644200,
    12: 288895.288400,
    11: 577790.576700,
    10: 1155581.153000,
    9: 2311162.307000,
    8: 4622324.614000,
    7: 9244649.227000,
    6: 18489298.450000,
    5: 36978596.910000,
    4: 73957193.820000,
    3: 147914387.600000,
    2: 295828775.300000,
    1: 591657550.500000,
}

export const getPlanetaryScale = (sphereRadius) => {

    return (sphereRadius * 2) / EARTH_DIAMETER;
}

export const getClosestsZoomLevel = (distanceToSphere) => {
    let currentClosestZoomLevel = 20;
    Object.entries(ZOOM_TO_METER_MAP).forEach(([key, value]) => {
        const currentZoomDistanceDifference = Math.abs(ZOOM_TO_METER_MAP[currentClosestZoomLevel] - distanceToSphere);
        const nextPosZoomDistanceDifference =  Math.abs(value - distanceToSphere);
        if(currentZoomDistanceDifference > nextPosZoomDistanceDifference)  {
            currentClosestZoomLevel = key;
        }
    });

    return currentClosestZoomLevel;
}

/*
    z - ↑
    y - ⬋
    x - ⬊
     ↑
    ⬋⬊
*/

export const polarCoordinatesToCartesian = (radius, loc) => {
    const [lat, long] = loc;
    const phi = (90-lat) * (Math.PI/180); // polar 
    const theta = (long+180) * (Math.PI/180); // azimuthal

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z];
}

export const cartesianCoordinatesToPolar = (loc) => {

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