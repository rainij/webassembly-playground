#!/bin/bash

PORT=$1
python3 -m http.server -d bundle/ $PORT
