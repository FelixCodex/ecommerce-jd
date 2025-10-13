mv admin/.git admin/.git_backup
mv client/.git client/.git_backup      
mv server/.git server/.git_backup  

git add .
git commit -m "Update inner projects"
git push

mv admin/.git_backup admin/.git
mv client/.git_backup client/.git
mv server/.git_backup server/.git