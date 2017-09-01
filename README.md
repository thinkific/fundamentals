# Fundamentals
Starter theme package for Site Builder

## To compile into zip file
1. Run `make` in the terminal

## Git Tagging Process
1. Merge your pull request into master
2. Checkout master locally:

    `git checkout master`

    `git pull`
3. Bump up the theme version in src/manifest.json + run `git add .`
4. Run `standard-version` - this automatically updates the CHANGELOG.md + package.json + package-lock.json file and commits them
5. `git push origin --tags`
