# VHomes
## Setup
1. Clone this repository to your local machine
2. Install client dependencies with: ``` npm install```
3. To start the client, run ```npm start``` 

## Script to clean testing data
Setup:
1. Clone clearTestingData.py and requirements.txt to your local machine
2. Install dependecies with:
	```
	pip install -r requirements.txt
	```
Set which database to use by changing dbname on line 4.
Run the script: 
	```
	python clearTestingData.py
	```
For each collection in the database, you will be prompted to drop the collection.
Enter 'y' if you want to drop the collection, and 'n' if you want to keep the collection.
At the end, the remaining collections in the database will be listed.
