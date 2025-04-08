export type SourceType = "texture" | "gltf";

export type Source = {
  name: string;
  type: SourceType;
  path: string;
};

const sources: Source[] = [
  {
    name: "argentinaFlagTexture",
    type: "texture",
    path: "./textures/argentina-flag.webp",
  },
];

export default sources;
