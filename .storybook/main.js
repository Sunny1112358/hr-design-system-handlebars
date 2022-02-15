const path = require('path')
const FlatContextPlugin = require('../build/webpack/feature-loader/plugin/FlatContextPlugin')

module.exports = {
    staticDirs: ['../src/assets'],
    stories: [
        '../src/stories/Introduction.stories.mdx',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-postcss',
        '@whitespace/storybook-addon-html',
        '@storybook/addon-a11y',
        'storybook-conditional-toolbar-selector',
    ],

    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.resolve.alias = {
            ...config.resolve.alias,
            components: path.resolve(__dirname, '../src/stories/views/components'),
            hrQueryNew$: path.resolve(
                __dirname,
                '../src/stories/views/components/generic/hrQueryNew.js'
            ),
            initializer$: path.resolve(
                __dirname,
                '../build/webpack/feature-loader/initializer/initializer.js'
            ),
            loadFeature$: path.resolve(
                __dirname,
                '../build/webpack/feature-loader/initializer/loader.js'
            ),
        }
        config.module.rules.push(
            {
                test: /\.handlebars|hbs$/,
                loader: 'handlebars-loader',
                include: path.resolve(__dirname, '../'),
                query: {
                    helperDirs: [path.resolve(__dirname, '../build/helpers')],
                    partialDirs: [path.resolve(__dirname, '../src/stories/views')],
                },
            },
            {
                test: /\,css&/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('tailwindcss'), require('autoprefixer')],
                        },
                    },
                ],
                include: path.resolve(__dirname, '../'),
            }
        )

        config.plugins.push(
            new FlatContextPlugin(
                '/feature',
                path.resolve(__dirname, '../src/stories/views/'),
                /\.feature\.js$/
            )
        )

        config.stats = 'verbose'

        // Return the altered config
        return config
    },
}
