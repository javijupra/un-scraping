# https://unix.stackexchange.com/questions/698848/how-to-speed-up-curl
# time sh -c 'cat search_urls.txt | xargs -P0 -n1 curl'
    #  grep -oE 'http[}]}'

# Fetch all urls in parallel and output individual files to avoid concurrent writing to one file:
# cat search_urls.txt | xargs -P0 -n1 curl > results_raw.txt
cat -n ../search_urls.txt | xargs -P0 -n2 curl -o

# Merge all files into one:
cat * >> ../results_raw.txt

# Grab urls from those results:
cat results_raw.txt | grep -oE 'http[^}]+' >> results_urls.txt

# Remove duplicates, if necessary:
awk '!seen[$0]++' results_urls.txt > clean_results_urls_2.txt  
# awk '!seen[$0]++' results_urls.txt >> clean_results_urls.txt  
