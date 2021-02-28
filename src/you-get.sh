PREFIX="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo 'working in '$PREFIX
mkdir -p $PREFIX/dl
echo 'full args is '$*
mkdir -p $1
echo 'downloading to '$1

if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    OUTPUT=--output-dir $1
    ARGS=${@:2}
    echo 'passing' $OUTPUT $ARGS 'to you-get'
    URL=${@: -1}
    you-get -o $1 $ARGS
    echo "Download" $URL "is done"
#    python3 $PREFIX/db.py pop $URL
fi