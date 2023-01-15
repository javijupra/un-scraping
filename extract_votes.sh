# For one link:
# curl https://digitallibrary.un.org/record/3999186/export/xm | xml sel -t -v '/_:collection/_:record/_:datafield[@tag="967"]/_:subfield[@code="d" or @code="e"]'

#xargs with multiple commands and arguments:
# cat -n test.txt | xargs -P0 -n2 sh -c 'echo $1, $0'

# cat -n ../test.txt | xargs -P0 -n2 sh -c "curl $1 | xml sel -t -v '/_:collection/_:record/_:datafield[@tag=\"967\"]/_:subfield[@code=\"d\" or @code=\"e\"]' > $0.txt"

curl $2 | xml sel -t -v '/_:collection/_:record/_:datafield[@tag="967"]/_:subfield[@code="d" or @code="e"]' > extracted_votes/$1.txt

# Add document id:
cat -n clean_results_urls.txt | xargs -P0 -n2 sh -c 'grep -oE [0-9]+ <<< $1 >> extracted_votes_copy/$0.txt'