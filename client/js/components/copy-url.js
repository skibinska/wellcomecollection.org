export default (el) => {
  el.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('style', 'position: fixed; left: -9999px;');
    document.body.appendChild(textarea);
    textarea.innerHTML = window.location.href;
    textarea.select();
    el.innerHTML = 'Copied to clipboard';
    document.execCommand('copy');
  });
};
