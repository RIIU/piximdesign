"use client";

import React, { useEffect, useRef } from "react";

export interface LiquidMetalProps {
  shape?: "none" | "circle" | "daisy" | "metaballs";
  colorBack?: string;
  colorTint?: string;
  speed?: number;
  softness?: number;
  repetition?: number;
  shiftRed?: number;
  shiftBlue?: number;
  distortion?: number;
  contour?: number;
  scale?: number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  originX?: number;
  originY?: number;
  fit?: "none" | "contain" | "cover";
  className?: string;
  style?: React.CSSProperties;
}

const VERTEX_SHADER = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize, vec2 maxBoxSize) {
  vec2 box = vec2(0.);
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) {
    box.x = boxRatio * min(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  } else if (u_fit == 2.) {
    box.x = boxRatio * max(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize, maxBoxSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize, maxBoxSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize, maxBoxSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV *= .01;

  vec2 imageBoxSize;
  if (u_fit == 1.) {
    imageBoxSize.x = min(maxBoxSize.x / u_imageAspectRatio, maxBoxSize.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) {
    imageBoxSize.x = max(maxBoxSize.x / u_imageAspectRatio, maxBoxSize.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec4 u_colorBack;
uniform vec4 u_colorTint;
uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_shape;

in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;
in vec2 v_imageUV;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {
  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));
  
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

void main() {
  float t = .1 * u_time;

  vec2 uv = v_objectUV;
  uv += .5;
  uv.y = 1. - uv.y;

  float cycleWidth = .5 * u_repetition;

  float mask = 1.;
  float contOffset = 1.;

  if (u_shape < 1.) {
    vec2 borderUV = v_responsiveUV + .5;
    float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
    vec2 edge = min(borderUV, 1. - borderUV);
    vec2 pixel_thickness = 250. / v_responsiveBoxGivenSize;
    float maskX = smoothstep(0.0, pixel_thickness.x, edge.x);
    float maskY = smoothstep(0.0, pixel_thickness.y, edge.y);
    maskX = pow(maskX, .25);
    maskY = pow(maskY, .25);
    mask = clamp(1. - maskX * maskY, 0., 1.);

    uv = v_responsiveUV;
    if (ratio > 1.) {
      uv.y /= ratio;
    } else {
      uv.x *= ratio;
    }
    uv += .5;
    uv.y = 1. - uv.y;

    cycleWidth *= 2.;
    contOffset = 1.5;

  } else if (u_shape < 2.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= .67;
    mask = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
  } else if (u_shape < 3.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= 1.68;

    float r = length(shapeUV) * 2.;
    float a = atan(shapeUV.y, shapeUV.x) + .2;
    r *= (1. + .05 * sin(3. * a + 2. * t));
    float f = abs(cos(a * 3.));
    mask = smoothstep(f, f + .7, r);
    mask = pow(mask, 2.);

    uv *= .8;
    cycleWidth *= 1.6;

  } else if (u_shape < 4.) {
    vec2 shapeUV = uv - .5;
    shapeUV *= 1.3;
    mask = 0.;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float speed = 4.5 + 2. * sin(fi * 12.345);
      float angle = -fi * 1.5;
      vec2 dir1 = vec2(cos(angle), sin(angle));
      vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
      vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
      float d = length(shapeUV + traj);
      mask += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
    }
    mask = 1. - smoothstep(.65, .9, mask);
    mask = pow(mask, 4.);
  }

  float opacity = 1. - smoothstep(.82 - 2. * fwidth(mask), .82, mask);

  float ridge = .15 * (smoothstep(.0, .15, uv.y) * smoothstep(.4, .15, uv.y));
  ridge += .05 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));
  mask += ridge;

  float diagBLtoTR = uv.x - uv.y;
  float diagTLtoBR = uv.x + uv.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);

  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  mask += (1. - mask) * u_distortion * noise;

  direction += diagBLtoTR;

  float contour = u_contour * smoothstep(0., contOffset + .01, mask) * smoothstep(contOffset + .01, 0., mask);
  direction -= 14. * noise * contour;

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - mask) * bump);
  direction *= smoothstep(1., .2, mask);

  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;

  float colorDispersion = (1. - bump);
  float dispersionRed = colorDispersion;
  dispersionRed += bump * noise;
  float dispersionBlue = colorDispersion;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = u_softness / 15. + .3 * contour;

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., mask + bump);
  float stripe_r = mod(direction + dispersionRed, 1.);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r), bump, u_colorTint.r);
  float stripe_g = mod(direction, 1.);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g), bump, u_colorTint.g);
  float stripe_b = mod(direction - dispersionBlue, 1.);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, opacity);
}
`;

const SHAPE_MAP = {
  none: 0,
  circle: 1,
  daisy: 2,
  metaballs: 3,
};

const FIT_MAP = {
  none: 0,
  contain: 1,
  cover: 2,
};

function parseColorToRgba(color: string): [number, number, number, number] {
  if (!color || color === "transparent") return [0, 0, 0, 0];
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("") + "ff";
    } else if (hex.length === 4) {
      hex = hex.slice(0, 3).split("").map((c) => c + c).join("") + hex[3] + hex[3];
    } else if (hex.length === 6) {
      hex += "ff";
    }
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b, isNaN(a) ? 1 : a];
  }
  const match = color.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i);
  if (match) {
    return [
      parseInt(match[1], 10) / 255,
      parseInt(match[2], 10) / 255,
      parseInt(match[3], 10) / 255,
      match[4] !== undefined ? parseFloat(match[4]) : 1,
    ];
  }
  return [0, 0, 0, 1];
}

export const LiquidMetal: React.FC<LiquidMetalProps> = ({
  shape = "metaballs",
  colorBack = "#ffffff00",
  colorTint = "#ffffff",
  speed = 0.75,
  softness = 0.3,
  repetition = 3,
  shiftRed = 0.3,
  shiftBlue = 0.3,
  distortion = 0.3,
  contour = 0.88,
  scale = 1.0,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  originX = 0.5,
  originY = 0.5,
  fit = "contain",
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const propsRef = useRef({
    shape,
    colorBack,
    colorTint,
    speed,
    softness,
    repetition,
    shiftRed,
    shiftBlue,
    distortion,
    contour,
    scale,
    rotation,
    offsetX,
    offsetY,
    originX,
    originY,
    fit,
  });

  propsRef.current = {
    shape,
    colorBack,
    colorTint,
    speed,
    softness,
    repetition,
    shiftRed,
    shiftBlue,
    distortion,
    contour,
    scale,
    rotation,
    offsetX,
    offsetY,
    originX,
    originY,
    fit,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvasRef.current = canvas;
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
    });

    if (!gl) {
      console.warn("LiquidMetal: WebGL2 not supported.");
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering clip space)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uPixelRatioLoc = gl.getUniformLocation(program, "u_pixelRatio");
    const uColorBackLoc = gl.getUniformLocation(program, "u_colorBack");
    const uColorTintLoc = gl.getUniformLocation(program, "u_colorTint");
    const uSoftnessLoc = gl.getUniformLocation(program, "u_softness");
    const uRepetitionLoc = gl.getUniformLocation(program, "u_repetition");
    const uShiftRedLoc = gl.getUniformLocation(program, "u_shiftRed");
    const uShiftBlueLoc = gl.getUniformLocation(program, "u_shiftBlue");
    const uDistortionLoc = gl.getUniformLocation(program, "u_distortion");
    const uContourLoc = gl.getUniformLocation(program, "u_contour");
    const uShapeLoc = gl.getUniformLocation(program, "u_shape");
    const uFitLoc = gl.getUniformLocation(program, "u_fit");
    const uScaleLoc = gl.getUniformLocation(program, "u_scale");
    const uRotationLoc = gl.getUniformLocation(program, "u_rotation");
    const uOffsetXLoc = gl.getUniformLocation(program, "u_offsetX");
    const uOffsetYLoc = gl.getUniformLocation(program, "u_offsetY");
    const uOriginXLoc = gl.getUniformLocation(program, "u_originX");
    const uOriginYLoc = gl.getUniformLocation(program, "u_originY");
    const uWorldWidthLoc = gl.getUniformLocation(program, "u_worldWidth");
    const uWorldHeightLoc = gl.getUniformLocation(program, "u_worldHeight");
    const uImageAspectRatioLoc = gl.getUniformLocation(program, "u_imageAspectRatio");

    let currentWidth = 0;
    let currentHeight = 0;
    let renderScale = 1;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        currentWidth = pixelWidth;
        currentHeight = pixelHeight;
        renderScale = dpr;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();

    let startTime = performance.now();
    let currentFrame = 0;
    let lastTime = startTime;

    const render = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const currentProps = propsRef.current;
      currentFrame += delta * currentProps.speed;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Pass time and dimensions
      if (uTimeLoc) gl.uniform1f(uTimeLoc, currentFrame * 0.001);
      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, currentWidth || 1, currentHeight || 1);
      if (uPixelRatioLoc) gl.uniform1f(uPixelRatioLoc, renderScale);
      if (uImageAspectRatioLoc) gl.uniform1f(uImageAspectRatioLoc, 1.0);

      // Uniforms from current props
      const backRgba = parseColorToRgba(currentProps.colorBack);
      if (uColorBackLoc) gl.uniform4fv(uColorBackLoc, backRgba);

      const tintRgba = parseColorToRgba(currentProps.colorTint);
      if (uColorTintLoc) gl.uniform4fv(uColorTintLoc, tintRgba);

      if (uSoftnessLoc) gl.uniform1f(uSoftnessLoc, currentProps.softness);
      if (uRepetitionLoc) gl.uniform1f(uRepetitionLoc, currentProps.repetition);
      if (uShiftRedLoc) gl.uniform1f(uShiftRedLoc, currentProps.shiftRed);
      if (uShiftBlueLoc) gl.uniform1f(uShiftBlueLoc, currentProps.shiftBlue);
      if (uDistortionLoc) gl.uniform1f(uDistortionLoc, currentProps.distortion);
      if (uContourLoc) gl.uniform1f(uContourLoc, currentProps.contour);
      if (uShapeLoc) gl.uniform1f(uShapeLoc, SHAPE_MAP[currentProps.shape] ?? 3);
      if (uFitLoc) gl.uniform1f(uFitLoc, FIT_MAP[currentProps.fit] ?? 1);
      if (uScaleLoc) gl.uniform1f(uScaleLoc, currentProps.scale);
      if (uRotationLoc) gl.uniform1f(uRotationLoc, currentProps.rotation);
      if (uOffsetXLoc) gl.uniform1f(uOffsetXLoc, currentProps.offsetX);
      if (uOffsetYLoc) gl.uniform1f(uOffsetYLoc, currentProps.offsetY);
      if (uOriginXLoc) gl.uniform1f(uOriginXLoc, currentProps.originX);
      if (uOriginYLoc) gl.uniform1f(uOriginYLoc, currentProps.originY);
      if (uWorldWidthLoc) gl.uniform1f(uWorldWidthLoc, 0);
      if (uWorldHeightLoc) gl.uniform1f(uWorldHeightLoc, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      gl.deleteBuffer(positionBuffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export default LiquidMetal;
