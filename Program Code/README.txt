Instruction
Source files
1. Source files need to be EXACTLY TWO files
2. Data in source files should be numbers
3. The amount of numbers in two need to be the same
4. Numbers in each source file are seperated by different line ('\r\n')
   format example1:
    23
    55
    77
    99
    100

   format example2:
    9.9
    44.88
    22
    33.8
    19.4
    221.4
//////////////////////////////////////////////////////////////////////
HTTP server
1. Open Node command prompt
2. Redirect to the folder where the file, server.js, is 
    (i.e. cd c:\nodeServer)
3. Type command
    node server.js
4. The server is online now. 
5. Leave the Node command prompt open
5. Open a browser
6. Type 
    http://127.0.0.1:8000
    OR
    localhost:8000

//////////////////////////////////////////////////////////////////////
Node.js Command Line Application:
1. Open Node command prompt
2. Redirect to the folder where the file, Node_CMD_server.js, is 
    (i.e. cd c:\nodeServer)
3. Type 
    node Node_CMD_server.js _fileAddress1,_fileAddress2
    
    _fileAddress1: Replace with your first source file address and full name
    _fileAddress2: Replace with your second source file address and full name
    
    example1: node Node_CMD_server.js TestData1.txt,TestData2.txt
    example2: node Node_CMD_server.js ./TestData1.txt,./TestData2.txt
4. If the input files' format are correct, 
   a Result.txt file will be written into the current folder


///////////////////////////////////////
RESTFUL server:
1. Open Node command prompt
2. Redirect to the folder where the file, RESTFUL_server.js, is 
    (i.e. cd c:\nodeServer)
3. Type command
    node RESTFUL_server.js
4. The server is online now. 
5. Leave the Node command prompt open
5. Open a browser
6. Type 
    http://127.0.0.1:8888/API/CAL/_fileAddress1,_fileAddress2 
    OR
    localhost:8888/API/CAL/_fileAddress1,_fileAddress2

    _fileAddress1: Replace with your first source file address and full name
    _fileAddress2: Replace with your second source file address and full name

    example1: http://127.0.0.1:8888/API/CAL/TestData1.txt,TestData2.txt
    example2: localhost:8888/API/CAL/./TestData1.txt,./TestData2.txt
7. The caculation result will show in the browser
