import React, {ComponentType} from 'react'
import {useFormikContext} from 'formik'

import {ContextType} from './types'
import {TextFieldProps} from '@material-ui/core/TextField'

type Props = TextFieldProps & {
  name: string
  component: ComponentType<any>
}

const Input = ({name, component: Component, ...props}: Props) => {
  const {setFieldError, touched, values, errors, handleChange, handleBlur} = useFormikContext<ContextType>()

  function handleFocus() {
    setFieldError(name, '')
  }

  return (
    <Component
      error={!!(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      name={name}
      {...props}
    />
  )
}

export default Input
