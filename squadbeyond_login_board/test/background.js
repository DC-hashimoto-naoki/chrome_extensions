(function () {
    console.log('background.js is runnning');

    const getName = async () => {
        let name = null;
        let email = null;
        await new Promise((resolve, reject) => {
            chrome.storage.sync.get(["name", "email"], function (result) {
                name = result.name;
                email = result.email;
                resolve();
            });
        })
        console.log(name + ' ' + email);
        return {name: name, email: email};
    }

    function sendLogoutData(name, email) {
        const sheetUrl = "https://script.google.com/macros/s/AKfycbxsY_AURotkCYowsKsgHM-bzhtcaCNqStPB-ARcMrZnDufnoCeIx8SdaDheNhrLHsCCvQ/exec";

        // タブを閉じたときにデータ送信
        var tabToUrl = {};
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            // Note: this event is fired twice:
            // Once with `changeInfo.status` = "loading" and another time with "complete"
            console.log('tabs.onUpdated');
            tabToUrl[tabId] = tab.url;
        });

        chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {

            let pattern = new RegExp('^https://app.squadbeyond.com', 'g');
            let url = tabToUrl[tabId];
            if (url.match(pattern)) {
                console.log('remove tab in squadbeyond');
                const login = false;
                let emailAdress = email;
                let sendUrl = sheetUrl + "?name=" + name + "&emailAdress=" + emailAdress + "&login=" + login;
                try {
                    fetch(sendUrl);
                } catch (error) {
                    console.log(error);
                }
            }

            // Remove information for non-existent tab
            delete tabToUrl[tabId];
        });
    }

    getName()
        .then((result) => {
            let name = result.name;
            let email = result.email;
            console.log(name);
            sendLogoutData(name, email);
        })

})();
