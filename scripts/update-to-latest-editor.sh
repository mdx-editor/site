#!/bin/bash

npm i --legacy-peer-deps @mdxeditor/editor@latest
git add package.json package-lock.json
git commit --message "Update to latest editor"
git push
