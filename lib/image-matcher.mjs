const HASH_HEX_LENGTH = 16;
const COLOR_BUCKETS = 64;
const EDGE_CELLS = 16;

function assertPixels({ data, width, height } = {}) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    throw new Error("Pixel data requires positive integer width and height");
  }
  if (!data || data.length !== width * height * 4) {
    throw new Error("Pixel data length must equal width * height * 4");
  }
}

function assertDescriptor(descriptor) {
  if (
    !descriptor ||
    typeof descriptor.hash !== "string" ||
    !new RegExp(`^[0-9a-f]{${HASH_HEX_LENGTH}}$`, "i").test(descriptor.hash) ||
    !Array.isArray(descriptor.colors) ||
    descriptor.colors.length !== COLOR_BUCKETS ||
    !descriptor.colors.every(Number.isFinite) ||
    !Array.isArray(descriptor.edges) ||
    descriptor.edges.length !== EDGE_CELLS ||
    !descriptor.edges.every(Number.isFinite)
  ) {
    throw new Error("Invalid image descriptor");
  }
}

function pixelOffset(x, y, width) {
  return (y * width + x) * 4;
}

function sampleGray(data, width, height, sampleX, sampleY, sampleWidth, sampleHeight) {
  const x = Math.min(width - 1, Math.max(0, Math.floor(((sampleX + 0.5) / sampleWidth) * width)));
  const y = Math.min(height - 1, Math.max(0, Math.floor(((sampleY + 0.5) / sampleHeight) * height)));
  const offset = pixelOffset(x, y, width);
  return data[offset] * 0.299 + data[offset + 1] * 0.587 + data[offset + 2] * 0.114;
}

function differenceHash(data, width, height) {
  let bits = "";
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      bits += sampleGray(data, width, height, x, y, 9, 8) > sampleGray(data, width, height, x + 1, y, 9, 8) ? "1" : "0";
    }
  }
  let hash = "";
  for (let index = 0; index < bits.length; index += 4) {
    hash += Number.parseInt(bits.slice(index, index + 4), 2).toString(16);
  }
  return hash;
}

function colorHistogram(data, width, height) {
  const colors = Array(COLOR_BUCKETS).fill(0);
  const pixelCount = width * height;
  for (let index = 0; index < pixelCount; index += 1) {
    const offset = index * 4;
    const red = data[offset] >> 6;
    const green = data[offset + 1] >> 6;
    const blue = data[offset + 2] >> 6;
    colors[red * 16 + green * 4 + blue] += 1;
  }
  return colors.map((count) => count / pixelCount);
}

function edgeGrid(data, width, height) {
  const sums = Array(EDGE_CELLS).fill(0);
  const counts = Array(EDGE_CELLS).fill(0);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const left = sampleGray(data, width, height, x - 1, y, width, height);
      const right = sampleGray(data, width, height, x + 1, y, width, height);
      const top = sampleGray(data, width, height, x, y - 1, width, height);
      const bottom = sampleGray(data, width, height, x, y + 1, width, height);
      const magnitude = Math.min(1, (Math.abs(right - left) + Math.abs(bottom - top)) / 510);
      const cell = Math.min(3, Math.floor((y / height) * 4)) * 4 + Math.min(3, Math.floor((x / width) * 4));
      sums[cell] += magnitude;
      counts[cell] += 1;
    }
  }
  return sums.map((sum, index) => (counts[index] ? sum / counts[index] : 0));
}

export function descriptorFromPixels(pixels) {
  assertPixels(pixels);
  return {
    hash: differenceHash(pixels.data, pixels.width, pixels.height),
    colors: colorHistogram(pixels.data, pixels.width, pixels.height),
    edges: edgeGrid(pixels.data, pixels.width, pixels.height),
  };
}

function hashSimilarity(left, right) {
  let differentBits = 0;
  for (let index = 0; index < HASH_HEX_LENGTH; index += 1) {
    let value = Number.parseInt(left[index], 16) ^ Number.parseInt(right[index], 16);
    while (value) {
      differentBits += value & 1;
      value >>= 1;
    }
  }
  return 1 - differentBits / 64;
}

function vectorSimilarity(left, right, divisor) {
  const difference = left.reduce((sum, value, index) => sum + Math.abs(value - right[index]), 0);
  return Math.max(0, Math.min(1, 1 - difference / divisor));
}

export function scoreDescriptors(query, candidate) {
  assertDescriptor(query);
  assertDescriptor(candidate);
  return Math.max(0, Math.min(1,
    0.45 * hashSimilarity(query.hash, candidate.hash) +
    0.35 * vectorSimilarity(query.colors, candidate.colors, 2) +
    0.2 * vectorSimilarity(query.edges, candidate.edges, EDGE_CELLS),
  ));
}

export function rankLevelMatches(queryDescriptors, index, limit = 5) {
  if (!Array.isArray(queryDescriptors) || queryDescriptors.length === 0) throw new Error("A query descriptor is required");
  const bestByLevel = new Map();
  for (const entry of index) {
    let score = 0;
    for (const query of queryDescriptors) score = Math.max(score, scoreDescriptors(query, entry.descriptor));
    const id = String(entry.levelId);
    bestByLevel.set(id, Math.max(bestByLevel.get(id) || 0, score));
  }
  return [...bestByLevel.entries()]
    .map(([levelId, score]) => ({ levelId, score, confidence: score >= 0.82 ? "strong" : score >= 0.66 ? "possible" : "low" }))
    .sort((left, right) => right.score - left.score || Number(left.levelId) - Number(right.levelId))
    .slice(0, limit);
}
