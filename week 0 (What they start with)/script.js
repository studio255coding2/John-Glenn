var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("red")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
 
var geometry = new THREE.BoxGeometry(1,1,1)
var material = new THREE.MeshLambertMaterial({color: "turqise"})
var cube1 = new THREE.Mesh(geometry, material)
cube1.rotation.z = 45;
scene.add(cube1)

var light = new THREE.PointLight(new THREE.Color("white"), 1, 500)
light.position.set(10,10,10)
scene.add(light)

renderer.render