var flag = true;
var res = "";
let msg = document.querySelector(".msg");
let reg = document.querySelector(".registration");
let aut = document.querySelector(".authorisation");
let message = document.querySelector(".message");
let sign_in_text = document.getElementById("sign_in_text");

var aut_arr = [...aut.children];
var reg_arr = [...reg.children];

var to_reg = document.getElementById("to_reg");
var input_pass_aut = document.getElementById("input_pass_aut");
var input_name_aut = document.getElementById("input_name_aut");
var input_submit_aut = document.getElementById("input_submit_aut");


var input_name = document.getElementById("input_name");
var input_pass = document.getElementById("input_pass");
var input_email = document.getElementById("input_email");
var input_age = document.getElementById("input_age");
var input_check_pass = document.getElementById("input_check_pass");
var input_gender_m = document.getElementById("input_gender_m");
//var input_gender_f = document.getElementById("input_gender_f");
var input_submit = document.getElementById("input_submit");
var back_to_aut = document.getElementById("back_to_aut");


function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var subarr = arr[i].split('=');
        if (subarr[0] == name) {
            return subarr[1];
        }
    }
    return 0;
}

if (getCookie('name') != undefined) {
    sign_in_text.innerHTML = getCookie('name');
    console.log(getCookie('name'));
}

document.getElementById("sign_in").addEventListener("click", () => {

    if (flag) {
        flag = false;
        msg.classList.add("msg_style");
        msg.classList.remove("unvisible");
        aut.classList.add("authorisation_style");
        aut.classList.remove("unvisible");
    } else {
        flag = true;
        msg.classList.remove("msg_style");
        msg.classList.add("unvisible");
        if (aut.classList.contains("authorisation_style")) {
            aut.classList.remove("authorisation_style");
            aut.classList.add("unvisible");
        }
        if (reg.classList.contains("registration_style")) {
            reg.classList.remove("registration_style");
            reg.classList.add("unvisible");
        }
    }
});

document.querySelector(".message_button").addEventListener("click", () => {
    message.classList.remove("message_style");
    message.classList.add("unvisible");
    msg.classList.remove("msg_style");
    msg.classList.add("unvisible");
    
});

async function autData(obj) {

    console.log("Func");
    const response = await fetch('/authorisation', {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: "x=" + obj
    });

    console.log(response);

    if (response.ok) {
        res = await response.text();
        console.log(res);
        if (res != "No") {
            document.querySelector(".message_text").innerHTML = "Hello, " + res;
            sign_in_text.innerHTML = res;
            document.cookie = 'name=' + res;

        } else {
            document.querySelector(".message_text").innerHTML = "Something went wrong!";
        }
        
        aut.classList.remove("authorisation_style");
        aut.classList.add("unvisible");
        message.classList.add("message_style");
        message.classList.remove("unvisible");
        
    } else {
        console.log("Error");
    }
}

aut.addEventListener("click", (e) => {
    aut_arr.forEach((item) => {
        if (item.tagName == "INPUT") {
            if (item.value == '') {
                item.classList.add("error");
            } else {
                item.classList.remove("error");
            }
        }
    });

    switch (e.target) {
        case to_reg:
            console.log("registration");
            aut.classList.remove("authorisation_style");
            aut.classList.add("unvisible");
            reg.classList.add("registration_style");
            reg.classList.remove("unvisible");
            break;
        case input_pass_aut:

            break;
        case input_name_aut:
            break;
        case input_submit_aut:
            if (input_pass_aut.classList.contains("error") == false &&
                input_name_aut.classList.contains("error") == false) {
                var obj = JSON.stringify({
                    'login': input_name_aut.value,
                    'pass': input_pass_aut.value,
                });

                console.log(obj);
                autData(obj);

            }
            break;
    }
});

aut.addEventListener("input", () => {
    aut_arr.forEach((item) => {
        if (item.tagName == "INPUT") {
            if (item.value == '') {
                item.classList.add("error");
            } else {
                item.classList.remove("error");
            }
        }
    });
});
async function regData(obj) {

    console.log("Func");
    const response = await fetch('/registration', {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: "x=" + obj
    });

    console.log(response);

    if (response.ok) {
        res = await response.text();
        console.log(res);

        document.querySelector(".message_text").innerHTML = "Hello, " + res;
        sign_in_text.innerHTML = res;
        document.cookie = 'name=' + res;
        reg.classList.remove("registration_style");
        reg.classList.add("unvisible");
        message.classList.add("message_style");
        message.classList.remove("unvisible");
    } else {
        console.log("Error");
    }
}

reg.addEventListener("input", () => {
    reg_arr.forEach((item) => {
        if (item.tagName == "INPUT") {
            if (item.value == '') {
                item.classList.add("error");
            } else {
                item.classList.remove("error");
            }
        }
    });

    if (input_pass.value != "") {
        if (input_check_pass.value != input_pass.value) {
            input_check_pass.classList.add("error");
            input_pass.classList.add("error");
        } else {
            input_check_pass.classList.remove("error");
            input_pass.classList.remove("error");
        }
    }
});

reg.addEventListener("click", (e) => {
    reg_arr.forEach((item) => {
        if (item.tagName == "INPUT") {
            if (item.value == '') {
                item.classList.add("error");
            } else {
                item.classList.remove("error");
            }
        }
    });

    if (input_pass.value != "") {
        if (input_check_pass.value != input_pass.value) {
            input_check_pass.classList.add("error");
            input_pass.classList.add("error");
        } else {
            input_check_pass.classList.remove("error");
            input_pass.classList.remove("error");
        }
    }

    switch (e.target) {
        case back_to_aut:
            console.log("registration");
            aut.classList.add("authorisation_style");
            aut.classList.remove("unvisible");
            reg.classList.remove("registration_style");
            reg.classList.add("unvisible");
            break;
        case input_submit:
            if (input_pass.classList.contains("error") == false &&
                input_check_pass.classList.contains("error") == false &&
                input_email.classList.contains("error") == false &&
                input_age.classList.contains("error") == false &&
                input_name.classList.contains("error") == false) {
                var obj = JSON.stringify({
                    'login': input_name.value,
                    'pass': input_pass.value,
                    'age': input_age.value,
                    'email': input_email.value,
                    'gender': input_gender_m.checked ? "Male" : "Female",
                });

                console.log(obj);
                regData(obj);


            }
            break;
    }
});







