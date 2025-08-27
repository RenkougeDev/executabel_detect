#include <iostream>
#include <csv-parser-2.3.0/csv.hpp>
#include <fstream>
#include <vector>
#include <algorithm>
#include <thread>
#include <chrono>
int main() {
    std::vector<std::string> bufferData {};
    csv::CSVReader reader("resources/app/history/app_found.csv");
    for(csv::CSVRow& row : reader){
        std::string found = row[0].get<>() + " | " + row[1].get<>() + " | " + row[2].get<>();
        if(std::find(bufferData.begin(), bufferData.end(), found) == bufferData.end()){
            bufferData.push_back(found);
            std::cout << found << std::endl;
        }
    }
    while(true){
        csv::CSVReader reader("resources/app/history/app_found.csv");
        for(csv::CSVRow& row : reader){
            std::string found = row[0].get<>() + " | " + row[1].get<>() + " | " + row[2].get<>();
            if(std::find(bufferData.begin(), bufferData.end(), found) == bufferData.end()){
                bufferData.push_back(found);
                std::cout << found << std::endl;
            }
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    return 0;
}