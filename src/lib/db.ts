// Database abstraction layer for TrendWatcher
// Supports both file-based (dev) and Supabase (production)

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Types
export interface User {
  id?: string;
  email: string;
  password?: string;
  name?: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'inner-circle';
  stripe_customer_id?: string;
  reset_token?: string;
  reset_token_expires?: string;
  setup_token?: string;
  setup_expires?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Subscription {
  id?: string;
  user_id: string;
  plan: string;
  stripe_payment_id?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export interface Report {
  id?: string;
  user_id: string;
  type: string;
  title: string;
  content?: any;
  data?: any;
  status?: string;
  created_at?: string;
}

export interface IntelligenceCard {
  id?: string;
  user_id: string;
  data: any;
  created_at?: string;
}

// Explicit Supabase URL for Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const useSupabase = !!supabase;

// File-based DB (fallback for development)
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readFileDB(): any {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { users: [], subscriptions: [], reports: [], intelligence_cards: [] };
  }
}

function writeFileDB(data: any) {
  ensureDataDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Database operations
export const db = {
  // Users
  users: {
    findByEmail: async (email: string): Promise<User | null> => {
      if (useSupabase) {
        const { data } = await supabase!.from('users').select('*').eq('email', email).single();
        return data;
      }
      const data = readFileDB();
      return data.users.find((u: User) => u.email === email);
    },
    findById: async (id: string): Promise<User | null> => {
      if (useSupabase) {
        console.log('🔍 DB finding user by id:', id, '| URL:', supabaseUrl, '| key:', supabaseAnonKey.substring(0, 20) + '...');
        const { data } = await supabase!.from('users').select('*').eq('id', id).single();
        console.log('🔍 DB result:', data?.email || 'null');
        return data;
      }
      const data = readFileDB();
      return data.users.find((u: User) => u.id === id);
    },
    create: async (user: User): Promise<User> => {
      if (useSupabase) {
        const { data, error } = await supabase!.from('users').insert(user).select().single();
        if (error) throw error;
        return data;
      }
      const data = readFileDB();
      user.id = user.id || crypto.randomUUID();
      user.created_at = new Date().toISOString();
      user.updated_at = new Date().toISOString();
      data.users.push(user);
      writeFileDB(data);
      return user;
    },
    update: async (id: string, updates: Partial<User>): Promise<User | null> => {
      if (useSupabase) {
        const { data, error } = await supabase!.from('users')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id).select().single();
        if (error) return null;
        return data;
      }
      const data = readFileDB();
      const index = data.users.findIndex((u: User) => u.id === id);
      if (index !== -1) {
        data.users[index] = { ...data.users[index], ...updates, updated_at: new Date().toISOString() };
        writeFileDB(data);
        return data.users[index];
      }
      return null;
    },
    updateSubscription: async (id: string, subscription: string): Promise<User | null> => {
      return db.users.update(id, { subscription: subscription as 'free' | 'inner-circle' });
    },
    findByResetToken: async (token: string): Promise<User | null> => {
      if (useSupabase) {
        const { data } = await supabase!.from('users').select('*').eq('reset_token', token).single();
        return data;
      }
      const data = readFileDB();
      return data.users.find((u: User) => u.reset_token === token);
    },
    findBySetupToken: async (token: string): Promise<User | null> => {
      if (useSupabase) {
        const { data } = await supabase!.from('users').select('*').eq('setup_token', token).single();
        return data;
      }
      const data = readFileDB();
      return data.users.find((u: User) => u.setup_token === token);
    },
    findByCustomerId: async (customerId: string): Promise<User | null> => {
      if (useSupabase) {
        const { data } = await supabase!.from('users').select('*').eq('stripe_customer_id', customerId).single();
        return data;
      }
      const data = readFileDB();
      return data.users.find((u: User) => u.stripe_customer_id === customerId);
    }
  },

  // Subscriptions
  subscriptions: {
    findByUserId: async (userId: string): Promise<Subscription[]> => {
      if (useSupabase) {
        const { data } = await supabase!.from('subscriptions').select('*').eq('user_id', userId);
        return data || [];
      }
      const data = readFileDB();
      return data.subscriptions.filter((s: Subscription) => s.user_id === userId);
    },
    findByPaymentId: async (paymentId: string): Promise<Subscription | null> => {
      if (useSupabase) {
        const { data } = await supabase!.from('subscriptions').select('*').eq('stripe_payment_id', paymentId).single();
        return data || null;
      }
      const data = readFileDB();
      return data.subscriptions.find((s: Subscription) => s.stripe_payment_id === paymentId) || null;
    },
    create: async (subscription: Subscription): Promise<Subscription> => {
      if (useSupabase) {
        const { data, error } = await supabase!.from('subscriptions').insert(subscription).select().single();
        if (error) throw error;
        return data;
      }
      const data = readFileDB();
      subscription.id = subscription.id || crypto.randomUUID();
      subscription.created_at = new Date().toISOString();
      data.subscriptions.push(subscription);
      writeFileDB(data);
      return subscription;
    }
  },

  // Reports
  reports: {
    findByUserId: async (userId: string): Promise<Report[]> => {
      if (useSupabase) {
        const { data } = await supabase!.from('reports')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        return data || [];
      }
      const data = readFileDB();
      return data.reports
        .filter((r: Report) => r.user_id === userId)
        .sort((a: Report, b: Report) => 
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
    },
    findAll: async (): Promise<Report[]> => {
      if (useSupabase) {
        const { data } = await supabase!.from('reports')
          .select('*')
          .order('created_at', { ascending: false });
        return data || [];
      }
      const data = readFileDB();
      return data.reports.sort((a: Report, b: Report) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
    },
    create: async (report: Report): Promise<Report> => {
      if (useSupabase) {
        const { data, error } = await supabase!.from('reports').insert(report).select().single();
        if (error) throw error;
        return data;
      }
      const data = readFileDB();
      report.id = report.id || crypto.randomUUID();
      report.created_at = new Date().toISOString();
      data.reports.push(report);
      writeFileDB(data);
      return report;
    }
  },

  // Intelligence Cards
  intelligenceCards: {
    findByUserId: async (userId: string): Promise<IntelligenceCard[]> => {
      if (useSupabase) {
        const { data } = await supabase!.from('intelligence_cards')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        return data || [];
      }
      const data = readFileDB();
      return data.intelligence_cards.filter((c: IntelligenceCard) => c.user_id === userId);
    },
    findAll: async (): Promise<IntelligenceCard[]> => {
      if (useSupabase) {
        const { data } = await supabase!.from('intelligence_cards')
          .select('*')
          .order('created_at', { ascending: false });
        return data || [];
      }
      const data = readFileDB();
      return data.intelligence_cards.sort((a: IntelligenceCard, b: IntelligenceCard) => 
        new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
    },
    create: async (card: IntelligenceCard): Promise<IntelligenceCard> => {
      if (useSupabase) {
        const { data, error } = await supabase!.from('intelligence_cards').insert(card).select().single();
        if (error) throw error;
        return data;
      }
      const data = readFileDB();
      card.id = card.id || crypto.randomUUID();
      card.created_at = new Date().toISOString();
      data.intelligence_cards.push(card);
      writeFileDB(data);
      return card;
    }
  }
};

// Export for debugging
export const getDbInfo = () => ({
  provider: useSupabase ? 'supabase' : 'file',
  url: supabaseUrl || null,
  path: useSupabase ? null : DB_PATH
});
