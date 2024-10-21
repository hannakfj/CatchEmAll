# Pokémon Application - Don't Cache 'Em All
This is a Pokémon app built using React with TypeScript on the frontend and Express with TypeScript on the backend. It fetches data from Pokeapi (https://pokeapi.co/) 


## Requirements
Make sure you have the following installed on your computer:  
* **Node.js:**  (v14 or higher) Download here: https://nodejs.org/en/download/package-manager
* **npm:** Node's package manager, which comes with Node.js.


## Structure

    CATCHEMALL/
    ├── client/               # Frontend (React + TypeScript)
    │   ├── assets/           # Reusable components
            ├── images/       # Images (for header)
    │   ├── components/       # Reusable components
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   ├── types/            # TypeScript types
    ├── server/               # Backend (Express + TypeScript)
    │   ├── src        
    │       └── server.ts     # Main Express server file
    └── README.md             

## Getting Started

### 1. Clone the Repository

    git clone https://github.com/hannakfj/CatchEmAll.git
    cd catchemall
### 2. Starting the app
Make sure you are in the root directory "CATCHEMALL" before running the following commands.
### Install dependencies and building the app
#### Client
        cd client
        npm install
#### Server
        cd server
        npm install
This will install all the dependensies in package.json.
### Building the app
#### Client
        cd client
        npm run build
#### Server
        cd server
        npm run build 
### Start the app
#### Client
        cd client
        npm start
This will start the React app on http://localhost:3000. 
#### Server
        cd server
        npm start

## Accessing the Application
After starting both the client and server, open your browser and navigate to http://localhost:3000.


## Testing 
#### Client
        cd client
        npx jest

Unit Test for ColumnToggle component.   


#### Server
        cd server
        npx jest
Integration Test for server.ts
