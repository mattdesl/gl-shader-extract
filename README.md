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

As above, but only extracts the `uniforms` array.

#### `attributes = extract.attributes(gl, program)`

As above, but only extracts the `attributes` array.

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

#### WebGL 2.0 Support

The following are also translated in WebGL2.

|getProgramParameter|normalized|
|---|---|
| `FLOAT_MAT2x3` | `mat2x3` |
| `FLOAT_MAT2x4` | `mat2x4` |
| `FLOAT_MAT3x2` | `mat3x2` |
| `FLOAT_MAT3x4` | `mat3x4` |
| `FLOAT_MAT4x2` | `mat4x2` |
| `FLOAT_MAT4x3` | `mat4x3` |
| `UNSIGNED_INT` | `uint` |
| `UNSIGNED_INT_VEC2` | `uvec2` |
| `UNSIGNED_INT_VEC3` | `uvec3` |
| `UNSIGNED_INT_VEC4` | `uvec4` |
| `UNSIGNED_INT_SAMPLER_2D` | `usampler2D` |
| `UNSIGNED_INT_SAMPLER_3D` | `usampler3D` |
| `UNSIGNED_INT_SAMPLER_2D_ARRAY` | `usampler2DArray` |
| `UNSIGNED_INT_SAMPLER_CUBE` | `usamplerCube` |
| `INT_SAMPLER_2D` | `isampler2D` |
| `INT_SAMPLER_3D` | `isampler3D` |
| `INT_SAMPLER_2D_ARRAY` | `isampler2DArray` |
| `INT_SAMPLER_CUBE` | `isamplerCube` |

## Credits

This was pulled out from @mikolalysenko's [gl-shader](https://www.npmjs.com/package/gl-shader) for use in other engines/frameworks.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/gl-shader-extract/blob/master/LICENSE.md) for details.
