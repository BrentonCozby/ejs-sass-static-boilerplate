module.exports = {
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    printWidth: 120,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    overrides: [
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
    ],
}
