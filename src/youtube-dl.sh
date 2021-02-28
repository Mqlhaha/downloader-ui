PREFIX="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo 'working in '$PREFIX
echo 'passing full args '$*
mkdir -p $PREFIX/dl
mkdir -p $1
echo 'downloading to '$1

if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    ARGS=${@:2}
    echo 'passing' $ARGS 'to youtube-dl'
    URL=${@: -1}
    cd $1
    youtube-dl $ARGS
    echo "Download" $URL "is done"
    cd $PREFIX
#    python3 $PREFIX/db.py pop $URL
fi