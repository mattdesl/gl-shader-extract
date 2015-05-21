# gl-shader-extract

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Extracts active uniforms and attributes from a compiled WebGLProgram at runtime and normalizes their types to match GLSL syntax.

For an offline version, see [glsl-extract](https://www.npmjs.com/package/glsl-extract). 

## Example

```js
var extract = require('gl-shader-extract')

var fragSource = 'void main()'
var vertSource = `
  attribute vec4 position;
  uniform mat4 projection;
  void main() { 
    gl_Position = projection * position;
  }
`

//compile the source into a WebGLProgram object
var program = ...

//get the uniforms and attributes
var data = extract(gl, program)

console.log(data.attributes[0]) 
// { type: "vec4", name: 'position' }

console.log(data.uniforms[0]) 
// { type: "mat4", name: 'projection' }
```

## Usage

[![NPM](https://nodei.co/npm/gl-shader-extract.png)](https://www.npmjs.com/package/gl-shader-extract)

### Install

```sh
npm install gl-shader-extract --save
```

### API

#### `data = extract(gl, program)`

Extracts the `type` and `name` from each uniform/attribute that was active in the shader. The returned `data` looks like this:

```js
{
  attributes: [ { name: 'position', type: 'vec4' } ],
  uniforms: [ { name: 'projection', type: 'mat4' } ]
}
```

#### `uniforms = extract.uniforms(gl, program)`

As above, but only returns `uniforms` array.

#### `attributes = extract.attributes(gl, program)`

As above, but only returns `attributes` array.

### Type Mapping

|getProgramParameter|normalized|
|---|---|
| `FLOAT_VEC2` | `vec2` |
| `FLOAT_VEC3` | `vec3` |
| `FLOAT_VEC4` | `vec4` |
| `INT` | `int` |
| `INT_VEC2` | `ivec2` |
| `INT_VEC3` | `ivec3` |
| `INT_VEC4` | `ivec4` |
| `BOOL` | `bool` |
| `BOOL_VEC2` | `bvec2` |
| `BOOL_VEC3` | `bvec3` |
| `BOOL_VEC4` | `bvec4` |
| `FLOAT_MAT2` | `mat2` |
| `FLOAT_MAT3` | `mat3` |
| `FLOAT_MAT4` | `mat4` |
| `SAMPLER_2D` | `sampler2D` |
| `SAMPLER_CUBE` | `samplerCube` |

## Credits

This was pulled out from @mikolalysenko's [gl-shader](https://www.npmjs.com/package/glsl-shader) for use in other engines/frameworks.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/gl-shader-extract/blob/master/LICENSE.md) for details.
