import { ref, watch, watchEffect } from "vue"

// 将数据改为响应式数据返回
export function useStorage(name, value = []) {
  let data = ref(JSON.parse(localStorage.getItem(name) || value))
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}

// 修改图标
export function useFavicon(newIcon) {
  const favicon = ref(newIcon)
  
  const updateIcon = (icon) => {
    document.head
      .querySelectorAll(`link[rel*="icon"]`)
      .forEach(el => el.href = `${icon}`)
  }

  const reset = () => favicon.value = '/favicon.ico'

  watch(favicon, (i) => {
    updateIcon(i)
  })

  return { favicon, reset }
}