#!/bin/bash

#update repository
git pull
npm install
tsc
npm run build
pm2 restart ./pm2.json
