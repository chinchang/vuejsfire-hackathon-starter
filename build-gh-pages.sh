git checkout gh-pages
git reset --hard master
npm run build
git add dist/ index.html
git commit -m 'build'
git push --force origin gh-pages
git checkout master