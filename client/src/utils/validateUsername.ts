export const validateUsername = (value: string) => {
    let error
    if (!value) {
      error = 'Required'
    }
    return error
  }