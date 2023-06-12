#!/usr/bin/env bash

cd ../editor
pnpm build
pnpm pack
cd -
npm install ../editor/mdxeditor-0.0.*.tgz
