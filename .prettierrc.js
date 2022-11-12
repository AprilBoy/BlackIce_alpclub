module.exports = {
    singleQuote: true,
    overrides: [
        {
            files: ['*.tsx', '*.jsx', '*.ts'],
            options: {
                printWidth: 120,
                tabWidth: 4,
                semi: true,
            },
        },
        {
            files: ['*.scss'],
            options: {
                printWidth: 140,
                tabWidth: 4,
                semi: true,
            },
        },
        {
            files: ['*.json', '*.yml'],
            options: {
                printWidth: 80,
                tabWidth: 2,
            },
        },
    ],
};
