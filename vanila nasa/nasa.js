// import "./style.css";
import * as THREE from 'three';
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

//import { MapControls} from "three/addons/controls/MapControls";
import { OrbitControls} from "three/addons/controls/OrbitControls";
// import * as dat from "dat.gui";




//-----------------------------Scene------------------------------------------
const scene = new THREE.Scene();

//--------------------------Debugging----------------------------------------
//const gui = new dat.GUI();
// console.log(gui)

//-----------------------Texture loader------------------------------------------

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("./s8.jpg");
colorTexture.colorSpace=THREE.SRGBColorSpace;


///////////////////////////////Lights//////////////////////////////////////
//------------------------1)AmbientLight-------------------------------------
const ambientLight = new THREE.AmbientLight("0xffffff", 4);
scene.add(ambientLight);
//gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Intensity One");


//-----------------------------6)SpotLight--------------------------------------
const spotLight = new THREE.SpotLight(0xffffff, 70, 800, Math.PI * 0.2, 1, );
//gui.add(spotLight.position, "z").min(10).max(20).step(0.01).name("Z Spot");
//gui.add(spotLight, "angle").min(0).max(3).step(0.01).name("Spot Angle");
//gui.add(spotLight, "penumbra").min(0).max(1).step(0.01).name("Spot Penumbra");
//gui.add(spotLight, "intensity").min(0).max(500).step(1).name("Spot int");
spotLight.position.z = 20;

scene.add(spotLight);

//-------------------------------------------Resizing----------------------------------------------
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
//-------------------------------- Mesh 2--------------------------------
const geometry = new THREE.SphereGeometry(300);
const material = new THREE.MeshStandardMaterial({map:colorTexture});

const mesh = new THREE.Mesh(geometry, material);
material.side = THREE.DoubleSide;
scene.add(mesh);


//-----------------------------Camera--------------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(50, aspect.width / aspect.height);
camera.position.z = 5;

scene.add(camera);

//-------------------spot light to camera------------------------------------------
camera.add(spotLight);

camera.add(spotLight.target);


spotLight.rotation.z= 6.8;


//----------------------------------------------Renderer-------------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width, aspect.height);

THREE.ColorManagement.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace

//--------------------------------------------OrbitControls----------------------------------------
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const animate = () => {
  

  
  
    //-----------------------------------------Update Controls----------------------------------------
    orbitControls.update();
    
    //--------------------------------------------Renderer--------------------------------------------
    renderer.render(scene, camera);



  
    //---------------------------------------RequestAnimationFrame------------------------------------
    window.requestAnimationFrame(animate);
    //----------------------------------------image from canvas---------------------------------------
  
  
  
  };
  
  animate();
  
  
  