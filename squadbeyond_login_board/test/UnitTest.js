const emails = [
    "info@discovery-inc.com",
    "creative@discovery-inc.com",
    "sawada_yohei@discovery-inc.com",
    "tanesada_yosuke@discovery-inc.com"
]

let test = [
    "tanesada_yosuke@discovery-inc.com",
    "creative@discovery-inc.com",
    "tanesada_yosuke@discovery-inc.com",
    "creative@discovery-inc.com",
    "info@discovery-inc.com"
];

let count = 0;
let copyEmails = emails.slice(0, emails.length)
while(copyEmails.length > 1 && count < test.length){
    copyEmails = copyEmails.filter( email => email !== test[count]);
    count++;
}

// console.log(copyEmails)

let testMail = "creative@discovery-inc.com";

const accounts = [
    {email: "info@discovery-inc.com" , password: "Discovery06@"},
    {email: "creative@discovery-inc.com" , password: "B1!discovery"},
    {email: "sawada_yohei@discovery-inc.com" , password: "Sales?!discovery06"},
    {email: "tanesada_yosuke@discovery-inc.com" , password: "Discovery06."}
]

let result = accounts.find( (account) => account.email == testMail);

console.log(result.password);