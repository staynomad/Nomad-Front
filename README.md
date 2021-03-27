# VHomes
## Setup
1. Clone this repository to your local machine
2. Install client dependencies with: ``` npm install```
3. To start the client, run ```npm start``` 

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
