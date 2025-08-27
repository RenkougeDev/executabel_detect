
if(window.api){
    let toggleInformationFound = {};
    let init = true;
    window.api.toggleInformationReceived((data)=>{
        data = data.replace(/'/g, '"');
        toggleInformationFound = JSON.parse(data);
        // let founds = document.querySelectorAll("tr > th");  
        // if(!toggleInformationFound["view_datetime"]){
        //     founds[0].classList.add("hidden");
        // }else{
        //     founds[0].classList.remove("hidden");
        // }
        // if(!toggleInformationFound["view_executable_name"]){
        //     founds[1].classList.add("hidden");
        // }else{
        //     founds[1].classList.remove("hidden");
        // }
        // if(!toggleInformationFound["view_executable_path"]){
        //     founds[2].classList.add("hidden");
        // }else{
        //     founds[2].classList.remove("hidden");
        // }
        // if(!toggleInformationFound["view_pid"]){
        //     founds[3].classList.add("hidden");
        // }else{
        //     founds[3].classList.remove("hidden");
        // }
        all_element_will_be_toggled_theme = document.querySelectorAll("*");
        if(toggleInformationFound["toggle_dark"]){
            all_element_will_be_toggled_theme.forEach(element => {
                element.classList.add("light_mode");
            });
        }else{
            all_element_will_be_toggled_theme.forEach(element => {
                element.classList.remove("light_mode");
            });
        }
        if(!toggleInformationFound["visibility_draggable_tool"]){
            document.querySelector("#draggable").classList.add("draggable-style-2");
        }else{
            document.querySelector("#draggable").classList.remove("draggable-style-2");
        }
        if(!toggleInformationFound["larger_draggable_tool"]){
            document.querySelector("#draggable").classList.add("larger-draggable-tool");
        }else{
            document.querySelector("#draggable").classList.remove("larger-draggable-tool");
        }
    });
    window.api.historyDatabaseOutput((data)=>{ 
        let separated = data.split(" | ");
        let history = document.createElement("tr");
        history.className = "history";

            let datetime = document.createElement("td");
            datetime.innerText = separated[0];
            datetime.className = "datetime";

            let executable_name = document.createElement("td");
            executable_name.innerText = "\"" + separated[1] + "\"";
            executable_name.className = "executable_name";
            // if(separated[0].includes("+")){
                // executable_name.className = "executable_name_add";
            //     history.className = "history"
            // }else{
            //     history.className = "history_remove";
            //     executable_name.className = "executable_name_remove";
            // }

            let executable_path = document.createElement("td");
            executable_path.innerText = "\"" + separated[2] + "\"";
            executable_path.className = "executable_path";
        if(toggleInformationFound["toggle_dark"]){
            datetime.classList.add("light_mode");
            executable_name.classList.add("light_mode");
            executable_path.classList.add("light_mode");
        }
        history.appendChild(datetime);
        history.appendChild(executable_name);
        history.appendChild(executable_path);
        let tableBody = document.getElementById("main-output-database").getElementsByTagName("tbody")[0];
        tableBody.insertBefore(history, tableBody.firstChild);
    });
}