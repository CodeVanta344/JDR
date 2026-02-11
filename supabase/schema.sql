-- Enable Realtime
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table sessions;
alter publication supabase_realtime add table players;

-- 1. PROFILES (Standard)
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  updated_at timestamp with time zone
);

-- 2. SESSIONS (Game Rooms)
create table sessions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  active boolean default true,
  lore_context text, -- Brief summary of the current story arc
  host_id uuid references profiles(id)
);

-- 3. PLAYERS (Characters in a Session)
create table players (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references sessions(id) on delete cascade not null,
  user_id uuid references profiles(id),
  name text not null,
  class text,
  status text default 'alive', -- alive, unconscious, dead
  hp int,
  max_hp int,
  inventory jsonb,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. MESSAGES (Narrative History)
create table messages (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references sessions(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  role text not null check (role in ('system', 'user', 'assistant', 'image')), -- 'system' (GM narrating), 'user' (Player), 'assistant' (Archive AI), 'image' (PixelLab)
  content text not null, -- The text message or the Image URL
  visible_to uuid[] default null -- If null, visible to all. If set, only specific player IDs.
);

-- 5. ASSETS (Generated Images Registry)
create table assets (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  prompt text,
  url text not null,
  type text -- character, location, item
);

-- RLS POLICIES (Simplified for dev)
alter table profiles enable row level security;
alter table sessions enable row level security;
alter table players enable row level security;
alter table messages enable row level security;
alter table assets enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);

create policy "Sessions are viewable by everyone." on sessions for select using (true);
create policy "Authenticated users can create sessions." on sessions for insert with check (auth.role() = 'authenticated');

create policy "Players are viewable by everyone." on players for select using (true);
create policy "Authenticated users can join sessions." on players for insert with check (true); -- Loose policy for easy joining

create policy "Messages are viewable by everyone in the session." on messages for select using (true);
create policy "Participants can insert messages." on messages for insert with check (true);

create policy "Assets are viewable by everyone." on assets for select using (true);
