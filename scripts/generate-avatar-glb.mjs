import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const outPath = resolve("public/assets/avatar/avatar-bust.glb");

const materials = [
  mat("warm skin", [0.82, 0.56, 0.43, 1], 0.82, 0.05),
  mat("buzz cut hair", [0.018, 0.017, 0.016, 1], 0.72, 0.03),
  mat("soft black shirt", [0.012, 0.012, 0.014, 1], 0.9, 0.02),
  mat("dark eyes", [0.03, 0.022, 0.018, 1], 0.45, 0.01),
  mat("subtle lip tint", [0.54, 0.27, 0.25, 1], 0.68, 0.02),
  mat("silver ear stud", [0.82, 0.8, 0.72, 1], 0.28, 0.8),
  mat("matte microphone", [0.05, 0.052, 0.06, 1], 0.88, 0.08),
  mat("chair silhouette", [0.02, 0.02, 0.023, 1], 0.92, 0.01),
];

const meshes = [];

add("head", ellipsoid([0.42, 1.62, 0], [0.39, 0.54, 0.34], 36, 22), 0);
add("buzz-cut cap", ellipsoid([0, 1.78, -0.018], [0.405, 0.385, 0.35], 36, 12, 0, Math.PI * 0.66), 1);
add("rear hair shadow", ellipsoid([0, 1.62, -0.18], [0.39, 0.42, 0.19], 36, 10, Math.PI * 0.1, Math.PI * 0.82), 1);
add("left ear", ellipsoid([-0.405, 1.6, 0.005], [0.07, 0.13, 0.045], 18, 12), 0);
add("right ear", ellipsoid([0.405, 1.6, 0.005], [0.07, 0.13, 0.045], 18, 12), 0);
add("left ear stud", ellipsoid([-0.447, 1.535, 0.045], [0.018, 0.018, 0.012], 14, 8), 5);

add("neck", frustum([0, 1.04, 0], 0.135, 0.12, 0.18, 0.15, 0.46, 28), 0);
add("shoulders", ellipsoid([0, 0.72, -0.015], [0.72, 0.28, 0.28], 32, 14), 2);
add("shirt torso", frustum([0, 0.42, -0.01], 0.56, 0.25, 0.38, 0.21, 0.58, 32), 2);
add("shirt collar left", box([-0.12, 0.93, 0.245], [0.2, 0.08, 0.035]), 2);
add("shirt collar right", box([0.12, 0.93, 0.245], [0.2, 0.08, 0.035]), 2);

add("left eye", ellipsoid([-0.14, 1.68, 0.323], [0.052, 0.018, 0.012], 16, 8), 3);
add("right eye", ellipsoid([0.14, 1.68, 0.323], [0.052, 0.018, 0.012], 16, 8), 3);
add("left brow", box([-0.14, 1.75, 0.321], [0.14, 0.018, 0.012]), 1);
add("right brow", box([0.14, 1.75, 0.321], [0.14, 0.018, 0.012]), 1);
add("nose bridge", ellipsoid([0, 1.59, 0.345], [0.045, 0.15, 0.045], 18, 10), 0);
add("nose tip", ellipsoid([0, 1.525, 0.382], [0.07, 0.043, 0.036], 18, 10), 0);
add("left nostril", ellipsoid([-0.032, 1.505, 0.412], [0.014, 0.007, 0.006], 10, 6), 3);
add("right nostril", ellipsoid([0.032, 1.505, 0.412], [0.014, 0.007, 0.006], 10, 6), 3);
add("mouth", ellipsoid([0, 1.41, 0.345], [0.115, 0.025, 0.014], 20, 8), 4);
add("lower lip shadow", ellipsoid([0, 1.37, 0.332], [0.09, 0.011, 0.009], 16, 6), 3);

add("microphone foam", ellipsoid([-0.56, 0.93, 0.42], [0.11, 0.24, 0.11], 24, 14), 6);
add("microphone stem", frustum([-0.56, 0.64, 0.42], 0.035, 0.035, 0.035, 0.035, 0.38, 18), 6);
add("chair back", ellipsoid([0.28, 1.06, -0.36], [0.57, 0.7, 0.07], 28, 14), 7);

const gltf = {
  asset: {
    version: "2.0",
    generator: "Codex procedural avatar bust generator",
  },
  scene: 0,
  scenes: [{ nodes: meshes.map((_, i) => i) }],
  nodes: meshes.map((mesh, i) => ({ name: mesh.name, mesh: i })),
  meshes: [],
  materials,
  accessors: [],
  bufferViews: [],
  buffers: [{ byteLength: 0 }],
};

const chunks = [];

for (const item of meshes) {
  const positionAccessor = addAccessor(gltf, chunks, new Float32Array(item.geometry.positions), "VEC3", 5126);
  const normalAccessor = addAccessor(gltf, chunks, new Float32Array(item.geometry.normals), "VEC3", 5126);
  const indexAccessor = addAccessor(gltf, chunks, new Uint32Array(item.geometry.indices), "SCALAR", 5125);

  gltf.meshes.push({
    name: item.name,
    primitives: [
      {
        attributes: {
          POSITION: positionAccessor,
          NORMAL: normalAccessor,
        },
        indices: indexAccessor,
        material: item.material,
      },
    ],
  });
}

const bin = Buffer.concat(chunks);
gltf.buffers[0].byteLength = bin.byteLength;

const json = Buffer.from(JSON.stringify(gltf));
const jsonPadded = pad(json, 0x20);
const binPadded = pad(bin, 0);
const totalLength = 12 + 8 + jsonPadded.byteLength + 8 + binPadded.byteLength;
const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0);
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLength, 8);

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonPadded.byteLength, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4);

const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binPadded.byteLength, 0);
binHeader.writeUInt32LE(0x004e4942, 4);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.concat([header, jsonHeader, jsonPadded, binHeader, binPadded]));

writeFileSync(
  resolve("public/assets/avatar/README.md"),
  `# Avatar Bust GLB

Generated from the provided reference as a stylized, web-ready 3D bust.

- File: \`avatar-bust.glb\`
- Style: low-poly/procedural, suitable for Three.js hero scenes
- Reference traits: buzz cut, slim face, black shirt, small ear stud, desk microphone
- Units: arbitrary glTF units, centered for a portrait hero composition

Example:

\`\`\`ts
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

new GLTFLoader().load("/assets/avatar/avatar-bust.glb", (gltf) => {
  scene.add(gltf.scene);
});
\`\`\`
`
);

console.log(`Wrote ${outPath}`);

function mat(name, baseColorFactor, roughnessFactor, metallicFactor) {
  return {
    name,
    doubleSided: true,
    pbrMetallicRoughness: {
      baseColorFactor,
      roughnessFactor,
      metallicFactor,
    },
  };
}

function add(name, geometry, material) {
  meshes.push({ name, geometry, material });
}

function addAccessor(gltf, chunks, array, type, componentType) {
  const byteOffset = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const raw = Buffer.from(array.buffer);
  const padded = pad(raw, 0);
  const bufferView = gltf.bufferViews.length;
  gltf.bufferViews.push({ buffer: 0, byteOffset, byteLength: raw.byteLength });
  chunks.push(padded);

  const accessor = {
    bufferView,
    byteOffset: 0,
    componentType,
    count: componentCount(array, type),
    type,
  };

  if (type === "VEC3" && componentType === 5126) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < array.length; i += 3) {
      for (let axis = 0; axis < 3; axis += 1) {
        min[axis] = Math.min(min[axis], array[i + axis]);
        max[axis] = Math.max(max[axis], array[i + axis]);
      }
    }
    accessor.min = min;
    accessor.max = max;
  }

  gltf.accessors.push(accessor);
  return gltf.accessors.length - 1;
}

function componentCount(array, type) {
  const widths = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
  return array.length / widths[type];
}

function pad(buffer, fill) {
  const padding = (4 - (buffer.byteLength % 4)) % 4;
  if (!padding) return buffer;
  return Buffer.concat([buffer, Buffer.alloc(padding, fill)]);
}

function ellipsoid(center, radius, segments = 32, rings = 16, phiStart = 0, phiEnd = Math.PI) {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let y = 0; y <= rings; y += 1) {
    const v = y / rings;
    const phi = phiStart + v * (phiEnd - phiStart);
    for (let x = 0; x <= segments; x += 1) {
      const u = x / segments;
      const theta = u * Math.PI * 2;
      const sx = Math.sin(phi) * Math.cos(theta);
      const sy = Math.cos(phi);
      const sz = Math.sin(phi) * Math.sin(theta);
      positions.push(center[0] + sx * radius[0], center[1] + sy * radius[1], center[2] + sz * radius[2]);
      const nx = sx / Math.max(radius[0], 0.0001);
      const ny = sy / Math.max(radius[1], 0.0001);
      const nz = sz / Math.max(radius[2], 0.0001);
      const n = normalize([nx, ny, nz]);
      normals.push(n[0], n[1], n[2]);
    }
  }

  for (let y = 0; y < rings; y += 1) {
    for (let x = 0; x < segments; x += 1) {
      const a = y * (segments + 1) + x;
      const b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  return { positions, normals, indices };
}

function frustum(center, rxBottom, rzBottom, rxTop, rzTop, height, segments = 24) {
  const positions = [];
  const normals = [];
  const indices = [];
  const yBottom = center[1] - height / 2;
  const yTop = center[1] + height / 2;

  for (let y = 0; y <= 1; y += 1) {
    const yy = y ? yTop : yBottom;
    const rx = y ? rxTop : rxBottom;
    const rz = y ? rzTop : rzBottom;
    for (let i = 0; i <= segments; i += 1) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta);
      const z = Math.sin(theta);
      positions.push(center[0] + x * rx, yy, center[2] + z * rz);
      const n = normalize([x / rx, 0.08, z / rz]);
      normals.push(n[0], n[1], n[2]);
    }
  }

  for (let i = 0; i < segments; i += 1) {
    const a = i;
    const b = i + segments + 1;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }

  return { positions, normals, indices };
}

function box(center, size) {
  const [cx, cy, cz] = center;
  const [sx, sy, sz] = size.map((n) => n / 2);
  const faces = [
    [[1, 0, 0], [[sx, -sy, -sz], [sx, sy, -sz], [sx, sy, sz], [sx, -sy, sz]]],
    [[-1, 0, 0], [[-sx, -sy, sz], [-sx, sy, sz], [-sx, sy, -sz], [-sx, -sy, -sz]]],
    [[0, 1, 0], [[-sx, sy, -sz], [-sx, sy, sz], [sx, sy, sz], [sx, sy, -sz]]],
    [[0, -1, 0], [[-sx, -sy, sz], [-sx, -sy, -sz], [sx, -sy, -sz], [sx, -sy, sz]]],
    [[0, 0, 1], [[-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]]],
    [[0, 0, -1], [[sx, -sy, -sz], [-sx, -sy, -sz], [-sx, sy, -sz], [sx, sy, -sz]]],
  ];
  const positions = [];
  const normals = [];
  const indices = [];
  for (const [normal, verts] of faces) {
    const offset = positions.length / 3;
    for (const v of verts) {
      positions.push(cx + v[0], cy + v[1], cz + v[2]);
      normals.push(normal[0], normal[1], normal[2]);
    }
    indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
  }
  return { positions, normals, indices };
}

function normalize(v) {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}
