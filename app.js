import { ARButton } from "https://unpkg.com/three@0.133.0/examples/jsm/webxr/ARButton.js";

let camera, scene, renderer;
let mesh;
let image;

// const setupMobileDebug = () => {
//     // First thing we do is setup the mobile debug console
//     // This library is very big so only use it while debugging
//     // just comment it out when your app is done
//     const containerEl = document.getElementById("console-ui");
//     eruda.init({
//         container: containerEl
//     });
//     const devToolEl = containerEl.shadowRoot.querySelector('.eruda-dev-tools');
//     devToolEl.style.height = '40%'; // control the height of the dev tool panel
// }

// let i = 0;
// const logsForMobileDebug = () => {
//     console.log(i++);
// }

const init = async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // setup a cone mesh to put on top of the image target when it is seen
    const modelUrl = 'https://raw.githubusercontent.com/cbrito1994/Lindsey-AR/main/assets/stradivariViolin.glb'
    const loader = new THREE.GLTFLoader();
    const gltf = await loader.loadAsync(modelUrl);
    const model = gltf.scene;
    model.scale.multiplyScalar(0.01);
    model.position.set(0, 0, -1);
    model.rotation.x = THREE.Math.degToRad(30);
    scene.add(model);

    const button = ARButton.createButton(renderer);
    document.body.appendChild(button);

    window.addEventListener("resize", onWindowResize, false);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
    renderer.setAnimationLoop(render);
}

const render = () => {
    renderer.render(scene, camera);
}


// setupMobileDebug();
// setInterval(logsForMobileDebug, 1000);

init();
animate();