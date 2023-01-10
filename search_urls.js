const fs = require('fs');

for (let year = 1946; year <= 2022; year++)
{
    for (let index = 1; index <= 101; index+=100) {

        url_string = `https://digitallibrary.un.org/search?ln=en&cc=Voting+Data&p=&f=&jrec=${index}&rm=&ln=en&sf=&so=d&rg=100&c=Voting+Data&c=&of=btex&fti=0&fct__9=Vote&fct__3=${year}&fti=0`

        fs.appendFileSync('./search_urls.txt', url_string + '\n')
        
    }
}