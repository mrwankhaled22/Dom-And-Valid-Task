/* show and hide pages start*/

var SignUpAnchor = document.getElementById("signUpAnchor");
var SignUpPage = document.getElementById("sign-up");
var LoginPage = document.getElementById("Login-page");
var loginAnchor = document.getElementById("loginAnchor")

function GoToSignUp() {
    LoginPage.classList.add("d-none");
    SignUpPage.classList.remove("d-none");
}

SignUpAnchor.addEventListener("click", GoToSignUp);

function GoToLogin() {
    LoginPage.classList.remove("d-none");
    SignUpPage.classList.add("d-none");
}
loginAnchor.addEventListener("click", GoToLogin);


/* show and hide pages end*/




/* add account in localstorage  start*/

var Name = document.getElementById("Name");
var EmailSignUp = document.getElementById("emailSignup");
var PasswordSignup = document.getElementById("passwordSignup");
var AccountList = [];
var SignUpBtn = document.getElementById("SignUpBtn");
var NameRegex = /^[a-z]{3,}/i;
var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


if (localStorage.getItem("Accounts") != null) {
    AccountList = JSON.parse(localStorage.getItem("Accounts"));

}





Name.addEventListener("input", function () { validateInput(Name, NameRegex) });
EmailSignUp.addEventListener("input", function () { validateInput(EmailSignUp, EmailRegex) });
PasswordSignup.addEventListener("input", function () { validateInput(PasswordSignup, passwordRegex) });



function addAccount() {
    const nameValid = NameRegex.test(Name.value);
    const emailValid = EmailRegex.test(EmailSignUp.value);
    const passwordValid = passwordRegex.test(PasswordSignup.value);
    
    document.getElementById("fillinputs").classList.add("d-none");
    let emailExists = false;
    for (let i = 0; i < AccountList.length; i++) {
        if (AccountList[i].email === EmailSignUp.value) {
            emailExists = true;
            
            document.getElementById("Success").classList.add("d-none");
            document.getElementById("exist").classList.remove("d-none");
            break;
        }
    }


    if (!EmailSignUp.value || !PasswordSignup.value || !Name.value ){
        document.getElementById("fillinputs").classList.remove("d-none");
        return;
    }


    if (nameValid && emailValid && passwordValid && emailExists == false) {


        var Account = {
            name: Name.value,
            email: EmailSignUp.value,
            password: PasswordSignup.value,
        };





        
        AccountList.push(Account);
        localStorage.setItem("Accounts", JSON.stringify(AccountList));
        document.getElementById("exist").classList.add("d-none");

        document.getElementById("Success").classList.remove("d-none");
        clearinput();


    }
}

SignUpBtn.addEventListener("click", addAccount);


function validateInput(inputField, regex) {
    const warnElement = document.getElementById(`${inputField.id}-warn`);
    if (!regex.test(inputField.value)) {
        document.getElementById("Success").classList.add("d-none")
        warnElement.classList.remove("d-none");
    } else {
        warnElement.classList.add("d-none");
    }
}


function clearinput() {
    Name.value = null;
    EmailSignUp.value = null;
    PasswordSignup.value = null;
}

/* add account in localstorage  end*/
var emailLogin = document.getElementById("emailLogin");
var passlogin = document.getElementById("passwordLogin");
var LoginBtn = document.getElementById("Loginbtn");


function checklogin() {
    let emailValid = false;
    let passwordValid = false;

    for (var i = 0; i < AccountList.length; i++) {
        if (emailLogin.value === AccountList[i].email) {
            emailValid = true;
            document.getElementById("invalid-email").classList.add("d-none")
            if (passlogin.value === AccountList[i].password) {
                passwordValid = true;
                document.getElementById("invalid-pass").classList.add("d-none")
                document.getElementById("userName").innerHTML= "Welcome"+ "  " + AccountList[i].name;
                document.getElementById("Login-page").classList.add ("d-none");
                document.getElementById("home").classList.remove("d-none");
                document.getElementById("navbar").classList.remove("d-none");
                
                return;
            }
        }
    }


    if (emailValid && !passwordValid) {
        document.getElementById("invalid-pass").classList.remove("d-none")
    } else if (!emailValid) {
        document.getElementById("invalid-email").classList.remove("d-none")

    }
}

LoginBtn.addEventListener("click", checklogin);

var logout = document.getElementById("logout");

function ToMainPage(){
    document.getElementById("Login-page").classList.remove ("d-none");
    document.getElementById("home").classList.add("d-none");
    document.getElementById("navbar").classList.add("d-none");
    clearinputTwo();
}

logout.addEventListener("click" , ToMainPage);

function clearinputTwo() {
    emailLogin.value =null;
    passlogin.value = null;
}