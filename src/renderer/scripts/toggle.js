function toggleDisplayDatetime() {
    // window.api.displayThisToTerminal("hello world");
    let founds = document.querySelectorAll("tr > th");
    founds[0].classList.toggle("hidden");
    founds = document.querySelectorAll(".datetime");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden"); // used to toggle between add class or not
        });
        window.api.toggleSetting("view_datetime");
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
        window.api.toggleSetting("view_executable_name");
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
        window.api.toggleSetting("view_executable_path");
    }
    // document.querySelector(".executable_path").style.display = "none";
}
function toggleDisplayProcessID() {
    let founds = document.querySelectorAll("tr > th");
    founds[3].classList.toggle("hidden");
    // founds = document.querySelectorAll(".pid_add");
    // if(window.api){
    //     founds.forEach(element => {
    //         element.classList.toggle("hidden");
    //     });
    // }
    founds = document.querySelectorAll(".pid");
    if(window.api){
        founds.forEach(element => {
            element.classList.toggle("hidden");
        });
        window.api.toggleSetting("view_pid");
    }
}
function toggleDragIndicator() {
    document.querySelector("#draggable").classList.toggle("draggable-style");
    window.api.toggleSetting("visibility_draggable_tool");
}
function toggleBetweenLargerOfDraggableTool(){
    document.querySelector("#draggable").classList.toggle("larger-draggable-tool");
    window.api.toggleSetting("larger_draggable_tool");
}
function toggleTheme(){
    let founds = document.querySelectorAll("*");
    founds.forEach(element => {
        element.classList.toggle("light_mode");
    });
    window.api.toggleSetting("toggle_dark");
}
function openSetting() {
    document.querySelector("#app-settings").classList.toggle("hidden");
}
function startOpenHistoryWindow(){
    if(window.api){
        window.api.openHistoryWindow();
    }
}