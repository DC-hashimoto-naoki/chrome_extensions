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


window.addEventListener('DOMContentLoaded', () => {
    // storage処理
    const submit_btn = document.getElementById('submit_btn');
    const account_name = document.getElementById('account_name');
    const finish = document.getElementById('finish');
    const nowName = document.getElementById('nowName');

    submit_btn.addEventListener('click', () => {
        let inputName = account_name.value;
        chrome.storage.sync.set({ "name": inputName }, function () { });
        finish.textContent = '完了！'
    })

    const getName = async () => {
        let accountName = '未登録';
        await new Promise((resolve, reject) => {
            chrome.storage.sync.get("name", function (result) {
                if(result.name){
                    accountName = result.name;
                }
                resolve();
            });
        })
        console.log(accountName);
        return accountName;
    }

    getName().then(result =>{
        nowName.textContent = "現在の登録名：" +  result;
    })


})