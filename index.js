'use strict'

var GL_TO_GLSL_TYPES = require('./lib/glsl-types')

module.exports = function extract (gl, program) {
  return {
    uniforms: runtimeUniforms(gl, program),
    attributes: runtimeAttributes(gl, program)
  }
}

module.exports.uniforms = runtimeUniforms
module.exports.attributes = runtimeAttributes

var GL_TABLE = null

function getType (gl, type) {
  if (!GL_TABLE) {
    var typeNames = Object.keys(GL_TO_GLSL_TYPES)
    GL_TABLE = {}
    for (var i = 0; i < typeNames.length; ++i) {
      var tn = typeNames[i]
      var constant = gl[tn]
      if (typeof constant !== 'undefined') {
        GL_TABLE[constant] = GL_TO_GLSL_TYPES[tn]
      }
    }
  }
  return GL_TABLE[type]
}

function runtimeUniforms (gl, program) {
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  var result = []
  for (var i = 0; i < numUniforms; ++i) {
    var info = gl.getActiveUniform(program, i)
    if (info) {
      result.push({
        name: info.name,
        type: getType(gl, info.type)
      })
    }
  }
  return result
}

function runtimeAttributes (gl, program) {
  var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  var result = []
  for (var i = 0; i < numAttributes; ++i) {
    var info = gl.getActiveAttrib(program, i)
    if (info) {
      result.push({
        name: info.name,
        type: getType(gl, info.type)
      })
    }
  }
  return result
}
