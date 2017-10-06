import {zipObj} from 'ramda'

export function extractValuesFromOptions (properties, obj) {
  return Object.assign({}, obj, zipObj(properties, properties.map(property => obj[property].value)))
}

export function extractOptionsFromObjects (labelProperty, objs, idProperty = 'id') {
  return objs.map(obj => ({
    label: !Array.isArray(labelProperty) ? obj[labelProperty] : labelProperty.map(p => obj[p]).join(' '),
    value: obj[idProperty]
  }))
}
