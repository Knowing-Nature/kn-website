#!/bin/bash

linkinator http://localhost:1313 \
  --recurse \
  --verbosity debug \
  --timeout 10000 \
  --skip 'twitter.com' \
  --format CSV > broken-links.csv
