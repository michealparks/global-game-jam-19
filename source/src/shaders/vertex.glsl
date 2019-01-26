#version 300 es

precision highp float;

in vec4 aVertexPosition;
in mediump vec2 aTexturePosition;

uniform bool uHasTexture;
uniform bool uInstanced;
uniform mat4 uMatrix;

out mediump vec2 texCoord;

void main() {
  if (uHasTexture) {
    texCoord = aTexturePosition;
  }

  gl_Position = uMatrix * aVertexPosition;
}
