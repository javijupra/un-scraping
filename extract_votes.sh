# For one link:
curl https://digitallibrary.un.org/record/3999186/export/xm | xml sel -t -v '/_:collection/_:record/_:datafield[@tag="967"]/_:subfield[@code="d" or @code="e"]'

#xargs with multiple commands and arguments:
cat -n test.txt | xargs -P0 -n2 sh -c 'echo "$1",  "$0"'