#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

git checkout gh-pages

rm -rf ./*

git add -A .
git commit -m "delete everything"

git subtree push --prefix dist gh-pages master
