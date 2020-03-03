import React from 'react'
import * as Yup from 'yup'

import {Formik, Form} from 'components/shared/formik'
import {Avatar, Button, Icon, Typography, TextField} from 'components/shared/material'
import {FormFieldsType} from './types'
import Input from 'components/layout/Input'
import {requiredString} from 'utils/validators/required'

import useStyles from './styles'

type Props = {
  authenticate: (username: string, password: string) => void
}

const SignInContent = ({authenticate}: Props) => {
  const classes = useStyles()
  const formProps = {
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      username: requiredString,
      password: requiredString
    }),
    onSubmit({username, password}: FormFieldsType) {
      authenticate(username, password)
    }
  }

  return (
    <div className={classes.signInWrapper}>
      <Avatar className={classes.signInAvatar}>
        <Icon type="LockOutlined" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik {...formProps}>
        <Form>
          <Input
            autoFocus
            fullWidth
            id="username"
            name="username"
            variant="outlined"
            margin="normal"
            label="Username"
            autoComplete="username"
            component={TextField}
          />
          <Input
            fullWidth
            id="password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            label="Password"
            autoComplete="current-password"
            component={TextField}
          />
          <Button
            fullWidth
            className={classes.signInSubmit}
            type="submit"
            variant="contained"
            color="primary"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignInContent
