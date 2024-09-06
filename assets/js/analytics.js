const currentUrl = window.location.href;

fetch('https://analytics.chocorp.net?url=' + encodeURIComponent(currentUrl));