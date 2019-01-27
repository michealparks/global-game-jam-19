#version 300 es

precision highp float;

in vec4 aVertexPosition;
in mediump vec2 aTexturePosition;

uniform mat4 uMatrix;

out mediump vec2 texCoord;

void main() {
  texCoord = aTexturePosition;
  gl_Position = uMatrix * aVertexPosition;
}
