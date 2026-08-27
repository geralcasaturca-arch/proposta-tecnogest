import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Lead,
  Polo,
  ViewType,
  EnrollmentSubmission,
  LeadStatus,
  CourseReview,
  CourseRatingStats,
  SiteSettings,
  CategoryConfig
} from '../types';
import { INITIAL_COURSES } from '../data/courses';
import { INITIAL_POLOS } from '../data/polos';
import { INITIAL_LEADS } from '../data/leads';
import { INITIAL_REVIEWS } from '../data/reviews';
import { INITIAL_SITE_SETTINGS } from '../data/settings';
import { INITIAL_CATEGORIES } from '../data/categories';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  navigateToCourseDetail: (course: Course) => void;
  navigateToEnroll: (courseId?: string, poloId?: string) => void;

  // Site Settings & CMS Parameters
  siteSettings: SiteSettings;
  updateSiteSettings: (updated: Partial<SiteSettings>) => void;
  resetSiteSettings: () => void;

  // Categories CRUD
  categories: CategoryConfig[];
  addCategory: (category: Omit<CategoryConfig, 'id'>) => void;
  updateCategory: (id: string, updated: Partial<CategoryConfig>) => void;
  deleteCategory: (id: string) => void;

  // Courses state & CRUD
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'slug'>) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  toggleCourseActive: (id: string) => void;
  duplicateCourse: (id: string) => void;

  // Polos state & CRUD
  polos: Polo[];
  selectedPolo: Polo | null;
  setSelectedPolo: (polo: Polo | null) => void;
  addPolo: (polo: Omit<Polo, 'id'>) => void;
  updatePolo: (id: string, updated: Partial<Polo>) => void;
  deletePolo: (id: string) => void;
  togglePoloActive: (id: string) => void;

  // Leads state & operations
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addManualLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updated: Partial<Lead>) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  exportLeadsCSV: () => void;

  // Reviews state & operations
  reviews: CourseReview[];
  addReview: (review: Omit<CourseReview, 'id' | 'date'>) => void;
  updateReview: (id: string, updated: Partial<CourseReview>) => void;
  deleteReview: (id: string) => void;
  toggleApproveReview: (id: string) => void;
  toggleFeaturedReview: (id: string) => void;
  toggleVerifiedReview: (id: string) => void;
  likeReview: (reviewId: string) => void;
  getCourseReviews: (courseId: string) => CourseReview[];
  getCourseStats: (courseId: string) => CourseRatingStats;

  // Enrollment form & submission
  lastSubmission: EnrollmentSubmission | null;
  submitEnrollment: (submission: EnrollmentSubmission) => void;

  // WhatsApp Chat Modal
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;

  // Pre-selected parameters for enrollment
  preSelectedCourseId: string;
  preSelectedPoloId: string;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Global reset for testing
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SETTINGS_STORAGE_KEY = 'tecnogest_settings_v3';
const CATEGORIES_STORAGE_KEY = 'tecnogest_categories_v3';
const COURSES_STORAGE_KEY = 'tecnogest_courses_v3';
const POLOS_STORAGE_KEY = 'tecnogest_polos_v3';
const LEADS_STORAGE_KEY = 'tecnogest_leads_v3';
const REVIEWS_STORAGE_KEY = 'tecnogest_reviews_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(INITIAL_COURSES[0]);
  const [selectedPolo, setSelectedPolo] = useState<Polo | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [preSelectedCourseId, setPreSelectedCourseId] = useState<string>('');
  const [preSelectedPoloId, setPreSelectedPoloId] = useState<string>('');
  const [lastSubmission, setLastSubmission] = useState<EnrollmentSubmission | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SITE_SETTINGS;
  });

  // Categories
  const [categories, setCategories] = useState<CategoryConfig[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(COURSES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_COURSES;
  });

  // Polos
  const [polos, setPolos] = useState<Polo[]>(() => {
    try {
      const saved = localStorage.getItem(POLOS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_POLOS;
  });

  // Leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_LEADS;
  });

  // Reviews
  const [reviews, setReviews] = useState<CourseReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
    } catch {}
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch {}
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(POLOS_STORAGE_KEY, JSON.stringify(polos));
    } catch {}
  }, [polos]);

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateToCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const navigateToEnroll = (courseId?: string, poloId?: string) => {
    if (courseId) setPreSelectedCourseId(courseId);
    if (poloId) setPreSelectedPoloId(poloId);
    setCurrentView('enroll');
  };

  // Site Settings Operations
  const updateSiteSettings = (updated: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({
      ...prev,
      ...updated,
      stats: updated.stats ? { ...prev.stats, ...updated.stats } : prev.stats,
      socialLinks: updated.socialLinks ? { ...prev.socialLinks, ...updated.socialLinks } : prev.socialLinks,
      bannerAlert: updated.bannerAlert ? { ...prev.bannerAlert, ...updated.bannerAlert } : prev.bannerAlert
    }));
    showToast('Definições do CMS atualizadas com sucesso!');
  };

  const resetSiteSettings = () => {
    setSiteSettings(INITIAL_SITE_SETTINGS);
    showToast('Definições restauradas para o padrão institucional.');
  };

  // Categories Operations
  const addCategory = (categoryData: Omit<CategoryConfig, 'id'>) => {
    const safeName = (categoryData.name || 'categoria').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `cat-${safeName}-${Date.now()}`;
    const newCat: CategoryConfig = {
      ...categoryData,
      id,
      slug: categoryData.slug || safeName
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Categoria "${newCat.name}" criada com sucesso!`);
  };

  const updateCategory = (id: string, updated: Partial<CategoryConfig>) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...updated } : cat));
    showToast('Categoria atualizada com sucesso!');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    showToast('Categoria removida do catálogo.', 'info');
  };

  // Course Operations
  const addCourse = (courseData: Omit<Course, 'id' | 'slug'>) => {
    const safeName = (courseData.name || 'curso').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = safeName + '-' + Math.random().toString(36).substring(2, 5);
    const newCourse: Course = {
      ...courseData,
      id,
      slug: id
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Curso "${newCourse.name}" cadastrado com sucesso!`);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    if (selectedCourse?.id === id) {
      setSelectedCourse(prev => prev ? { ...prev, ...updated } : null);
    }
    showToast('Curso atualizado com sucesso!');
  };

  const duplicateCourse = (id: string) => {
    const target = courses.find(c => c.id === id);
    if (!target) return;
    const newId = `${target.id}-copia-${Date.now()}`;
    const newCourse: Course = {
      ...target,
      id: newId,
      slug: newId,
      name: `${target.name} (Cópia)`,
      featured: false
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Curso duplicado como "${newCourse.name}".`);
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast('Curso removido com sucesso!', 'info');
  };

  const toggleCourseActive = (id: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        const nextActive = !c.isActive;
        const nextStatus = nextActive ? 'abertas' : 'esgotadas';
        return { ...c, isActive: nextActive, status: nextStatus };
      }
      return c;
    }));
  };

  // Polos Operations
  const addPolo = (poloData: Omit<Polo, 'id'>) => {
    const safeName = (poloData.name || 'polo').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `polo-${safeName}-${Date.now()}`;
    const newPolo: Polo = {
      ...poloData,
      id
    };
    setPolos(prev => [...prev, newPolo]);
    showToast(`Polo "${newPolo.name}" adicionado com sucesso!`);
  };

  const updatePolo = (id: string, updated: Partial<Polo>) => {
    setPolos(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    if (selectedPolo?.id === id) {
      setSelectedPolo(prev => prev ? { ...prev, ...updated } : null);
    }
    showToast('Informações do polo atualizadas com sucesso!');
  };

  const deletePolo = (id: string) => {
    setPolos(prev => prev.filter(p => p.id !== id));
    showToast('Polo removido.', 'info');
  };

  const togglePoloActive = (id: string) => {
    setPolos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isActive: p.isActive === false ? true : false };
      }
      return p;
    }));
  };

  // Leads Operations
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const now = new Date();
    const timeString = `Hoje, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: timeString
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const addManualLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const now = new Date();
    const timeString = `Hoje, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: timeString
    };
    setLeads(prev => [newLead, ...prev]);
    showToast(`Lead / Matrícula de "${newLead.name}" registada com sucesso!`);
  };

  const updateLead = (id: string, updated: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l));
    showToast('Lead atualizada com sucesso.');
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
    showToast(`Estado da lead atualizado para "${status}".`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Registo de lead eliminado.', 'info');
  };

  const submitEnrollment = (submission: EnrollmentSubmission) => {
    setLastSubmission(submission);
    // Add automatically as a lead
    addLead({
      name: submission.fullName,
      phone: submission.phone,
      email: submission.email,
      courseName: submission.courseName,
      poloName: submission.poloName,
      source: 'web',
      status: 'novo',
      birthDate: submission.birthDate,
      biNumber: submission.biNumber,
      shift: submission.shift === '' ? undefined : submission.shift,
      academicLevel: submission.academicLevel,
      address: submission.address,
      notes: `Inscrição completa via Website. Nível: ${submission.academicLevel}. Anexos: ${submission.attachedFilesCount}`
    });
    setCurrentView('enroll-success');
    showToast('Inscrição enviada com sucesso!');
  };

  const exportLeadsCSV = () => {
    const headers = ['ID', 'Nome', 'Telefone', 'Email', 'Curso', 'Polo', 'Origem', 'Estado', 'Data de Registo', 'BI', 'Notas'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.courseName}"`,
      `"${l.poloName}"`,
      l.source,
      l.status,
      `"${l.createdAt}"`,
      `"${l.biNumber || ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_tecnogest_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exportação concluída! Ficheiro descarregado com sucesso.');
  };

  // Reviews Operations
  const addReview = (reviewData: Omit<CourseReview, 'id' | 'date'>) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newReview: CourseReview = {
      ...reviewData,
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      date: formattedDate,
      likesCount: 0,
      isApproved: true,
      verifiedStudent: reviewData.verifiedStudent !== false
    };

    setReviews(prev => [newReview, ...prev]);
    showToast('Avaliação e feedback registados com sucesso! Obrigado pela sua contribuição.');
  };

  const updateReview = (id: string, updated: Partial<CourseReview>) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    showToast('Avaliação atualizada.');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Avaliação removida.', 'info');
  };

  const toggleApproveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
  };

  const toggleFeaturedReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, featuredOnHome: !r.featuredOnHome } : r));
    showToast('Status de destaque da avaliação alterado.');
  };

  const toggleVerifiedReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, verifiedStudent: !r.verifiedStudent } : r));
  };

  const likeReview = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, likesCount: (r.likesCount || 0) + 1 } : r))
    );
  };

  const getCourseReviews = (courseId: string): CourseReview[] => {
    return reviews.filter(r => r.courseId === courseId && r.isApproved !== false);
  };

  const getCourseStats = (courseId: string): CourseRatingStats => {
    const courseRevs = reviews.filter(r => r.courseId === courseId && r.isApproved !== false);
    if (courseRevs.length === 0) {
      return {
        average: 4.9,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    courseRevs.forEach(r => {
      const roundedRating = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      distribution[roundedRating] = (distribution[roundedRating] || 0) + 1;
      sum += r.rating;
    });

    const average = Number((sum / courseRevs.length).toFixed(1));

    return {
      average,
      totalReviews: courseRevs.length,
      distribution
    };
  };

  const resetAllToDefaults = () => {
    setSiteSettings(INITIAL_SITE_SETTINGS);
    setCategories(INITIAL_CATEGORIES);
    setCourses(INITIAL_COURSES);
    setPolos(INITIAL_POLOS);
    setLeads(INITIAL_LEADS);
    setReviews(INITIAL_REVIEWS);
    showToast('Todos os dados foram restaurados para os padrões de fábrica.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCourse,
        setSelectedCourse,
        navigateToCourseDetail,
        navigateToEnroll,
        siteSettings,
        updateSiteSettings,
        resetSiteSettings,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        toggleCourseActive,
        duplicateCourse,
        polos,
        selectedPolo,
        setSelectedPolo,
        addPolo,
        updatePolo,
        deletePolo,
        togglePoloActive,
        leads,
        addLead,
        addManualLead,
        updateLead,
        updateLeadStatus,
        deleteLead,
        exportLeadsCSV,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        toggleApproveReview,
        toggleFeaturedReview,
        toggleVerifiedReview,
        likeReview,
        getCourseReviews,
        getCourseStats,
        lastSubmission,
        submitEnrollment,
        isChatModalOpen,
        setIsChatModalOpen,
        preSelectedCourseId,
        preSelectedPoloId,
        toasts,
        showToast,
        removeToast,
        resetAllToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

