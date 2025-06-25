module.exports = {
    plugins: {
        'postcss-nesting': {},  // Primero va el nesting
        'tailwindcss': {},      // Luego Tailwind CSS
        'autoprefixer': {},     // Finalmente Autoprefixer
    },
};