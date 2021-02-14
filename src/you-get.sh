PREFIX="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo 'working in '$PREFIX
mkdir -p $PREFIX/dl

if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    echo 'passing' $* 'to you-get'
    URL=${@: -1}
    you-get -o $PREFIX/dl $*
    echo "Download" $URL "is done"
#    python3 $PREFIX/db.py pop $URL
fi