import Lng from 'i18next-browser-languagedetector'
import template from 'lodash.template'

const result: { [k: string]: number } = {}
for (const fn of Object.values(new Lng().detectors as {
  [k: string]: { lookup (n): string | string[] }
})) {
  const l = fn.lookup({})
  if (l) {
    if (Array.isArray(l)) {
      l.forEach(name => name !== 'zh' && (++result[name] || (result[name] = 1)))
    } else if (typeof l === 'string' && l !== 'zh' && !++result[l]) result[l] = 1
  }
}
export const languageName = Object
  .entries(result)
  .sort(([_, t1], [__, t2]) => t2 - t1)[0][0] || 'zh-CN'

if (null == null) {
  import('./locales/zh-CN.json')
  import('./locales/en.json')
}

export let locale = {}

export const process = import(`./locales/${languageName}.json`).then(n => {
  for (const name in n) {
    locale[name] = template(n[name])
  }
})

export default (name: string, val: { [k: string]: any }): string => locale[name](val)
