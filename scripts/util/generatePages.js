const fs = require('fs')

function generatePages (metadata) {
  const published = metadata.filter(article => article.publish)

  published.forEach(article => {
    const page = toPage(article)
    write(page, article)
  })

  console.log(`Generated ${published.length} pages`)
}

function toPage ({ title, body, updatedAt }) {
  return `\
<template lang="md">\n\
<UpdatedAt timestamp="${updatedAt}" />\n\
# ${title}\n\
\n\
${body}</template>\n\
\n\
<script>\n\
export default {\n\
  head: () => ({\n\
    title: 'Baleada - ${title}',\n\
  })\n\
}\n\
</script>\n\
`
}

function write (article, { path }) {
  const pagesPath = path
    .replace(/assets\/markdown/, 'pages/docs')
    .replace(/\.md$/, '.vue')

  fs.writeFileSync(pagesPath, article)
}

module.exports = {
  generatePages
}
