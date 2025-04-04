const PocketBase = require('pocketbase');
const {exec} = require("child_process");
const fetch = require("node-fetch");

const POCKETBASE_URL = "http://127.0.0.1:8090";

async function isPocketBaseRunning(){
    try{
        const response = await fetch(POCKETBASE_URL);
        return response.ok;
    } catch(err){
        return false;
    }
}

async function startPocketBase() {
    if (await isPocketBaseRunning()) {
        console.log("PocketBase is already running.");
        return;
    }

    console.log("Starting PocketBase...");
    const pocketBaseProcess = exec("./pocketbase serve --dev", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting PocketBase: ${error.message}`);
            return;
        }
        if (stderr) console.error(`PocketBase stderr: ${stderr}`);
        console.log(`PocketBase stdout: ${stdout}`);
    });

    // Exit handler (cleanup)
    process.on("exit", () => {
        pocketBaseProcess.kill();
    });
}

// Start PocketBase automatically before tests
startPocketBase();