#!/bin/sh

port=50180
addr=127.0.0.1
tdir=./sample.d

npx http-server \
  --port ${port} \
  -a "${addr}" \
  "${tdir}"
