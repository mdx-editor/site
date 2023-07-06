#!/usr/bin/env bash

cd ../editor
pnpm build
pnpm pack
cd -
npm install ../editor/mdxeditor-editor-0.0.0-development.tgz
rm -rf .next/cache
