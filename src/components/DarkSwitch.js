import themeChanger from '../theme'

const isDark = false
const themeChange = new themeChanger()

function changeMode() {
  themeChange._darkThemeSwitch()
  isDark = !isDark
}

const sun = createElement(i, {
  class: {
    'iconfont': true,
    'icon-sun': true
  }
})

const moon = createElement(i, {
  class: {
    'iconfont': true,
    'icon-moon': true
  }
})

export default {
  name: 'DarkSwitch',
  render() {
    return 
  }
}