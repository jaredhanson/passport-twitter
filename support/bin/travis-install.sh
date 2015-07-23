#!/usr/bin/env bash

nodeVersion=$(node --version)
echo "Node version: ${nodeVersion}"

case $nodeVersion in
  v0.8.*)
    echo "Node 0.8"
    npm install istanbul@0.3.9 -g
    npm install coveralls -g
    ;;
  *) # latest
    npm install istanbul -g
    npm install coveralls -g
    ;;
esac
