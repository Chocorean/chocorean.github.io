#!/usr/bin/env bash

PP="mdbook-blog-preprocessor"
BIN="${PP}/target/release/${PP}"

if [ ! -f "${BIN}" ]
then
  (
    cd "${PP}" || exit 1
    cargo build --release
  )
fi

"./${BIN}"
