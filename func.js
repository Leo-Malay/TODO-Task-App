/*
 *   This is the function file for the task app.
 *   Version: 1.0
 *   Author: Malay Bhavsar
 */
// Importing the modules.
const fs = require("fs");

var task_list = [];

function get_file_name() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    return dd + mm + yyyy + ".txt";
}

function get_time() {
    var d = new Date();
    var H = d.getHours();
    var M = d.getMinutes();
    return H + ":" + M;
}

function add_task() {
    // This function is for creatting new task
    var id = task_list.length;
    var task = document.getElementById("task_text").value;
    var time = document.getElementById("task_time").value;
    var priority = document.getElementById("task_range").value;
    console.log(task);
    if (task.length != 0) {
        // Setting time
        if (time == "") {
            time = 0 + "0:0" + 0;
        }
        // Setting priority.
        if (priority <= 33) {
            priority = "low";
        } else if (priority >= 67) {
            priority = "high";
        } else {
            priority = "medium";
        }
        var is_present = false;
        task_list.forEach((element) => {
            if (element[1] == task) {
                is_present = true;
            }
        });
        if (is_present == false) {
            save_task(id, task, time, priority, false);
        }
    }
}

function display_task() {
    // This function is used to display the task to the screen.
    var task_con = document.getElementById("task_con");
    task_con.innerHTML = "";
    task_list = read_task();
    task_list.forEach((ele) => {
        if (ele[4] == "true") {
            task_con.innerHTML +=
                '<tr><div class="box" id="' +
                ele[0] +
                '"><td><input type="checkbox" name="checkbox" id="task_done" onclick="update_task(' +
                ele[0] +
                ')" checked/></td><td style="width:12vw"><span id="' +
                ele[3] +
                '">' +
                ele[2] +
                '</span></td><td><p class="task_text" id="' +
                ele[0] +
                '">' +
                ele[1] +
                '</p></td><td><input type="button" name="cancel" value="X" id="cancel_btn"  onclick="rm_task(' +
                ele[0] +
                ')"/></td></div></tr>';
        } else {
            task_con.innerHTML +=
                '<tr><div class="box" id="' +
                ele[0] +
                '"><td><input type="checkbox" name="checkbox" id="task_done" onclick="update_task(' +
                ele[0] +
                ')"/></td><td style="width:14vw"><span id="' +
                ele[3] +
                '">' +
                ele[2] +
                '</span></td><td><p class="task_text" id="' +
                ele[0] +
                '">' +
                ele[1] +
                '</p></td><td><input type="button" name="cancel" value="X" id="cancel_btn"  onclick="rm_task(' +
                ele[0] +
                ')"/></td></div></tr>';
        }
    });
}

function save_task(id, task_text, task_time, task_priority, task_done) {
    // This function is for saving the task to a file.
    task =
        id +
        "#NXT$" +
        task_text +
        "#NXT$" +
        task_time +
        "#NXT$" +
        task_priority +
        "#NXT$" +
        task_done +
        "#END$";
    fs.appendFile(get_file_name(), task, (err) => {
        if (err) throw err;
        display_task();
    });
}

function read_task() {
    // Read saved task.
    try {
        var data = fs.readFileSync(get_file_name(), "utf8");
        data = data.split("#END$");
        task_list = [];
        data.pop();
        data.forEach((element) => {
            task_list.push(element.split("#NXT$"));
        });
        task_list.sort(function (a, b) {
            return a[2].localeCompare(b[2]);
        });
        return task_list;
    } catch {
        task_list = [];
        return [];
    }
}

function update_task(num) {
    // This function is for checking the box and updating the file
    var i;
    for (i = 0; i < task_list.length; i++) {
        if (task_list[i][0] == num) {
            if (task_list[i][4] == "false") {
                task_list[i][4] = "true";
            } else {
                task_list[i][4] = "false";
            }
            break;
        }
    }
    fs.unlinkSync(get_file_name());
    task_list.forEach((elem) => {
        save_task(elem[0], elem[1], elem[2], elem[3], elem[4]);
    });
}

function rm_task(num) {
    var i;
    for (i = 0; i < task_list.length; i++) {
        if (task_list[i][0] == num) {
            task_list.splice(i, 1);
            break;
        }
    }
    fs.unlinkSync(get_file_name());
    task_list.forEach((elem) => {
        save_task(elem[0], elem[1], elem[2], elem[3], elem[4]);
    });
    display_task();
}

function notify_me(time, task) {
    const myNotification = new Notification("TODO-TASK", {
        body: "Hey it's " + time + " you have to do " + task,
    });
}
