#!/bin/bash

node_modules/.bin/spellchecker -f 'content/**/*.md' \
    --language en-CA \
    --dictionaries dictionary.txt \
    --plugins spell \
        indefinite-article \
        repeated-words \
        syntax-mentions \
        syntax-urls \
        frontmatter \
    --frontmatter-keys title summary tags categories
