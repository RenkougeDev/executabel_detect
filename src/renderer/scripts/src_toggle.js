function toggleDisplayDatetime() {
    // window.api.printToTerminal("hello world");
    let founds = document.querySelectorAll("tr > th");
    founds[0].classList.toggle("hidden");
    founds = document.querySelectorAll(".datetime");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden"); // used to toggle between add class or not
        });
    }
    founds = document.querySelectorAll("user-action > button");

}
function toggleDisplayExecutableName() {
    let founds = document.querySelectorAll("tr > th");
    founds[1].classList.toggle("hidden");
    founds = document.querySelectorAll(".executable_name_add");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
    }
    founds = document.querySelectorAll(".executable_name_remove");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
    }
}
function toggleDisplayPathOfExecutable() {
    let founds = document.querySelectorAll("tr > th");
    founds[2].classList.toggle("hidden");
    founds = document.querySelectorAll(".executable_path");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
    }
    // document.querySelector(".executable_path").style.display = "none";
}
function toggleDisplayProcessID() {
    let founds = document.querySelectorAll("tr > th");
    founds[3].classList.toggle("hidden");
    founds = document.querySelectorAll(".pid_add");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
    }
    founds = document.querySelectorAll(".pid_remove");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
    }
}
function toggleDragIndicator() {
    document.querySelector("#draggable").classList.toggle("draggable-background-color");
}
function openSetting() {
    document.querySelector("#app-settings").classList.toggle("hidden");
}