export type ViewType = 
  | 'home' 
  | 'courses' 
  | 'course-detail' 
  | 'polos' 
  | 'about' 
  | 'enroll' 
  | 'enroll-success' 
  | 'admin'
  | 'admin-dashboard'
  | 'admin-courses' 
  | 'admin-categories'
  | 'admin-leads' 
  | 'admin-polos'
  | 'admin-reviews'
  | 'admin-settings';

export type CourseCategory = 
  | 'Tecnologia' 
  | 'Gestão' 
  | 'Línguas' 
  | 'Técnico' 
  | 'Beleza & Estética' 
  | 'Saúde'
  | 'Indústria & Mecânica'
  | string;

export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  coursesCount?: number;
  order: number;
}

export type EnrollmentStatus = 'abertas' | 'limitadas' | 'esgotadas';
export type CourseStatus = EnrollmentStatus;

export interface Course {
  id: string;
  name: string;
  slug: string;
  category: CourseCategory;
  price: number; // in Kz
  registrationFee: number; // in Kz (e.g. 2000)
  duration: string; // e.g. "6 Meses", "3 Meses"
  hoursCount?: number; // e.g. 40
  status: EnrollmentStatus;
  isActive: boolean;
  image: string;
  modality: string;
  shortDescription: string;
  fullDescription: string;
  syllabus: string[];
  requirements: string[];
  careerOutcomes: string[];
  availablePolos: string[]; // e.g. ["Viana", "Cacuaco", "Zango", "Benfica"]
  nextClassDate: string; // e.g. "01 SET 2025"
  featured?: boolean;
}

export interface Polo {
  id: string;
  name: string;
  address: string;
  municipality: string;
  phone: string;
  whatsapp: string;
  email?: string;
  schedule: string;
  image?: string;
  imageUrl?: string;
  featuredCourses: string[];
  facilities: string[];
  coordinator?: string;
  coordinatorName?: string;
  coordinatorPhone?: string;
  capacity?: number;
  isActive?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type LeadSource = 'whatsapp' | 'web' | 'instagram' | 'presencial' | 'secretaria';
export type LeadStatus = 'novo' | 'contactado' | 'matriculado' | 'perdido';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  courseName: string;
  poloName: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string; // ISO format or formatted string
  notes?: string;
  birthDate?: string;
  biNumber?: string;
  shift?: string;
  academicLevel?: string;
  address?: string;
}

export interface EnrollmentSubmission {
  fullName: string;
  biNumber: string;
  birthDate: string;
  gender: string;
  phone: string;
  email?: string;
  address: string;
  academicLevel: string;
  courseId: string;
  courseName: string;
  poloId: string;
  poloName: string;
  shift: string;
  attachedFilesCount: number;
  notes?: string;
}

export interface CourseReview {
  id: string;
  courseId: string;
  courseName?: string;
  poloName?: string;
  authorName: string;
  studentName?: string;
  authorRole?: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verifiedStudent?: boolean;
  likesCount?: number;
  highlightTags?: string[];
  isApproved?: boolean;
  isFeatured?: boolean;
  featuredOnHome?: boolean;
}

export interface CourseRatingStats {
  average: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface BannerAlertConfig {
  enabled: boolean;
  text: string;
  badgeText?: string;
  linkText?: string;
  linkView?: ViewType;
  type: 'info' | 'highlight' | 'warning' | 'emerald';
}

export interface SiteStatsConfig {
  studentsTrained: string;
  activeCourses: string;
  employmentRate: string;
  polosCount: string;
  instructorsCount: string;
  satisfactionRate: string;
}

export interface SocialLinksConfig {
  facebook: string;
  instagram: string;
  whatsapp: string;
  whatsappOfficial?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface SiteSettings {
  institutionName: string;
  brandShortName: string;
  slogan: string;
  accreditationText: string;
  inefopRegistration: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappOfficial: string;
  whatsappMain?: string;
  whatsappSupport?: string;
  emailContact: string;
  emailSecretaria: string;
  headquartersAddress: string;
  generalSchedule: string;
  defaultRegistrationFee: number;
  defaultCertificateFee: number;
  academicYear: string;
  currentIntakePeriod: string;
  bannerAlert: BannerAlertConfig;
  stats: SiteStatsConfig;
  socialLinks: SocialLinksConfig;
  heroBadgeText: string;
  heroHeading: string;
  heroSubheading: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface DynamicSEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  course?: Course;
  polo?: Polo;
  customSchema?: Record<string, any>;
  noIndex?: boolean;
}
