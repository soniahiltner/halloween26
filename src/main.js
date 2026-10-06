import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'


// Initialize GUI
const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('#webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

// Textures
const textureLoader = new THREE.TextureLoader()
//floor texture
const floorTexture = textureLoader.load('src/assets/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('src/assets/floor/brown_mud_leaves_01_1k/textures/brown_mud_leaves_01_diff_1k.jpg')
const floorARMTexture = textureLoader.load('src/assets/floor/brown_mud_leaves_01_1k/textures/brown_mud_leaves_01_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('src/assets/floor/brown_mud_leaves_01_1k/textures/brown_mud_leaves_01_nor_1k.jpg')
const floorDisplacementTexture = textureLoader.load('src/assets/floor/brown_mud_leaves_01_1k/textures/brown_mud_leaves_01_disp_1k.jpg')


//Floor texture
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.085,
  })
)
floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// Wall texture
const wallColorTexture = textureLoader.load('src/assets/wall/castle_brick_07_1k/textures/castle_brick_07_diff_1k.jpg')
const wallARMTexture = textureLoader.load('src/assets/wall/castle_brick_07_1k/textures/castle_brick_07_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('src/assets/wall/castle_brick_07_1k/textures/castle_brick_07_nor_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof texture
const roofColorTexture = textureLoader.load('src/assets/roof/clay_roof_tiles_02_1k/textures/clay_roof_tiles_02_diff_1k.jpg')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofARMTexture = textureLoader.load('src/assets/roof/clay_roof_tiles_02_1k/textures/clay_roof_tiles_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('src/assets/roof/clay_roof_tiles_02_1k/textures/clay_roof_tiles_02_nor_1k.jpg')

roofColorTexture.repeat.set(3, 1)
roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.repeat.set(3, 1)
roofARMTexture.wrapS = THREE.RepeatWrapping

roofNormalTexture.repeat.set(3, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush texture
const bushColorTexture = textureLoader.load('src/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('src/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('src/assets/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)
bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave texture
const graveColorTexture = textureLoader.load('src/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('src/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('src/assets/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace
graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

//door texture
const doorColorTexture = textureLoader.load('src/assets/door/rusty_metal_03_1k/textures/rusty_metal_03_diff_1k.jpg')
const doorARMTexture = textureLoader.load('src/assets/door/rusty_metal_03_1k/textures/rusty_metal_03_arm_1k.jpg')
const doorNormalTexture = textureLoader.load('src/assets/door/rusty_metal_03_1k/textures/rusty_metal_03_nor_1k.jpg')
const doorDisplacementTexture = textureLoader.load('src/assets/door/rusty_metal_03_1k/textures/rusty_metal_03_disp_1k.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

// House container
const house = new THREE.Group()
scene.add(house)

const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4
}

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseMeasurements.width, houseMeasurements.height, houseMeasurements.depth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
)
walls.position.y = 2.5 * 0.5
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(houseMeasurements.width * 0.85, houseMeasurements.height *0.9, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
)
roof.position.y = houseMeasurements.height + (houseMeasurements.height * 0.4)
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.BoxGeometry(houseMeasurements.width * 0.25, houseMeasurements.height * 0.75, 0.05, 100, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    aoMap: doorARMTexture,
    roughnessMap: doorARMTexture,
    metalnessMap: doorARMTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorDisplacementTexture,
    displacementScale: 0.01,
  })
)
door.position.y = houseMeasurements.height * 0.25
door.position.z = houseMeasurements.depth * 0.5 + 0.05
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Grave
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

// Create multiple graves
for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  const angle = Math.random() * Math.PI * 2
  // Coordinates for the grave based on polar coordinates
  const x = Math.sin(angle)
  const z = Math.cos(angle)
  const radius = 3 + Math.random() * 4
  grave.position.x = x * radius
  grave.position.z = z * radius
  grave.position.y = Math.random() * 0.5
  grave.rotation.x = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  graves.add(grave)
}

// Ghosts
const ghost1 = new THREE.PointLight('#8800ff', 4)
const ghost2 = new THREE.PointLight('#ff0088', 4)
const ghost3 = new THREE.PointLight('#ff0000', 4)
scene.add(ghost1, ghost2, ghost3)

// Lights
const ambientLight = new THREE.AmbientLight('#86cdff', 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#86cdff', 0.275)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 3)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

gui.add(ambientLight, 'intensity').min(0).max(10).step(0.1)
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.1)
gui.add(doorLight, 'intensity').min(0).max(10).step(0.1)

// Shadows
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
  grave.castShadow = true
  grave.receiveShadow = true
}

//shadow optimization
// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

// Sky
const sky = new Sky()
sky.material.uniforms['turbidity'].value = 0
sky.material.uniforms['rayleigh'].value = 10
sky.material.uniforms['mieCoefficient'].value = 1
sky.material.uniforms['mieDirectionalG'].value = 1
sky.material.uniforms['sunPosition'].value.set(0.3, -0.02, -0.95)
sky.scale.set(50, 50, 50)
scene.add(sky)

gui.add(sky.material.uniforms['turbidity'], 'value').min(0).max(20).step(0.1)
gui.add(sky.material.uniforms['rayleigh'], 'value').min(0).max(10).step(0.1)
gui.add(sky.material.uniforms['mieCoefficient'], 'value').min(0).max(1).step(0.01)
gui.add(sky.material.uniforms['mieDirectionalG'], 'value').min(0).max(1).step(0.01)
gui.add(sky.material.uniforms['sunPosition'].value, 'x').min(-1).max(1).step(0.01)
gui.add(sky.material.uniforms['sunPosition'].value, 'y').min(-1).max(1).step(0.01)
gui.add(sky.material.uniforms['sunPosition'].value, 'z').min(-1).max(1).step(0.01)  

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
//scene.fog = fog
scene.fog = new THREE.FogExp2('#dd5115', 0.1)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Handle window resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen handling
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

// Timer
const timer = new THREE.Timer()


function animate() {
  const elapsedTime =timer.getElapsed()
  timer.update()

  // Update ghost positions
  const ghostAngle1 = elapsedTime * 0.5
  const ghostAngle2 = -elapsedTime * 0.32
  const ghostAngle3 = elapsedTime * 0.28

  ghost1.position.x = Math.cos(ghostAngle1) * 4
  ghost1.position.z = Math.sin(ghostAngle1) * 4
  ghost1.position.y = Math.sin(ghostAngle1) * Math.sin(ghostAngle1 * 2.34) * Math.sin(ghostAngle1 * 3.45)

  ghost2.position.x = Math.cos(ghostAngle2) * 5
  ghost2.position.z = Math.sin(ghostAngle2) * 6
  ghost2.position.y = Math.sin(ghostAngle2) * Math.sin(ghostAngle2 * 2.34) * Math.sin(ghostAngle2 * 3.45)

  ghost3.position.x = Math.cos(ghostAngle3) * 7
  ghost3.position.z = Math.sin(ghostAngle3) * 7
  ghost3.position.y = Math.sin(ghostAngle3) * Math.sin(ghostAngle3 * 3.34) * Math.sin(ghostAngle3 * 0.45)

  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()