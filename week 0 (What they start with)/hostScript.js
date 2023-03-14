const socket = io("ws://204.110.223.239:8080")

var clientRefreshRate = 10

setInterval(function(){
    socket.emit("gameDataFromHost", JSON.stringify(scene))
}, clientRefreshRate)


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
//cube1.rotation.z = 45;
scene.add(cube1)

var geometry = new THREE.BoxGeometry(30, 1, 30); 
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
var ground = new THREE.Mesh(geometry, material);
ground.position.y = -1
scene.add(ground);


var geometry = new THREE.BoxGeometry(0.5, 7, 0.5); 
var material = new THREE.MeshLambertMaterial({color: "brown"}); 
var treetrunk = new THREE.Mesh(geometry, material);
treetrunk.position.z = -3;
scene.add(treetrunk);
var geometry = new THREE.BoxGeometry(3, 2, 3); 
var material = new THREE.MeshLambertMaterial({color: "green"}); 
var treeleaves = new THREE.Mesh(geometry, material);
treeleaves.position.z = -3;
treeleaves.position.y = 3.5;
scene.add(treeleaves);


var nbmOfHills = 3;
for(var i=0; i<nbmOfHills; i++){
  for(var j=-2; j<4; j+=0.1){
    var geometry = new THREE.BoxGeometry(30, 1, 1); 
    var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
    var hill = new THREE.Mesh(geometry, material);
    hill.position.set(0, Math.sin(j), ((i*10)+j)-10)
    scene.add(hill);
  }
}

for(var i=0; i<60; i++){
  for(var j=0; j<10; j++){
    var geometry = new THREE.BoxGeometry(0.1, 0.2, 0.1); 
    var material = new THREE.MeshLambertMaterial({color: "green"}); 
    var grass = new THREE.Mesh(geometry, material);
    grass.position.set(i*0.2, 0, j*0.2-4)
    scene.add(grass);
  }
}


var light = new THREE.PointLight(0xFFFFFF, 1, 500); 
light.position.set(0, 30, 0);
scene.add(light);
var sungeometry = new THREE.SphereGeometry(1); 
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
var sun = new THREE.Mesh(sungeometry, material);
scene.add(sun);


var raycaster = new THREE.Raycaster();
var downDirection = new THREE.Vector3( 0, -1, 0)
var gravity = 0.2
var timePassed =0;
var render = function() {
  light.position.set(0, Math.sin(timePassed)*30, Math.cos(timePassed)*30)
  sun.position.set(light.position.x, light.position.y+3, light.position.z)
    raycaster.set(camera.position, downDirection);
    var intersects = raycaster.intersectObjects(scene.children)
    if(intersects.length>0){
        if(intersects[0].distance>1){
        camera.position.y-=gravity;
        }
    }
    var direction = new THREE.Vector3();
    camera.getWorldDirection( direction );
    raycaster.set(camera.position, direction);
          var intersects = raycaster.intersectObjects(scene.children);
          if(intersects.length>0) {
            if(intersects[0].distance<1) {
                camera.position.y+=1;
            }
          }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    timePassed+=0.001; 
}
render()



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

      camera.position.add( direction );
    }
    if(evt.keyCode==40||evt.keyCode==83) { 
      var direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.sub( direction );
    }
    if(evt.keyCode==32){
      this.camera = camera;
      this.camera.position.y++;
    }
}



var geometry = new THREE.BoxGeometry(0.3, 0.7, 0.3); 
var material = new THREE.MeshLambertMaterial({color: "red"}); 
var hostPlayer = new THREE.Mesh(geometry, material);
hostPlayer.position.x = camera.position.x
hostPlayer.position.y = camera.position.y
hostPlayer.position.z = camera.position.z
scene.add(hostPlayer);



var geometry = new THREE.BoxGeometry(0.3, 0.7, 0.3); 
var material = new THREE.MeshLambertMaterial({color: "blue"}); 
var otherPlayer = new THREE.Mesh(geometry, material);
scene.add(otherPlayer);
socket.on("updatedPlayerPos", data => {
otherPlayer.position.x = data.x
otherPlayer.position.y = data.y
otherPlayer.position.z = data.z
})
