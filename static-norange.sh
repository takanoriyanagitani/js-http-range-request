#!/bin/sh

port=50180
addr=127.0.0.1
tdir=./sample.d

python3 \
  -m http.server \
  --bind "${addr}" \
  --directory "${tdir}" \
  ${port}
