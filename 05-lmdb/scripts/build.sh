#!/usr/bin/env bash

## Remove build-artifacts
if [[ -d "dist" ]];
then
	echo "🧹 Build artifacts exists, removing them..."
	rm -r ./dist
fi

## Run build
echo "🏗️ Running build-script with hygine checks 🩹🧑‍⚕️"
npm run build-app
