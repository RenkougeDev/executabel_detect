#include <iostream>
#include <csv-parser-2.3.0/csv.hpp>
#include <fstream>
#include <vector>
#include <algorithm>
int main() {
    std::vector<std::string> bufferData {};
    csv::CSVReader reader("history/app_found.csv");
    for(csv::CSVRow& row : reader){
        bufferData.push_back(row[1].get<>());
        std::cout << row[1].get<>() << std::endl;
    }
    std::ofstream file_stream("history/app_found.csv", std::ios::app);
    csv::CSVWriter<std::ofstream> writter(file_stream);
    std::vector<std::vector<std::string>> try_input = {
        {"", "", ""},
    };
    for(std::vector<std::string>& e: try_input){
        if(std::find(bufferData.begin(), bufferData.end(), e[1]) == bufferData.end()){
            // e[1] is not in data
            writter << e;
        }else{
            // e[1] is in data
        }
    }
    // file_stream << std::endl;
    return 0;
}
