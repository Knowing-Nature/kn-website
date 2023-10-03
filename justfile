CHECKER := "node_modules/.bin/spellchecker"

spellcheck:
    {{CHECKER}} -f 'content/**/*.md' \
    --language en-CA \
    --dictionaries dictionary.txt \
    --plugins spell \
        indefinite-article \
        repeated-words \
        syntax-mentions \
        syntax-urls \
        frontmatter \
    --frontmatter-keys title summary tags categories
