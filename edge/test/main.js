const title = document.getElementsByTagName('title')[0];
const description = document.querySelector('meta[name="description"]');
const locationUrl = location.href;

const url = 'https://script.google.com/macros/s/AKfycbzj1zOIXkE3_LygQBHjNWUPVsKGcWlRHJY-o1QAzVhYuCRDVagfSlvi2ha1SZBuG1Na4g/exec';
const paramerters = `?p1=${title.textContent}&p2=${description.content}&p3=${locationUrl}`;

fetch(url + paramerters);
