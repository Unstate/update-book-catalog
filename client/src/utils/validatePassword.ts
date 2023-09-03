export const validatePassword = (value: string) => {
    let error
    if (!value) {
      error = 'Required'
    } else if (value.length < 6) {
      error = 'Password too short! Password must be more than 6 symbols'
    } else if (value.length > 20) {
      error = 'Password too big! Password must be less than 20 symbols'
    }
    return error
  }
  