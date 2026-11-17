# Avatar Bust GLB

Generated from the provided reference as a stylized, web-ready 3D bust.

- File: `avatar-bust.glb`
- Style: low-poly/procedural, suitable for Three.js hero scenes
- Reference traits: buzz cut, slim face, black shirt, small ear stud, desk microphone
- Units: arbitrary glTF units, centered for a portrait hero composition

Example:

```ts
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

new GLTFLoader().load("/assets/avatar/avatar-bust.glb", (gltf) => {
  scene.add(gltf.scene);
});
```
