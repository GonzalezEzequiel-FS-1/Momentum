import React, { useState, useEffect } from 'react'
import InputField from '../fields/InputField'
import PasswordField from '../fields/PasswordField'
import { Anchor, Checkbox } from '@mantine/core'
import PropTypes from 'prop-types'
PasswordField

const SignUp = ({ userName, setUserName, email, password, setEmail, setPassword, agreedToTerms, setAgreedToTerms }) => {
  const [confirmedPass, setConfirmedPass] = useState('')
  const [testError, setTestError] = useState('')
  const passMatch = () => {
    if (!password || !confirmedPass) {
      setTestError('');
      return;
    }

    setTestError(password === confirmedPass ? '' : 'Passwords do not match');
  };
  useEffect(() => {
    passMatch()
  }, [confirmedPass])
  return (
    <form className='flex flex-col gap-5'>
      <p>{testError}</p>
      <InputField
        label={'User Name'}
        value={userName}
        type='text'
        onChange={(e) => setUserName(e.target.value)}
        placeholder={'Type your User Name'}
      />
      <InputField
        label={'Email'}
        value={email}
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Type your Email'}
      />
      <PasswordField
        label={'Password'}
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
        placeholder={'Type Password'}
      />
      <PasswordField
        label={'Confirm your password'}
        value={confirmedPass}
        onChange={(e) => { setConfirmedPass(e.target.value) }}
        placeholder={'Confirm your Password'}
      />
      <Checkbox
        value={agreedToTerms}
        onChange={(e) => setAgreedToTerms(e.target.checked)}
        label={
          <>
            I accept the {' '}
            <Anchor
              href="/tos"
            >Terms of Service</Anchor>
          </>
        }
        styles={{
          body: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          },
          label: {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
      
    </form>
  )
}

export default SignUp

SignUp.propTypes = {
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
  agreedToTerms: PropTypes.bool.isRequired,
  setAgreedToTerms: PropTypes.func.isRequired
};
