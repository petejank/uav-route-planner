import React from 'react'
import {Formik, FormikConfig} from 'formik'
import {ObjectType} from 'types/object'

const DEFAULT_PROPS = {
  validateOnChange: false,
  validateOnBlur: true
}

const FormikWrapper = (props: FormikConfig<ObjectType>) => <Formik {...props} {...DEFAULT_PROPS} />

export default FormikWrapper
