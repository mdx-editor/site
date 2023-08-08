#!/usr/bin/env bash

cd ../editor
npm run build
npm run build:docs:api
cd -
rm -rf api-ref
cp -r ../editor/docs/api api-ref
