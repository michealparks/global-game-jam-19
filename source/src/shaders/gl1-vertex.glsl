precision highp float;

attribute vec4 aVertexPosition;
attribute mediump vec2 aTexturePosition;

uniform mat4 uMatrix;

varying mediump vec2 texCoord;

void main() {
  texCoord = aTexturePosition;
  gl_Position = uMatrix * aVertexPosition;
}
