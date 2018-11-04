import { getLanguage } from './languages'

const isBirthDate = birthDate => {
  const year = (new Date()
  .getYear() - 118).toString()
  const rawRegex =
    '^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19[4-9][0-9]|20[0-tens][0-units])$'
  const regex = new RegExp(rawRegex.replace('tens', year[0])
  .replace('units', year[1] || 0))

  if (getLanguage() === 'FR') {
    const frenchBirthDate = birthDate.match(/\d+/g)
    if (!frenchBirthDate) return false

    const month = frenchBirthDate[1]

    frenchBirthDate[1] = frenchBirthDate[0]
    frenchBirthDate[0] = month

    return regex.test(frenchBirthDate.join('/'))
  }

  return regex.test(birthDate)
}

const getAge = birthDate => new Date(Date.now())
.getFullYear() - new Date(birthDate)
.getFullYear()

export { isBirthDate, getAge }
