if [ $# -eq 0 ]
then
    echo 'no args is passed!'
else
    echo 'args list: ' $*
    wget $*
fi