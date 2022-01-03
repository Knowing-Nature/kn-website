const fs = require("fs")
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const slugify = require('slugify')

var newPost;

// Figure out what kind of content we're adding
inquirer
	.prompt([
		{
			type: "list",
			name: "type",
			message: "What kind of post are you creating?",
			choices: ["episode", "resource"]
		},
		{
			name: "title",
			message: "What is the post's title?"
		}
	])
	.then((answers) => {
		if (answers.type == "episode") {
			createEpisode(answers)
		} else if (answers.type == "resource") {
			createResource(answers)
		}
	})


function createEpisode(newPost) {
	const { orderBy } = require('natural-orderby')
	const path = 'content/episode/'

	const dirsArray = fs.readdirSync(path).filter((file) => {
		// Match directories which start with a number
		return (fs.lstatSync(path+file).isDirectory() && file.match(/^\d/))
	})
	// Sort by natural order
	const ordered = orderBy(dirsArray)
	var nextEpisodeNum = parseInt(ordered.at(-1)) + 1

	var slug = slugify(newPost.title, {lower: true, strict: true})
	const markdownPath = `content/episode/${nextEpisodeNum}/${slug}/index.md`
	execSync(`hugo new ${markdownPath}`,
	{
		env: {
			...process.env,
			HUGO_KN_EPISODE: nextEpisodeNum,
			HUGO_KN_SLUG: slug,
			HUGO_KN_TITLE: newPost.title
		}
	})

	console.log(`Created new episode at ${markdownPath}`)
}

function createResource(newPost) {
	const path = 'content/resource/'
	const dirsArray = fs.readdirSync(path)
	var slug = slugify(newPost.title, {lower: true, strict: true})

	if (dirsArray.includes(slug)) {
		throw(`Whoops, post slug already exists (${slug})`)
	} else {
		const markdownPath = `content/resource/${slug}/index.md`
		execSync(`hugo new ${markdownPath}`,
		{
			env: {
				...process.env,
				HUGO_KN_SLUG: slug,
				HUGO_KN_TITLE: newPost.title
			}
		})

		console.log(`Created new resource at ${markdownPath}`)
	}
}
