import * as THREE from 'three';
import * as GENERIC from '../../../../utils/ThreeUtils';
import NoisePlanetSubject from './NoisePlanetSubject';

const SceneManager = () => {
    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const mousePosition = {
        x: 0,
        y: 0
    }

    let canvas, container, camera, screenDimensions, scene, renderer, sceneSubjects;

    function mount(CANVAS, CONTAINER){
        ({canvas, camera, screenDimensions, scene, renderer, sceneSubjects} = GENERIC.mount(CANVAS));
        container = CONTAINER;

        camera.position.set(-2, 27, 25);
        camera.up.set( 0, 1, 0 );
        camera.lookAt(0.0, 0.0, 0.0);
        camera.position.set(2, 26, 25);
        camera.updateProjectionMatrix();

        sceneSubjects = createSceneSubjects(scene, CONTAINER);
    }

    function unmount(){
        
    }

    function createSceneSubjects(scene, container) {
        const sceneSubjects = [
            new NoisePlanetSubject(scene)
        ];

        return sceneSubjects;
    }

    function update() {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
        camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].onWindowResize(width, height);
    }

    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    return {
        mount,
        unmount,
        update,
        onWindowResize,
        onMouseMove
    }
}

export default SceneManager;