export const t = (lang, text) => {
  const language = require('./' + lang + '.json')
  return language[text]
}