# VHomes
## Setup
1. Clone this repository to your local machine
2. Install client dependencies with: ``` npm install```
3. To start the client, run ```npm start``` 

## Cleaning Testing Database
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

## Deployment
Steps:
1. Checkout production branch and rebase from master
2. Run `npm run build` to create a production build
3. Use `firebase deploy` to update project

Checklist:
- ```axiosConfig.js```, ```fetchRequest.js```, and ```photoUploadRequest.js``` have the correct server URLs
- ```listingPage.component.js``` is using the live Stripe public key
- Firebase target folder is set to *_build_*

*_Note: always amend new commits to production branch_*
