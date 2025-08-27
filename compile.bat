pyinstaller script/config_handler.py --onefile --distpath backend/config_handler
g++ script/executable_added_history.cc -o backend/executable_added_history.exe -I ./include
g++ script/executable_name_history.cc -D _WIN32_DCOM -l ole32 -l oleaut32 -l wbemuuid -L "C:\Program Files\mingw64\lib" -o backend/executable_name_history.exe -I ./include
npm run compile