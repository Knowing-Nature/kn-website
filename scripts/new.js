const { orderBy } = require('natural-orderby')
const fs = require("fs")
const readline = require('readline')
const { execSync } = require('child_process');
const slugify = require('slugify')

const path = 'content/episode/'

const dirsArray = fs.readdirSync(path).filter((file) => {
  // Match directories which start with a number
  return (fs.lstatSync(path+file).isDirectory() && file.match(/^\d/))
})
// Sort by natural order
const ordered = orderBy(dirsArray)
var nextEpisode = parseInt(ordered.at(-1)) + 1

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter episode title: ', (title) => {
  nextEpisode["title"] = title
  rl.close()

  var slug = slugify(title, {lower: true})
  const markdownPath = `content/episode/${nextEpisode}/${slug}/index.md`
  execSync(`hugo new ${markdownPath}`,
  {
    env: {
      ...process.env,
      HUGO_KN_EPISODE: nextEpisode,
      HUGO_KN_SLUG: slug,
      HUGO_KN_TITLE: title
    }
  })

  console.log(`Created new episode at ${markdownPath}`)
});

