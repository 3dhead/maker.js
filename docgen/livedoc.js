var LiveDoc;
(function (LiveDoc) {
    function getAllCodes() {
        return document.body.querySelectorAll('code');
    }
    function evalLastCode() {
        var allCodes = getAllCodes();
        var code = allCodes.item(allCodes.length - 1);
        document.write('<div id="' + codeOutputId(allCodes.length - 1) + '">');
        document.write('<p>Example output:</p>');
        eval(code.innerText);
        document.write('</div>');
    }
    LiveDoc.evalLastCode = evalLastCode;
    function codeOutputId(i) {
        return 'code-output-' + i;
    }
    function tryIt(codeIndex) {
        var allCodes = getAllCodes();
        var code = allCodes.item(codeIndex);
        var codeText = code.innerText;
        var pre = code.parentElement;
        var button = pre.previousSibling;
        if (button.classList.contains('wait'))
            return;
        button.classList.add('wait');
        var iframe = document.createElement('iframe');
        iframe.className = 'play';
        iframe.src = '//microsoft.github.io/maker.js/playground/embed.html?parentload=getcode';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.style.display = 'none';
        pre.parentElement.appendChild(iframe);
        window['getcode'] = function () {
            pre.style.display = 'none';
            button.style.display = 'none';
            var svg = document.getElementById(codeOutputId(codeIndex));
            if (svg) {
                svg.style.display = 'none';
            }
            iframe.style.display = '';
            return code.innerText;
        };
    }
    LiveDoc.tryIt = tryIt;
    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false); //remove listener, no longer needed
        var allCodes = getAllCodes();
        for (var i = 0; i < allCodes.length; i++) {
            //add a button
            var code = allCodes.item(i);
            var codeText = code.innerText;
            var keywordPos = codeText.toLowerCase().indexOf('render');
            if (!(keywordPos === 2 || keywordPos === 3))
                continue;
            var pre = code.parentElement;
            var button = '<button class="livedoc-play" onclick="LiveDoc.tryIt(' + i + ')" style="display:none" >&nbsp;&#x25BA; Play&nbsp;</button>';
            pre.insertAdjacentHTML('beforebegin', button);
        }
    }, false);
})(LiveDoc || (LiveDoc = {}));
