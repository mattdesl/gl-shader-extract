var extract = require('../')
var test = require('tape')
var compile = require('webgl-compile-shader')

var glslify = require('glslify')

test('extracts uniforms and attributes from a shader object', function (t) {
  var vert = glslify('./shader.vert')
  var frag = glslify('./shader.frag')

  var gl = require('webgl-context')()
  var info = compile({
    gl: gl,
    vertex: vert,
    fragment: frag
  })
  var expected = require('./expected.json')
  var data = extract(gl, info.program)
  t.deepEqual(data, expected, 'matches expected')

  var uniforms = extract.uniforms(gl, info.program)
  t.deepEqual(uniforms, expected.uniforms, 'uniforms')

  var attribs = extract.attributes(gl, info.program)
  t.deepEqual(attribs, expected.attributes, 'attributes')
  gl.deleteProgram(info.program)

  t.end()
  if (window.close)
    window.close() //smokestack
})
