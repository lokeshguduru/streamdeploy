#!/bin/bash

# Script to test the app locally
echo "Starting local tests..."

cd app
npm install
npm test

if [ $? -eq 0 ]; then
  echo "Tests passed! Building Docker image..."
  docker build -t my-app:latest .
  echo "Running Docker container..."
  docker run -d -p 3000:3000 my-app:latest
  sleep 5
  curl http://localhost:3000/health
else
  echo "Tests failed. Check the output above."
  exit 1
fi