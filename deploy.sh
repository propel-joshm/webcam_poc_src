set -e

cd build

git add .

git commit -m "Automatic deployment"

git push origin main 

cd ..