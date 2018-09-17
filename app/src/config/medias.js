import { css } from 'styled-components'

const sizes = {
  desktopLg: 1480,
  desktopMd: 1280,
  desktop: 1087,
  desktopSm: 991,
  tabletLg: 768,
  tabletMd: 640,
  tabletSm: 568,
  mobileLg: 480,
  mobileMd: 411,
  mobileSm: 360
}

const medias = Object.keys(sizes)
  .reduce((medias, mediaName) => {
    medias[mediaName] = {}
    medias[mediaName]['max'] = (...args) => css`
    @media (max-width: ${sizes[mediaName]}px) {
      ${css(...args)};
    }
  `
    medias[mediaName]['min'] = (...args) => css`
    @media (min-width: ${sizes[mediaName]}px) {
      ${css(...args)};
    }
  `
    return medias
  }, {})

export default medias
