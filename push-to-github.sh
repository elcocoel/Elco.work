#!/bin/bash
# Edit the two lines below in Cursor, then run: bash push-to-github.sh

GITHUB_USERNAME="elcocoel"
REPO_NAME="elementary-complexity-site"

# Don't edit below this line
if [[ -z "$GITHUB_USERNAME" || "$GITHUB_USERNAME" == "YOUR_GITHUB_USERNAME" ]]; then
  echo "Error: Edit GITHUB_USERNAME in this script (line 4) with your GitHub username before running."
  exit 1
fi
URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
echo "Adding remote: $URL"
git remote remove origin 2>/dev/null
git remote add origin "$URL"
echo "Pushing to GitHub..."
git push -u origin main
