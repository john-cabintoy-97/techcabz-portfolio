'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type {
  Project,
  ProjectInsert,
  ProjectUpdate,
  Experience,
  ExperienceInsert,
  ExperienceUpdate,
  Certificate,
  CertificateInsert,
  CertificateUpdate,
} from '@/types/database';

// ─── Helpers ────────────────────────────────────────────────

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseList(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function extractFormData(formData: FormData): ProjectInsert {
  return {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    content: (formData.get('content') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    project_url: (formData.get('project_url') as string) || null,
    github_url: (formData.get('github_url') as string) || null,
    tags: parseTags(formData.get('tags') as string),
    featured: formData.get('featured') === 'on',
  };
}

// ─── READ ────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Project | null;
}

// ─── CREATE ──────────────────────────────────────────────────

export async function createProject(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const payload = extractFormData(formData);

  if (!payload.title || !payload.description) {
    return { error: 'Title and description are required.' };
  }

  const { error } = await supabase.from('projects').insert(payload);

  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

// ─── UPDATE ──────────────────────────────────────────────────

export async function updateProject(
  id: string,
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const payload: ProjectUpdate = extractFormData(formData);

  if (!payload.title || !payload.description) {
    return { error: 'Title and description are required.' };
  }

  const { error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/projects/${id}`);
  redirect('/admin');
}

// ─── DELETE ──────────────────────────────────────────────────

export async function deleteProject(id: string): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  return {};
}

// ─── EXPERIENCE CRUD ───────────────────────────────────────

export async function getExperiences(): Promise<Experience[]> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Experience[];
}

export async function getExperience(id: string): Promise<Experience | null> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Experience | null;
}

export async function createExperience(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const isCurrent = formData.get('is_current') === 'on';
  const payload: ExperienceInsert = {
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    location: (formData.get('location') as string) || null,
    start_date: formData.get('start_date') as string,
    end_date: isCurrent ? null : (formData.get('end_date') as string) || null,
    description: formData.get('description') as string,
    technologies: parseList(formData.get('technologies') as string),
    is_current: isCurrent,
  };

  if (!payload.role || !payload.company || !payload.start_date || !payload.description) {
    return { error: 'Role, company, start date, and description are required.' };
  }

  const { error } = await supabase.from('experience').insert(payload);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateExperience(
  id: string,
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const isCurrent = formData.get('is_current') === 'on';
  const payload: ExperienceUpdate = {
    role: formData.get('role') as string,
    company: formData.get('company') as string,
    location: (formData.get('location') as string) || null,
    start_date: formData.get('start_date') as string,
    end_date: isCurrent ? null : (formData.get('end_date') as string) || null,
    description: formData.get('description') as string,
    technologies: parseList(formData.get('technologies') as string),
    is_current: isCurrent,
  };

  if (!payload.role || !payload.company || !payload.start_date || !payload.description) {
    return { error: 'Role, company, start date, and description are required.' };
  }

  const { error } = await supabase.from('experience').update(payload).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteExperience(id: string): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase.from('experience').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  return {};
}

// ─── CERTIFICATE CRUD ───────────────────────────────────────

export async function getCertificates(): Promise<Certificate[]> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issue_date', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Certificate[];
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Certificate | null;
}

export async function createCertificate(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const payload: CertificateInsert = {
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    issue_date: formData.get('issue_date') as string,
    credential_url: (formData.get('credential_url') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
  };

  if (!payload.title || !payload.issuer || !payload.issue_date) {
    return { error: 'Title, issuer, and issue date are required.' };
  }

  const { error } = await supabase.from('certificates').insert(payload);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateCertificate(
  id: string,
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const payload: CertificateUpdate = {
    title: formData.get('title') as string,
    issuer: formData.get('issuer') as string,
    issue_date: formData.get('issue_date') as string,
    credential_url: (formData.get('credential_url') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
  };

  if (!payload.title || !payload.issuer || !payload.issue_date) {
    return { error: 'Title, issuer, and issue date are required.' };
  }

  const { error } = await supabase.from('certificates').update(payload).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteCertificate(id: string): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin');
  return {};
}

// ─── AUTH ────────────────────────────────────────────────────

export async function signIn(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = (await createClient()) as any;

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  revalidatePath('/', 'layout');
  redirect('/admin');
}

export async function signOut(): Promise<void> {
  const supabase = (await createClient()) as any;
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
