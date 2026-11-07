#!/usr/bin/env bash

PP="mdbook-index-pp"
BIN="${PP}/target/release/mdbook-index-pp"

if [ ! -f "${BIN}" ]
then
  (
    cd "${PP}" || exit 1
    cargo build --release
  )
fi

"./${BIN}"
