import React from 'react'
import axiosMock from 'jest/utils/axiosMock'
import {render, fireEvent, RenderResult, act} from '@testing-library/react'

import Component from '.'
import * as userStorage from 'utils/userStorage'
import store, {Provider} from 'store'
import {UserType} from 'types/user'

describe('SignInContainer', () => {
  let component: RenderResult

  beforeEach(() => {
    act(() => {
      component = renderComponent()
    })
  })

  context('when user submits the login form', () => {
    beforeEach(() => {
      act(() => {
        fireEvent.change(component.queryByLabelText(/username/i)!, {target: {value: 'test@test.com'}})
        fireEvent.change(component.queryByLabelText(/password/i)!, {target: {value: 'password'}})
      })
    })

    context('when the server returns success messages', () => {
      beforeEach(async () => {
        axiosMock
          .onPost('http://localhost:8001/session')
          .replyOnce(200, {username: 'test@test.com', token: 'someToken'})

        await act(async () => {
          fireEvent.click(component.queryByTestId('sign-in-button')!)
        })
      })

      it('saves authentication data in the store', () => {
        const userState = store.getState().user

        expect(userState.username).toBe('test@test.com')
        expect(userState.token).toBe('someToken')
      })

      it('saves authentication data in the local storage', () => {
        const userStore = userStorage.get() as UserType

        expect(userStore.username).toBe('test@test.com')
        expect(userStore.token).toBe('someToken')
      })
    })
  })
})

function renderComponent(): RenderResult {
  return render(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}
