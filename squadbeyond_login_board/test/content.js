(function() {
    console.log('content.js is runnning');

    const inputEmail = document.querySelector('[type="email"]')
    const inputSubmit = document.querySelector('[type="submit"]');
    const url = "https://script.google.com/macros/s/AKfycbxsY_AURotkCYowsKsgHM-bzhtcaCNqStPB-ARcMrZnDufnoCeIx8SdaDheNhrLHsCCvQ/exec";

    let name = '匿名';
    // storage処理
    chrome.storage.sync.get("name", function (result) {
        name = result.name
    });

    function sendLoginData() {
        if (!inputEmail) { return; }
        else {
            inputSubmit.addEventListener('click', () => {

                let emailAdress = inputEmail.value; //Email.value can get only after clcik
                let login = true;

                console.log(name);

                let sendUrl = url + "?name=" + name + "&emailAdress=" + emailAdress + "&login=" + login;

                fetch(sendUrl);

                chrome.storage.sync.set({ "email": emailAdress }, function () { });
            })
        }
    }

    sendLoginData();

}());