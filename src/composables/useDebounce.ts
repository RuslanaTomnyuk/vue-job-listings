import { customRef, Ref } from 'vue'

export const useDebounce = (refValue: Ref<any>, delay = 400) => {
  let timeout: NodeJS.Timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return refValue.value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          refValue.value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
