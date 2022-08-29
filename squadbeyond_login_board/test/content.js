(function () {
    console.log('content.js is runnning');

    const inputEmail = document.querySelector('[type="email"]')
    const inputSubmit = document.querySelector('[type="submit"]');
    const url = "https://script.google.com/macros/s/AKfycbz3b95D0DV3Lids06x0vSWcJYf3X3C1hVK1qVwZSeYDg7rgbBNh_tsLtNbPhX4CLglCfg/exec";

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

    function alertLoginMessage() {
        let message = "";
        alert('現在のログイン');
        console.log('alertFuc');

        const url = "https://sheets.googleapis.com/v4/spreadsheets/";
        const sheetId = "1kfmhj6z-NlZAfG_EGtpv8dMbz0LI5ADCXKvs9o7BJJM";
        const api = "AIzaSyATQbgbd1EL0C2po7-fBYTcAC0T3rk6mkQ";
        const endpoint = url + sheetId + '/values/シート1?key=' + api;

        try {
            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    console.table(data.values);
                })

        } catch (error) {
            console.log(error);
        }
    };

    alertLoginMessage();

}());