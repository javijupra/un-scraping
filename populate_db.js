const fs = require('fs')
const { Client } = require('pg')

const client = new Client({user: "javierprado", database: "un_votes"})
client.connect()

let empty_files = 0

for (let file_number = 1; file_number <= 9652; file_number++)
{
    const data = fs.readFileSync(`extracted_votes_copy/${file_number}.txt`, 'utf-8')
    results = data.split('\n')
    document_id = results.at(-2)
    results.splice(results.length - 3, 3)

    // Skip empty files:
    if (results[0] === "") {
        empty_files++
        continue
    }

    for (let line_index = 0; line_index < results.length; line_index++) {
        if (results[line_index].length > 1 && (line_index === 0 || results[line_index-1].length > 1))
            results.splice(line_index, 0, 'X')
        if (line_index % 2 == 1)
            client.query("INSERT INTO un_votes (vote, country, record) VALUES ($1, $2, $3)", [results[line_index-1], results[line_index], document_id])
    }

    if (file_number == 9652) {
        console.log("All files processed")
        console.log("Number of empty files: " + empty_files)
    }
}