const title = document.getElementsByTagName('title')[0];
const description = document.querySelector('meta[name="description"]');
const locationUrl = location.href;
console.log(title.textContent);

if(description.content){
    console.log(description.content);
}

const url = 'https://script.google.com/macros/s/AKfycbzJ6SxTbr2GB2nxQrLGkVk4LfwsXeY3J05hDUI5o4NaF8BWFkd_GPy6tRx-Y6TAjaE/exec';
const paramerters = `?p1=${title.textContent}&p2=${description.content}&p3=${locationUrl}`;

fetch(url + paramerters);
