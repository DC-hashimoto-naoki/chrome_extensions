const title = document.getElementsByTagName('title')[0];
const description = document.querySelector('meta[name="description"]');
const locationUrl = location.href;

const url = 'https://script.google.com/macros/s/AKfycbzGze9bGD0_0-nXMCaLBHmissDhJdaS_LLf_SFmIWdTBW3M9ICbP-Qc38VBRjv9VSDV6g/exec';
const paramerters = `?p1=${title.textContent}&p2=${description.content}&p3=${locationUrl}`;

fetch(url + paramerters);
