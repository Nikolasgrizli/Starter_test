// JS
import './js/'

// SCSS
import './scss/main.scss'

// SVG
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./img/svg/', true, /\.svg$/));

// CSS
