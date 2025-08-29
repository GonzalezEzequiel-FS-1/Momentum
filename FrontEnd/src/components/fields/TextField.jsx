import { TextInput } from '@mantine/core'
import React from 'react'
import PropTypes from 'prop-types'
const TextField = ({ label, description }) => {
  return (
    <>
      <TextInput
        label={label}
        description={description}
        styles={(theme) => ({
          input: {
            backgroundColor: theme.colorScheme === "dark" ? "#00000050" : "#ffffff90",
            border: `1px solid ${theme.colors.gray[6]}`,
            width:'100%',
          },
          root:{
            marginTop:'2rem'
          },
          description:{
            marginBottom:'1rem'
          }
        })}
      />
    </>
  )
}

export default TextField

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
