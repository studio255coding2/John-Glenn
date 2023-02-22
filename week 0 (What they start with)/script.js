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

var render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera); 
  }
  
  render();



document.body.requestPointerLock = document.body.requestPointerLock ||
                                    document.body.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock ||
                                   document.mozExitPointerLock;
        document.body.onclick = function() {
          document.body.requestPointerLock();
        };
        


document.body.onmousemove = function(evt) {
    camera.rotation.y-=evt.movementX/65;
  };

  document.body.onkeydown = function (evt) {
    if(evt.keyCode==38||evt.keyCode==87) { 
      var direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.add( direction );
    }
    if(evt.keyCode==40||evt.keyCode==83) { 
      var direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.sub( direction );
    }
}