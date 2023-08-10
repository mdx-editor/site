#!/usr/bin/env bash

cd ../editor
npm run build
npm pack
cd -
npm install ../editor/mdxeditor-editor-0.0.0-development.tgz
rm -rf .next/cache
