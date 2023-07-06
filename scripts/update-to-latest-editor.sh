#!/bin/bash

npm i @mdxeditor/editor@latest
git add package.json package-lock.json
git commit --message "Update to latest editor"
git push
