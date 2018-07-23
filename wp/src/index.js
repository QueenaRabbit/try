let modA = require('./mod/a.js');
let app = document.querySelector('#app');
import modB from './mod/b';
import sendBtn from './assets/images/send-btn.png';

console.log('sendBtn',sendBtn);

let aaa = modB.str+'ccc';

require('./assets/css/a'); //全局引入

import style from './assets/css/a.css';

console.log('style',style);

import $ from 'jquery';
// console.log($);
$(function(){console.log('jquery');})

// app3.innerHTML='asdfasdf';

app.innerHTML=modA.a+modA.b;


