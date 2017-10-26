function injectScript(filePath) {
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.async = true;
    newScript.src = filePath;
    
    var scriptTag = document.getElementsByTagName('script')[0];
    scriptTag.parentNode.insertBefore(newScript, scriptTag);
}

injectScript('https://www.gstatic.com/firebasejs/4.6.0/firebase.js');
injectScript(chrome.runtime.getURL('src/injectScript.js'));

