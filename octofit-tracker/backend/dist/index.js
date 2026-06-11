"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(port, async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`Connected to MongoDB at ${mongoUri}`);
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
    console.log(`Backend API listening on port ${port}`);
});
