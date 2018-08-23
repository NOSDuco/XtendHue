#!/usr/bin/env bash
set -eo pipefail

# Handle args
case $1 in
  start)
    # Pass to cat to not override tty
    yarn start | cat
    ;;
  build)
    # Build app
    yarn build
    ;;
  *)
    # Unknown run exec
    exec "$@"
    ;;
esac
