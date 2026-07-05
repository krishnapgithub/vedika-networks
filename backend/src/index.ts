import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' })); // Allow your frontend port
app.use(express.json());

// Maintain active client streams
let clients: Response[] = [];

// Base array of latest headlines
let liveBulletins = [
    { category: "GEOPOLITICS", text: "Strait of Hormuz transit closed completely; global shipping routes face localized security halts.", link: "#" },
    { category: "INDIA NEWS", text: "Mumbai special court acquits all eight accused individuals in 2006 Pawanraje Nimbalkar case.", link: "#" },
    { category: "EXAMS", text: "NTA re-assigns Nagpur student center location from Abu Dhabi back to India following public pressure.", link: "#" }
];

// SSE Endpoint for streaming live news updates
app.get('/api/news/stream', (req: Request, res: Response) => {
    // Set explicit mandatory HTTP headers for Server-Sent Events (SSE)
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    // Push immediate base state on connection
    res.write(`data: ${JSON.stringify(liveBulletins)}\n\n`);
    clients.push(res);

    // Remove client reference when connection breaks
    req.on('close', () => {
        clients = clients.filter(client => client !== res);
    });
});

// Periodic background interval simulating live updates every 10 seconds
setInterval(() => {
    const categories = ["WORLD CUP", "FINANCE", "TECH", "BREAKING"];
    const updates = [
        "FIFA Day 10 updates: Brazil maintains grouping dominance with 3-0 clean sheet win against Haiti.",
        "Stock markets react sharply following disruptions in major maritime transit lines.",
        "New AI legal regulations introduced to filter predictive algorithms in court systems.",
        "Emergency transit diversions initiated globally amid evolving geopolitical situations."
    ];

    const randomIndex = Math.floor(Math.random() * updates.length);
    const newStory = {
        category: categories[randomIndex],
        text: updates[randomIndex],
        link: "#"
    };

    // Keep a maximum of 5 active items inside the live ticker
    liveBulletins = [newStory, ...liveBulletins.slice(0, 4)];

    // Broadcast the update payload cleanly to all active browser client pipelines
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(liveBulletins)}\n\n`);
    });
}, 10000);

app.listen(PORT, () => {
    console.log(`Live streaming backend server active on port ${PORT}`);
});
