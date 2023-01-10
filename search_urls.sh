# https://unix.stackexchange.com/questions/698848/how-to-speed-up-curl
# time sh -c 'cat search_urls.txt | xargs -P0 -n1 curl'
    #  grep -oE 'http[}]}'

cat search_urls.txt | xargs -P0 -n1 curl > results_raw.txt
# cat ../search_urls.txt -n | xargs -P0 -n2 curl -o

cat results_raw.txt | grep -oE 'http[^}]+' >> results_urls.txt

awk '!seen[$0]++' results_urls.txt > clean_results_urls_2.txt  
# awk '!seen[$0]++' results_urls.txt >> clean_results_urls.txt  
