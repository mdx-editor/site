#!/usr/bin/env bash

cd ../editor
pnpm build
pnpm build:docs:api
cd -
rm -rf api-ref
cp -r ../editor/docs/api api-ref
