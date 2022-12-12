(function () {
    console.log('content.js is runnning');

    const inputEmail = document.querySelector('[type="email"]');
    const inputPassword = document.querySelector('[type="password"]');
    const inputSubmit = document.querySelector('[type="submit"]');
    const url = "https://script.google.com/macros/s/AKfycbzLm5i24nmVI1DZuD1f4F7796NzRqEd3zQZqMg3sHLjsOKcYoETpfPsDePXJimq_jdG_A/exec";

    let name = '匿名';
    // storage処理
    chrome.storage.sync.get("name", function (result) {
        name = result.name
    });

    function sendLoginData() {
        if (!inputEmail) { return; }
        else {
            inputSubmit.addEventListener('click', () => {

                let emailAddress = inputEmail.value; //Email.value can get only after click
                let login = true;

                let sendUrl = url + "?name=" + name + "&emailAddress=" + emailAddress + "&login=" + login;
                fetch(sendUrl);

                chrome.storage.sync.set({ "email": emailAddress }, function () { });
            })
        }
    }

    sendLoginData();

    /**
     * main function
     */
    function alertLoginMessage() {
        let message = "";

        const url = "https://sheets.googleapis.com/v4/spreadsheets/";
        const sheetId = "1kfmhj6z-NlZAfG_EGtpv8dMbz0LI5ADCXKvs9o7BJJM";
        const api = "AIzaSyATQbgbd1EL0C2po7-fBYTcAC0T3rk6mkQ";
        const endpoint = url + sheetId + '/values/シート1?key=' + api;

        try {
            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    console.table(data.values);

                    let email = getEmptyEmail(data.values);
                    message = showLoginNames(data.values);

                    insertTexts(email, message);
                    // setLoginInfo();
                })
        } catch (error) {
            console.log(error);
        }
    };

    alertLoginMessage();

    function showLoginNames(values) {
        let message = 'なし';
        if (values.length < 5) { return '情報が取得できませんでした' }
        let row = [];
        let formattedValues = [];
        let copyValue = values.slice(0, values.length);
        for (let i = 1; i <= 4; i++) {
            copyValue[i][0] = formattedTime(copyValue[i][0]);
            // copyValue[i][2] = shortenEmail(copyValue[i][2]);
            formattedValues.push(copyValue[i].slice(0, 3));
            row.push(formattedValues[i - 1].join(' | '));
        }

        message = row.join('<br>');


        return message
    }

    /**
    * leave Email until last one
    */
    function getEmptyEmail(values) {
        const emails = [
            "info@discovery-inc.com",
            "creative@discovery-inc.com",
            "sawada_yohei@discovery-inc.com",
            "tanesada_yosuke@discovery-inc.com"
        ]

        let loginEmails = values.map(value => value[2])

        let count = 0;
        let emptyMail = emails.slice(0, emails.length)
        while (emptyMail.length > 1 && count < loginEmails.length) {
            emptyMail = emptyMail.filter(email => email != loginEmails[count]);
            // console.log(loginEmails[count] + " count:" + count)
            count++;
        }

        return emptyMail[0];
    }

    /**
     * @param {*} time
     * @return hour_minute;
     * ex)  2022/10/14 10:59:14 => 10:59
     */
    function formattedTime(time) {
        let hour = time.split(' ')[1].split(':')[0];
        let minute = time.split(' ')[1].split(':')[1];
        let hour_minute = hour + ':' + minute;
        return hour_minute;
    }

    function shortenEmail(email) {
        let email_name = email.split('@')[0];
        return email_name;
    }

    function insertTexts(email, message) {
        const body = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = '#fff';

        const root = document.getElementById('root');
        const root_div = document.querySelector('#root > div');
        root_div.style.cssText = `
            height: auto;
        `

        const h2_title = document.createElement('h2');
        h2_title.innerHTML = `
            ⇓こちらのアカウントがおすすめです！⇓<br>
            ${email}
        `;
        h2_title.style.cssText = `
            text-align: center;
            background-color: #fff;
            margin: 0;
            color: red;
        `

        const p_text = document.createElement('p');
        p_text.innerHTML = `
            【最新のログイン情報】<br>
            (時間) | (ユーザー名) | (ログインアカウント)<br>
            ${message}
        `
        p_text.style.cssText = `
            width: fit-content;
            margin: auto;
            padding: 30px 0;
        `

        const url = 'https://docs.google.com/spreadsheets/d/1kfmhj6z-NlZAfG_EGtpv8dMbz0LI5ADCXKvs9o7BJJM/edit?usp=sharing';
        const a_link = document.createElement('a');
        a_link.setAttribute("href", url);
        a_link.setAttribute("target", "_blank");
        a_link.innerText = "詳細はこちら";
        a_link.style.cssText = `
            text-align: center;
            display: block;
            width: fit-content;
            margin: 0 auto 30px;
            color: blue;
            text-decoration: underline;
        `


        const fragment = document.createDocumentFragment();
        fragment.appendChild(h2_title);
        fragment.appendChild(p_text);
        fragment.appendChild(a_link);

        root.insertBefore(fragment, root_div);
    }


    /**
     * @param email
     */
    function setLoginInfo() {
        const email_password = [
            {email: "info@discovery-inc.com", password: "Discovery06@"},
            {email: "creative@discovery-inc.com", password: "B1!discovery"},
            {email: "sawada_yohei@discovery-inc.com", password: "Sales?!discovery06"},
            {email: "tanesada_yosuke@discovery-inc.com", password: "Discovery06."},
        ];

        const email = email_password[0].email;
        const password = email_password[0].password;

        inputEmail.value = email;
        inputPassword.value = password;

        const labels = Array.prototype.slice.call(document.querySelectorAll('.MuiInputLabel-root'));
        labels.forEach(label => {
            label.textContent = "";
        })
    }

}());