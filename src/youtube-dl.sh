PREFIX="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo 'working in '$PREFIX
mkdir -p $PREFIX/dl

if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    echo 'passing' $* 'to youtube-dl'
    URL=${@: -1}
    cd $PREFIX/dl 
    youtube-dl $*
    echo "Download" $URL "is done"
    cd $PREFIX
#    python3 $PREFIX/db.py pop $URL
fi