import './components/hello';
// import './components/formComponent';
// import textFit from 'textfit';



// Main js file
let isTouch = false;
if ('ontouchstart' in document.documentElement) {
    isTouch = true;
}
document.body.className += isTouch ? ' touch' : ' no-touch';

const mainWrap = document.querySelector('main');



function toggle(selector,cls){
    let target = document.querySelectorAll(selector);
    if(target){
        target.forEach(text => {
            text.addEventListener('click', function(){
                this.classList.toggle(cls);
            })
        })
    }
}
//
// toggle('.header__trigger','is-open');


//example footer height detect
// function _getAbsoluteHeight(el) {
//     el = (typeof el === 'string') ? document.querySelector(el) : el;
//     var styles = window.getComputedStyle(el);
//     var margin = parseFloat(styles['marginTop']) +
//                  parseFloat(styles['marginBottom']);
//     return Math.ceil(el.offsetHeight + margin);
// }

// //footer height variable
// function setVariableFooterHeight(){
//     setTimeout(() => {
//         const footerH = _getAbsoluteHeight('.footer');

//         if(footerH !== 0){
//             document.documentElement.style.setProperty('--footerHeight', footerH + 'px');
//         }

//     }, 200);
// }

// setVariableFooterHeight();

// window.addEventListener("orientationchange", function() {
//     setVariableFooterHeight();
// });