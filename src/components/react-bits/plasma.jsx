import { useRef, useEffect } from 'react'

const VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const FRAGMENT = `
  precision mediump float;
  uniform float time;
  uniform vec2 resolution;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float speed;
  uniform float scale;

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time * speed;

    float v1 = sin(uv.x * scale + t);
    float v2 = sin(uv.y * scale + t);
    float v3 = sin((uv.x + uv.y) * scale + t);
    float v4 = sin(sqrt(uv.x * uv.x + uv.y * uv.y) * scale * 1.5 + t);
    float v = (v1 + v2 + v3 + v4) * 0.25;

    vec3 col = mix(color1, color2, v * 0.5 + 0.5);
    col = mix(col, color3, sin(v * 3.14159) * 0.5 + 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function Plasma({
  color1 = [0.15, 0.05, 0.35],
  color2 = [0.05, 0.15, 0.45],
  color3 = [0.25, 0.1, 0.55],
  speed = 0.3,
  scale = 4.0,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'time')
    const uRes = gl.getUniformLocation(program, 'resolution')
    const uColor1 = gl.getUniformLocation(program, 'color1')
    const uColor2 = gl.getUniformLocation(program, 'color2')
    const uColor3 = gl.getUniformLocation(program, 'color3')
    const uSpeed = gl.getUniformLocation(program, 'speed')
    const uScale = gl.getUniformLocation(program, 'scale')

    gl.uniform3fv(uColor1, color1)
    gl.uniform3fv(uColor2, color2)
    gl.uniform3fv(uColor3, color3)
    gl.uniform1f(uSpeed, speed)
    gl.uniform1f(uScale, scale)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const start = performance.now()
    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [color1, color2, color3, speed, scale])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
    />
  )
}
