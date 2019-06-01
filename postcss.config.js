const production = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('cssnano')({
      preset: 'default',
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['index.html', "dist/*.html", 'src/**/*.vue'],
      css: ['dist/*.css'],
      whitelist: ["my-very-special-class"]
    }),
    require('autoprefixer')({}),
  ]
}

const dev = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('cssnano')({
      preset: 'default',
    }),
    require('autoprefixer')({}),
  ]
};

const config = {
  production,
  dev
};

console.log('process.env.NODE_ENV-->', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log('----production----');
  module.exports = config['production'];
} else {
  console.log('----dev----');
  module.exports = config['dev'];
}