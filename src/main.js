import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


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

//Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial()
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

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
  new THREE.MeshStandardMaterial()
)
walls.position.y = 2.5 * 0.5
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(houseMeasurements.width * 0.75, houseMeasurements.height, 4),
  new THREE.MeshStandardMaterial()
)
roof.position.y = houseMeasurements.height + (houseMeasurements.height * 0.5)
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.BoxGeometry(houseMeasurements.width * 0.25, houseMeasurements.height * 0.5, 0.1),
  new THREE.MeshStandardMaterial()
)
door.position.y = houseMeasurements.height * 0.25
door.position.z = houseMeasurements.depth * 0.5 + 0.05
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 10, 7.5)
scene.add(directionalLight)

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
  timer.getElapsed()
  timer.update()
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()