-- ============================================
-- ILEWA - Fix Infinite Recursion in Policies
-- ============================================

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public can view approved projects" ON projects;
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON projects;
DROP POLICY IF EXISTS "Users can update own pending projects" ON projects;
DROP POLICY IF EXISTS "Admins can manage all projects" ON projects;

DROP POLICY IF EXISTS "Users can view all users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

DROP POLICY IF EXISTS "Public can view comments on approved projects" ON comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

DROP POLICY IF EXISTS "Users can view likes" ON likes;
DROP POLICY IF EXISTS "Authenticated users can manage likes" ON likes;

DROP POLICY IF EXISTS "Users can view their messages" ON messages;
DROP POLICY IF EXISTS "Authenticated users can send messages" ON messages;

DROP POLICY IF EXISTS "Users can view their notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

DROP POLICY IF EXISTS "Public can view daily quotes" ON daily_quotes;
DROP POLICY IF EXISTS "Admins can manage quotes" ON daily_quotes;

-- ============================================
-- PROJECTS POLICIES (FIXED)
-- ============================================

-- Public can view approved projects
CREATE POLICY "Public can view approved projects"
ON projects FOR SELECT
USING (status = 'approved');

-- Users can view their own projects (any status)
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = author_id);

-- Authenticated users can create projects
CREATE POLICY "Authenticated users can create projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Users can update their own pending projects
CREATE POLICY "Users can update own pending projects"
ON projects FOR UPDATE
USING (auth.uid() = author_id AND status = 'pending')
WITH CHECK (auth.uid() = author_id);

-- Admins can do everything on projects (FIXED - no recursion)
CREATE POLICY "Admins can manage all projects"
ON projects FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);

-- ============================================
-- USERS POLICIES (FIXED)
-- ============================================

-- Users can view all users (for author info)
CREATE POLICY "Users can view all users"
ON users FOR SELECT
USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can manage all users (FIXED - no recursion)
CREATE POLICY "Admins can manage all users"
ON users FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);

-- ============================================
-- COMMENTS POLICIES
-- ============================================

-- Anyone can view comments on approved projects
CREATE POLICY "Public can view comments on approved projects"
ON comments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = comments.project_id
    AND projects.status = 'approved'
  )
);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
ON comments FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
ON comments FOR UPDATE
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
ON comments FOR DELETE
USING (auth.uid() = author_id);

-- ============================================
-- LIKES POLICIES
-- ============================================

-- Users can view likes
CREATE POLICY "Users can view likes"
ON likes FOR SELECT
USING (true);

-- Authenticated users can manage their own likes
CREATE POLICY "Authenticated users can manage likes"
ON likes FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- MESSAGES POLICIES
-- ============================================

-- Users can view messages they sent or received
CREATE POLICY "Users can view their messages"
ON messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Authenticated users can send messages
CREATE POLICY "Authenticated users can send messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- ============================================
-- NOTIFICATIONS POLICIES
-- ============================================

-- Users can view their own notifications
CREATE POLICY "Users can view their notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

-- System can create notifications (for triggers)
CREATE POLICY "System can create notifications"
ON notifications FOR INSERT
WITH CHECK (true);

-- ============================================
-- DAILY QUOTES POLICIES (FIXED)
-- ============================================

-- Everyone can view daily quotes
CREATE POLICY "Public can view daily quotes"
ON daily_quotes FOR SELECT
USING (true);

-- Only admins can manage quotes (FIXED - no recursion)
CREATE POLICY "Admins can manage quotes"
ON daily_quotes FOR ALL
USING (
  (auth.jwt() ->> 'role') = 'admin'
);
