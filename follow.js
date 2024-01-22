import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
//console.log(OBJLoader);





//scene
let scene = new THREE.Scene();



//mousemove//////////////////////////////////////////////////////////////////////////////////////////
const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();



window.addEventListener("mousemove", function(e){

    //normalize mouse values
    mouse.x = (e.clientX/window.innerWidth)* 2 - 1;
    mouse.y = -((e.clientY/window.innerHeight)* 2 - 1);
    //console.log(mouse)
    //copy method copies the cordinates of the camera position then ve normalize these values
    planeNormal.copy(camera.position).normalize()

    //We use this in order to create the plane 
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position)
    raycaster.setFromCamera(mouse, camera)

    //call the intersect plan method that takes 2 argument 
    raycaster.ray.intersectPlane(plane, intersectionPoint)
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////


//mesh
/*
const geometry = new THREE.SphereGeometry(2)
const material = new THREE.MeshStandardMaterial({color: "red"} )
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0,-5)
scene.add(mesh)

*/



/******************************************************************* */
// instantiate a loader
const loader = new OBJLoader();

loader.load("./12.obj", function(obj){
    scene.add(obj);
});
/*
// load a resource
loader.load(
	// resource URL
	'ANGELSMERGED.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
*/
/******************************************************************* */

//light
/*
const pointLight = new THREE.PointLight( 0xff0000, 10, 1000 );
pointLight.position.set( 1, 1, 9);
scene.add( pointLight );

const sphereSize = 0.5;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
*/


// light 2/////////////////////////////////////////

const pointLight2 = new THREE.PointLight( 0xffffff, 3, 10);

scene.add( pointLight2 );

const sphereSize2 = 0.3;
const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize2 );
scene.add( pointLightHelper2 );

//camera ///////////////////////////////////////////

const aspect ={
    width: window.innerWidth,
    height: window. innerHeight
}
const camera = new THREE.PerspectiveCamera(30, aspect.width/aspect.height)
camera.position.z = 10
scene.add(camera);




//rendere///////////////////////////////////////////
const canvas = document.querySelector(".draw")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(aspect.width, aspect.height);


//Animate///////////////////////////////////////////
function animate(){
    renderer.render(scene, camera);
   // console.log(intersectionPoint.x)
    pointLight2.position.copy(intersectionPoint);
}
renderer.setAnimationLoop(animate)

