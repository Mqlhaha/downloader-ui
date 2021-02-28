PREFIX="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo 'working in '$PREFIX
mkdir -p $PREFIX/dl

if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    echo 'args list: ' $*
    wget $*
fi