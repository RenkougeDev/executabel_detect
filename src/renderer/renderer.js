function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
if(window.api){
    let counterToggled = 0;
    let toggleInformationFound = {};
    let init = true;
    window.api.toggleInformationReceived((data)=>{
        // window.api.printToTerminal("test");
        data = data.replace(/'/g, '"');
        toggleInformationFound = JSON.parse(data);
        // window.api.printToTerminal(toggleInformationFound);
        if(init){
            if(toggleInformationFound["toggle_dark"]){
                all_element_will_be_toggled_theme = document.querySelectorAll("*");
                all_element_will_be_toggled_theme.forEach(element => {
                    element.classList.toggle("light_mode");
                });
            }
            init = false;
        }
        let founds = document.querySelectorAll("tr > th");  
        if(!toggleInformationFound["view_datetime"]){
            founds[0].classList.add("hidden");
        }else{
            founds[0].classList.remove("hidden");
        }
        if(!toggleInformationFound["view_executable_name"]){
            founds[1].classList.add("hidden");
        }else{
            founds[1].classList.remove("hidden");
        }
        if(!toggleInformationFound["view_executable_path"]){
            founds[2].classList.add("hidden");
        }else{
            founds[2].classList.remove("hidden");
        }
        if(!toggleInformationFound["view_pid"]){
            founds[3].classList.add("hidden");
        }else{
            founds[3].classList.remove("hidden");
        }
        if(!toggleInformationFound["visibility_draggable_tool"]){
            document.querySelector("#draggable").classList.add("draggable-style");
        }else{
            document.querySelector("#draggable").classList.remove("draggable-style");
        }
        if(!toggleInformationFound["larger_draggable_tool"]){
            document.querySelector("#draggable").classList.add("larger-draggable-tool");
        }else{
            document.querySelector("#draggable").classList.remove("larger-draggable-tool");
        }
    });
    window.api.onCppOutput(async (data)=>{
        let headers = document.querySelectorAll("tr > th");
        // window.api.printToTerminal(toggleInformationFound);
        // window.api.printToTerminal(toggleInformationFound);
        // window.api.printToTerminal("test");
        // window.api.displayThisToTerminal("test")
        let separated = data.split(" | ");
        let history = document.createElement("tr");

            let datetime = document.createElement("td");
            datetime.innerText = separated[1];
            datetime.className = "datetime";
            if(!toggleInformationFound["view_datetime"]){
                datetime.classList.add("hidden");
                // window.api.printToTerminal("hide datetime");
            }else{
                try{headers.classList.remove("hidden");}catch{}
                try{datetime.classList.remove("hidden");}catch{}
            }

            let executable_name = document.createElement("td");
            executable_name.innerText = "\"" + separated[3] + "\"";
            if(separated[0].includes("+")){
                executable_name.className = "executable_name_add";
                history.className = "history"
            }else{
                history.className = "history_remove";
                executable_name.className = "executable_name_remove";
            }
            if(!toggleInformationFound["view_executable_name"]){
                try{executable_name.classList.add("hidden");}catch{}
                // try{window.api.printToTerminal("hide executable name");}catch{}
            }else{
                try{headers.classList.remove("hidden");}catch{}
                try{executable_name.classList.remove("hidden");}catch{}
            }

            let executable_path = document.createElement("td");
            executable_path.innerText = "\"" + separated[4] + "\"";
            executable_path.className = "executable_path";
            if(!toggleInformationFound["view_executable_path"]){
                try{executable_path.classList.add("hidden");}catch{}
                // try{window.api.printToTerminal("hide executable path");}catch{}
            }else{
                try{headers.classList.remove("hidden");}catch{}
                try{executable_path.classList.remove("hidden");}catch{}
            }

            let pid = document.createElement("td");
            pid.innerText = separated[0] + "" + separated[2];
            pid.className = "pid";
            if(!toggleInformationFound["view_pid"]){
                try{pid.classList.add("hidden");}catch{}
                // try{window.api.printToTerminal("hide PID");}catch{}
            }else{
                try{headers.classList.remove("hidden");}catch{}
                try{pid.classList.remove("hidden");}catch{}
            }
        
        if(toggleInformationFound["toggle_dark"]){
            window.api.printToTerminal("yes it supposed true" + counterToggled.toString());
            counterToggled += 1;
            history.classList.add("light_mode");
            datetime.classList.add("light_mode");
            executable_name.classList.add("light_mode");
            executable_path.classList.add("light_mode");
            pid.classList.add("light_mode");
        }
        history.appendChild(datetime);
        history.appendChild(executable_name);
        history.appendChild(executable_path);
        history.appendChild(pid);
        let tableBody = document.getElementById("main-output-history").getElementsByTagName("tbody")[0];
        tableBody.insertBefore(history, tableBody.firstChild);
    });
}