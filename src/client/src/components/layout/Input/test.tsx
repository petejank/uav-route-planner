import React from 'react'
import * as Yup from 'yup'

import {Formik, Form} from 'components/shared/formik'
import {TextField} from 'components/shared/material'
import {requiredString} from 'utils/validators/required'
import {render, fireEvent, RenderResult, act} from '@testing-library/react'

import Component from '.'

describe('Input', () => {
  let component: RenderResult

  beforeEach(() => {
    act(() => {
      component = renderComponent()
    })
  })

  context('when user touches the input', () => {
    let usernameInput: HTMLElement

    beforeEach(() => {
      act(() => {
        usernameInput = component.queryByLabelText(/username/i)!
        fireEvent.change(usernameInput, {target: {value: ''}})
      })
    })

    context('when user blurs the input', () => {
      beforeEach(async () => {
        await act(async () => {
          fireEvent.blur(usernameInput)
        })
      })

      it('displays input validation error', () => {
        expect(component.queryByText('This field is required')).toBeTruthy()
      })

      context('when user focuses the input', () => {
        beforeEach(async () => {
          await act(async () => {
            fireEvent.focus(usernameInput)
          })
        })

        it('hides input validation error', () => {
          expect(component.queryByText('This field is required')).toBeNull()
        })
      })
    })
  })
})

function renderComponent(): RenderResult {
  return render(
    <Formik
      {...{
        initialValues: {
          username: ''
        },
        validationSchema: Yup.object().shape({
          username: requiredString
        }),
        onSubmit: () => undefined
      }}
    >
      <Form>
        <Component id="username" name="username" label="Username" component={TextField} />
      </Form>
    </Formik>
  )
}
