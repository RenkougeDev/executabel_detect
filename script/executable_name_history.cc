#include <iostream>
#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h>
#include <vector>
#include <map>
#include <string>
#include <chrono>
#include <thread>
#include <iomanip>
#include <sys/types.h>
#include <csv-parser-2.3.0/csv.hpp>
#include <algorithm>
#include <locale>
#include <codecvt>
#include <fstream>
int main() {
    std::vector<std::string> bufferData {};
    std::wstring_convert<std::codecvt_utf8<wchar_t>, wchar_t> wchar_convert;
    std::map<std::wstring, std::vector<std::wstring>> database {};

    while(true){
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        HANDLE hSnap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        PROCESSENTRY32W pe = {sizeof(pe)};
        std::map<std::wstring, std::vector<std::wstring>> current_found {};
        for(Process32FirstW(hSnap, &pe);Process32NextW(hSnap, &pe);){
            WCHAR path[MAX_PATH];
            HANDLE hProc = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pe.th32ProcessID);
            // current_found[std::to_wstring(pe.th32ProcessID)] = {pe.szExeFile, path};
            if(hProc && GetModuleFileNameExW(hProc, NULL, path, MAX_PATH)){
                current_found[std::to_wstring(pe.th32ProcessID)] = {pe.szExeFile, path};
            }else{
                current_found[std::to_wstring(pe.th32ProcessID)] = {pe.szExeFile, L"NULL"};
                // if(current_found[std::to_wstring(pe.th32ProcessID)][1] == L"NULL" || current_found[std::to_wstring(pe.th32ProcessID)][1] == L""){
                //     current_found[std::to_wstring(pe.th32ProcessID)] = {pe.szExeFile, L"NULL"};
                // }
            }
            CloseHandle(hProc);
        }
        CloseHandle(hSnap);
        auto now = std::chrono::system_clock::now();
        std::time_t  now_c = std::chrono::system_clock::to_time_t(now);
        std::tm* ptm = std::localtime(&now_c);
        auto datetime = std::put_time(ptm, L"%Y/%m/%d %H:%M:%S");
        for(auto e : current_found){
            if(database.find(e.first) == database.end()){
                database.insert(e);
                std::wcout << " + | " << datetime << " | " << e.first << " | " << e.second[0] << " | " << e.second[1] << std::endl;

                { // line of storing in "app_found.csv"
                    std::set<std::string> currently_found_data_path {};
                    std::set<std::string> currently_found_data_executable_name {};
                    csv::CSVReader file_read("resources/app/history/app_found.csv");
                    for(csv::CSVRow& row : file_read){
                        currently_found_data_path.insert(row[2].get<std::string>());
                        currently_found_data_executable_name.insert(row[1].get<std::string>());
                    }
                    std::ofstream file_stream("resources/app/history/app_found.csv", std::ios::app);
                    csv::CSVWriter<std::ofstream> file_write(file_stream);
                    std::wstringstream datetime_str;
                    datetime_str << datetime;
                    bool will_written = false;
                    if(e.second[1] != L"NULL"){ // check path is not null, if not null check based on path
                        if(std::find(currently_found_data_path.begin(), currently_found_data_path.end(), wchar_convert.to_bytes(e.second[1])) == currently_found_data_path.end()){
                            will_written = true;
                        }
                    }else{ // if path is null, check based on executable name
                        if(std::find(currently_found_data_executable_name.begin(), currently_found_data_executable_name.end(), wchar_convert.to_bytes(e.second[0])) == currently_found_data_executable_name.end()){
                            will_written = true;
                        }
                    }
                    if(will_written){
                        file_write << std::vector<std::string>{
                            wchar_convert.to_bytes(datetime_str.str()),
                            wchar_convert.to_bytes(e.second[0]),
                            wchar_convert.to_bytes(e.second[1])
                        };
                    }
                }
            }
        }
        for(auto e : database){
            if(current_found.find(e.first) == current_found.end()){
                database.erase(e.first);
                std::wcout << " - | " << datetime << " | " << e.first << " | " << e.second[0] << " | " << e.second[1] << std::endl;
            }
        }
    }
    return 0;
}