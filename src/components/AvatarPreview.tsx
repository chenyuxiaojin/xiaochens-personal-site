import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function AvatarPreview() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState('Loading avatar')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#070708')

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 1.25, 4.2)
    camera.lookAt(0, 0.45, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const key = new THREE.DirectionalLight('#fff2df', 3.1)
    key.position.set(2.8, 4, 4)
    scene.add(key)

    const rim = new THREE.DirectionalLight('#8fb4ff', 1.4)
    rim.position.set(-3, 2.5, -2)
    scene.add(rim)

    const fill = new THREE.HemisphereLight('#e8f0ff', '#2b1d17', 1.2)
    scene.add(fill)

    const group = new THREE.Group()
    group.position.y = -0.15
    scene.add(group)

    const grid = new THREE.GridHelper(4, 24, '#343238', '#17171b')
    grid.position.y = -0.03
    scene.add(grid)

    const loader = new GLTFLoader()
    let disposed = false

    loader.load(
      '/assets/avatar/avatar-bust.glb',
      (gltf) => {
        if (disposed) return

        const model = gltf.scene
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        box.getSize(size)
        box.getCenter(center)

        model.position.sub(center)
        const scale = 2.35 / Math.max(size.x, size.y, size.z)
        model.scale.setScalar(scale)
        model.rotation.y = -0.12
        group.add(model)
        setStatus('Drag view by moving around the model')
      },
      undefined,
      () => {
        if (!disposed) setStatus('Avatar failed to load')
      },
    )

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    let frame = 0
    const clock = new THREE.Clock()

    const render = () => {
      frame = requestAnimationFrame(render)
      const elapsed = clock.getElapsedTime()
      group.rotation.y = Math.sin(elapsed * 0.55) * 0.18
      group.position.y = -0.18 + Math.sin(elapsed * 0.9) * 0.025
      renderer.render(scene, camera)
    }

    window.addEventListener('resize', resize)
    resize()
    render()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070708] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,185,123,0.22),transparent_34%),radial-gradient(circle_at_20%_70%,rgba(94,134,255,0.22),transparent_30%)]" />
      <div ref={mountRef} className="absolute inset-0" aria-label="3D avatar preview" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">Avatar GLB Preview</p>
          <h1 className="mt-2 max-w-[12ch] text-3xl font-semibold leading-none sm:text-5xl">Personal 3D Bust</h1>
        </div>
        <a
          href="/"
          className="pointer-events-auto rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/16"
        >
          Back
        </a>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
        <p className="max-w-sm text-sm text-white/55">{status}</p>
      </div>
    </main>
  )
}
