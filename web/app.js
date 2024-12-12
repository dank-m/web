// app.js

let scene, camera, renderer, carModel;

// Initialize Three.js scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('car-model'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee, 1);
    document.getElementById('car-model-container').appendChild(renderer.domElement);

    // Load the Ferrari SF90 Stradale model (.fbx format)
    const loader = new THREE.FBXLoader();
    loader.load('model.fbx', function (object) {
        carModel = object;
        carModel.scale.set(1, 1, 1);  // Adjust scale if necessary
        scene.add(carModel);
        carModel.position.y = -1;  // Position the model

        // Set up lighting
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        camera.position.z = 5;  // Set camera position to view the model

        animate();
    });

    // Resize the renderer when the window is resized
    window.addEventListener('resize', onWindowResize, false);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the model for animation effect
    if (carModel) {
        carModel.rotation.y += 0.01; // Rotate the model slowly
    }

    renderer.render(scene, camera);
}

// Adjust renderer on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start the application
init();
