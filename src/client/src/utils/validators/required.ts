import * as Yup from 'yup'

const REQUIRED_TEXT = 'This field is required'

function required(type: 'string'): Yup.StringSchema<string> {
  return Yup[type]().required(REQUIRED_TEXT)
}

export const requiredString = required('string')
