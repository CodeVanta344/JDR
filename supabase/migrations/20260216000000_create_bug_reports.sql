-- Migration: Create bug_reports table and storage bucket for debug reports
-- Created: 2026-02-16

-- Create the bug_reports table
CREATE TABLE IF NOT EXISTS bug_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    player_id UUID,
    player_name TEXT,
    description TEXT NOT NULL,
    screenshots TEXT[] DEFAULT '{}',
    logs JSONB DEFAULT '[]',
    user_agent TEXT,
    url TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bug_reports_session ON bug_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_status ON bug_reports(status);
CREATE INDEX IF NOT EXISTS idx_bug_reports_timestamp ON bug_reports(timestamp DESC);

-- Enable RLS
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for anonymous bug reports)
CREATE POLICY "Allow anonymous bug report submission" ON bug_reports
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow players to view their own reports
CREATE POLICY "Players can view own reports" ON bug_reports
    FOR SELECT TO authenticated
    USING (player_id = auth.uid());

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_bug_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS bug_reports_updated_at ON bug_reports;
CREATE TRIGGER bug_reports_updated_at
    BEFORE UPDATE ON bug_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_bug_reports_updated_at();

-- Note: Storage bucket 'bug-reports' needs to be created via Supabase Dashboard or API
-- The bucket should have public read access but restricted write access
