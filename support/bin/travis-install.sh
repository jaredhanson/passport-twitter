#!/usr/bin/env bash

nodeVersion=$(node --version)
echo "Node version: ${nodeVersion}"

case $nodeVersion in
  v0.8.*)
    # Attempting to install istanbul@0.3.10 or later causes `npm install` to
    # fail with the following error:
    #
    #     Error: No compatible version found: esprima@'^1.2.2'
    #
    # This appears to be a problem with esprima as a transitive dependency
    # through escodegen.  istanbul@0.3.9 declares the following dependency
    # in package.json:
    #
    #     "dependencies": {
    #         ...
    #         "escodegen": "1.3.x",
    #         ...
    #      }
    #
    # escodegen@1.3.3, in turn, declares the following dependency:
    #
    #     "dependencies": {
    #         ...
    #         "esprima": "~1.1.1"
    #     }
    #
    # After successful install, npm reports the following dependency tree:
    #
    #     istanbul@0.3.9 /home/travis/.nvm/v0.8.28/lib/node_modules/istanbul
    #     ├── ...
    #     ├── escodegen@1.3.3 (estraverse@1.5.1, esutils@1.0.0, esprima@1.1.1, source-map@0.1.43)
    #     └── ...
    #
    #
    # istanbul@0.3.10 declares the following dependency in package.json:
    #
    #     "dependencies": {
    #       "escodegen": "1.6.x",
    #       ...
    #      }
    #
    # escodegen@1.6.1, in turn, declares the following dependency:
    #
    #     "dependencies": {
    #         ...
    #         "esprima": "^1.2.2",
    #         ...
    #     }
    #
    # It is suspected that the switch from tilde (~)-style to caret (^)-style
    # ranges is causing this issue on older versions of npm.
    npm install istanbul@0.3.9 -g
    npm install coveralls -g
    ;;
  *) # latest
    npm install istanbul -g
    npm install coveralls -g
    ;;
esac
