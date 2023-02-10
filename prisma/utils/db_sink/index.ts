#! /usr/bin/env node

// Name "sink" for cli usage
// Install with: npm install -g .
// "bin": {
//   "sink": "./index.js"
// },

import { PrismaClient } from '@prisma/client';
import yargs from 'yargs';
const prisma = new PrismaClient();

// For ASCII Art: https://www.asciiart.eu/
// For its correct js string formatting: https://www.freeformatter.com/javascript-escape.html
console.log(
  '\n\n    _,_\r\n  /7/Y/^\\\r\n  vuVV|C)|          DB-sink       __ _\r\n    \\|^ /                       .\'  Y \'>,\r\n    )| \\)                      / _   _   \\\r\n   //)|\\\\                      )(_) (_)(|}\r\n  / ^| \\ \\                     {  4A   } /\r\n //^| || \\\\                     \\uLuJJ/\\l\r\n>//||| |\\\\\\|                    |3    p)/\r\n| """""  7/>l__ _____ ____      /nnm_n//\r\nL>_   _-< 7/|_-__,__-)\\,__)(".  \\_>-<_/D\r\n)D" Y "c)  9)       //V     \\_"-._.__G G_c__.-__<"/ ( \\\r\n | | |  |(|               < "-._"> _.G_.___)\\   \\7\\\r\n  \\"=" // |              (,"-.__.|\\ \\<.__.-" )   \\ \\\r\n   \'---\'  |              |,"-.__"| \\!"-.__.-".\\   \\ \\\r\n     |_;._/              (_"-.__"\'\\ \\"-.__.-".|    \\_\\\r\n     )(" V                \\"-.__"\'|\\ \\-.__.-".)     \\ \\\r\n        (                  "-.__\'"\\_\\ \\.__.-"./      \\ l\r\n         )                  ".__"">>G\\ \\__.-">        V )\r\n                                ""  G<\\ \\_.-"        ./7\r\n                                     G<\\ \\          ///',
);

const argv = yargs(process.argv.slice(2)).options({
  a: { type: 'boolean', default: false },
  b: { type: 'string', demandOption: true },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

// prisma.records.count().then((result) => console.log(result));
