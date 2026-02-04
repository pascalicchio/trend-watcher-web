// Simple JSON-based database for TrendWatcher
// Replace with real database (PostgreSQL, MongoDB, etc.) in production

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  const initialData = {
    users: [],
    subscriptions: [],
    reports: [],
    intelligenceCards: []
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

function readDB(): any {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { users: [], subscriptions: [], reports: [], intelligenceCards: [] };
  }
}

function writeDB(data: any): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// User operations
export const db = {
  users: {
    findByEmail: (email: string) => {
      const data = readDB();
      return data.users.find((u: any) => u.email === email);
    },
    findById: (id: string) => {
      const data = readDB();
      return data.users.find((u: any) => u.id === id);
    },
    create: (user: any) => {
      const data = readDB();
      user.id = user.id || crypto.randomUUID();
      user.createdAt = new Date().toISOString();
      user.updatedAt = new Date().toISOString();
      data.users.push(user);
      writeDB(data);
      return user;
    },
    update: (id: string, updates: any) => {
      const data = readDB();
      const index = data.users.findIndex((u: any) => u.id === id);
      if (index !== -1) {
        data.users[index] = { ...data.users[index], ...updates, updatedAt: new Date().toISOString() };
        writeDB(data);
        return data.users[index];
      }
      return null;
    },
    updateSubscription: (id: string, subscription: any) => {
      const data = readDB();
      const index = data.users.findIndex((u: any) => u.id === id);
      if (index !== -1) {
        data.users[index].subscription = subscription;
        data.users[index].updatedAt = new Date().toISOString();
        writeDB(data);
        return data.users[index];
      }
      return null;
    }
  },
  
  subscriptions: {
    findByUserId: (userId: string) => {
      const data = readDB();
      return data.subscriptions.filter((s: any) => s.userId === userId);
    },
    create: (subscription: any) => {
      const data = readDB();
      subscription.id = subscription.id || crypto.randomUUID();
      subscription.createdAt = new Date().toISOString();
      data.subscriptions.push(subscription);
      writeDB(data);
      return subscription;
    },
    update: (id: string, updates: any) => {
      const data = readDB();
      const index = data.subscriptions.findIndex((s: any) => s.id === id);
      if (index !== -1) {
        data.subscriptions[index] = { ...data.subscriptions[index], ...updates };
        writeDB(data);
        return data.subscriptions[index];
      }
      return null;
    }
  },
  
  reports: {
    findByUserId: (userId: string) => {
      const data = readDB();
      return data.reports.filter((r: any) => r.userId === userId).sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    findAll: () => {
      const data = readDB();
      return data.reports.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    create: (report: any) => {
      const data = readDB();
      report.id = report.id || crypto.randomUUID();
      report.createdAt = new Date().toISOString();
      data.reports.push(report);
      writeDB(data);
      return report;
    }
  },
  
  intelligenceCards: {
    findByUserId: (userId: string) => {
      const data = readDB();
      return data.intelligenceCards.filter((c: any) => c.userId === userId);
    },
    create: (card: any) => {
      const data = readDB();
      card.id = card.id || crypto.randomUUID();
      card.createdAt = new Date().toISOString();
      data.intelligenceCards.push(card);
      writeDB(data);
      return card;
    }
  }
};
