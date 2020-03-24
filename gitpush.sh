echo 'Enter the commit message:'
read commitMessage


git commit -m "$commitMessage"

git switch master

echo 'Pushing to master...'
git push origin master

echo 'Changing .gitignore...'
perl -i -pe's/src/release/g' .gitignore

git commit -m "$commitMessage"

git switch release

#git remote update
#git pull

echo 'Pushing to release...'
git push origin release

echo 'Changing .gitignore back to default'
perl -i -pe's/release/src/g' .gitignore

echo 'Pushed to github successfully!'


