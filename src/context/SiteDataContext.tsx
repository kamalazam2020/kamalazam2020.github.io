import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteDataState,
  DEFAULT_STATE,
  INITIAL_PARTITIONS,
  getCachedSiteData,
  fetchPublishedSiteData,
  subscribeToSiteData,
  saveSiteDataToFirestore,
  signInAdmin,
  signOutAdmin,
} from '../services/siteDataService';
import { auth, onAuthStateChanged, User } from '../lib/firebase';
import {
  PortfolioProject,
  MediaServicePackage,
  ServiceItem,
  ProcessStep,
  EquipmentItem,
  StudioItem,
  ClientItem,
  FAQItem,
  TeamMember,
} from '../types';

export type { SiteDataState };

interface SiteDataContextType {
  // Published Data (read by public website)
  data: SiteDataState;
  // Local Editing Data (used inside Admin Editor)
  editingData: SiteDataState;
  // State indicators
  isLoading: boolean;
  isAuthenticated: boolean;
  authUser: User | null;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  saveError: string | null;

  // Authentication
  login: (username: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  // Editing Actions
  updateHeroData: (updates: Partial<SiteDataState['heroData']>) => void;
  // Partitions & Categories
  addPartition: (name: string) => void;
  deletePartition: (name: string) => void;
  renamePartition: (oldName: string, newName: string) => void;
  // Projects (My Work)
  updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
  addProject: (project: PortfolioProject) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: PortfolioProject[]) => void;
  // Packages (Prices & Packages)
  updatePackage: (id: string, updates: Partial<MediaServicePackage>) => void;
  addPackage: (pkg: MediaServicePackage) => void;
  deletePackage: (id: string) => void;
  // Services
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  // Process Steps
  updateProcessStep: (number: string, updates: Partial<ProcessStep>) => void;
  // Equipment
  updateEquipment: (id: string, updates: Partial<EquipmentItem>) => void;
  addEquipment: (item: EquipmentItem) => void;
  deleteEquipment: (id: string) => void;
  // FAQs
  updateFaq: (index: number, updates: Partial<FAQItem>) => void;
  addFaq: (faq: FAQItem) => void;
  deleteFaq: (index: number) => void;

  // Save / Revert System
  saveAllChanges: () => Promise<{ success: boolean; error?: string }>;
  revertChanges: () => void;
  resetToDefaults: () => Promise<void>;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Published state (Source of Truth)
  const [data, setData] = useState<SiteDataState>(() => getCachedSiteData());
  // Working draft state inside Editor
  const [editingData, setEditingData] = useState<SiteDataState>(() => getCachedSiteData());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Authentication state
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kamal_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      const isAuthed = !!user;
      setIsAuthenticated(isAuthed);
      try {
        localStorage.setItem('kamal_admin_auth', isAuthed ? 'true' : 'false');
      } catch {}
    });

    return () => unsubscribe();
  }, []);

  // Fetch initial Firestore data and subscribe to updates
  useEffect(() => {
    let isMounted = true;

    fetchPublishedSiteData()
      .then((firestoreData) => {
        if (isMounted) {
          setData(firestoreData);
          setEditingData(firestoreData);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Error during initial fetch:', err);
        if (isMounted) setIsLoading(false);
      });

    // Real-time listener
    const unsubscribe = subscribeToSiteData((updatedData) => {
      if (isMounted) {
        setData(updatedData);
        // Only update editingData if user has not made unsaved changes
        setHasUnsavedChanges((dirty) => {
          if (!dirty) {
            setEditingData(updatedData);
          }
          return dirty;
        });
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const login = async (username: string, pass: string) => {
    const res = await signInAdmin(username, pass);
    if (res.success && res.user) {
      setAuthUser(res.user);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed.' };
  };

  const logout = async () => {
    await signOutAdmin();
    setAuthUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('kamal_admin_auth');
    } catch {}
  };

  // Helper to update local editing draft
  const mutateEditing = useCallback((updater: (prev: SiteDataState) => SiteDataState) => {
    setEditingData((prev) => {
      const next = updater(prev);
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const updateHeroData = (updates: Partial<SiteDataState['heroData']>) => {
    mutateEditing((prev) => ({
      ...prev,
      heroData: { ...prev.heroData, ...updates },
    }));
  };

  const addPartition = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    mutateEditing((prev) => {
      const current = prev.customPartitions || INITIAL_PARTITIONS;
      if (current.includes(trimmed)) return prev;
      return {
        ...prev,
        customPartitions: [...current, trimmed],
      };
    });
  };

  const deletePartition = (name: string) => {
    mutateEditing((prev) => {
      const current = prev.customPartitions || INITIAL_PARTITIONS;
      return {
        ...prev,
        customPartitions: current.filter((p) => p !== name),
      };
    });
  };

  const renamePartition = (oldName: string, newName: string) => {
    const cleanNew = newName.trim();
    if (!cleanNew || cleanNew === oldName) return;
    mutateEditing((prev) => {
      const current = prev.customPartitions || INITIAL_PARTITIONS;
      return {
        ...prev,
        customPartitions: current.map((p) => (p === oldName ? cleanNew : p)),
        portfolioProjects: prev.portfolioProjects.map((proj) =>
          proj.category === oldName ? { ...proj, category: cleanNew } : proj
        ),
      };
    });
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    mutateEditing((prev) => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  };

  const addProject = (project: PortfolioProject) => {
    mutateEditing((prev) => ({
      ...prev,
      portfolioProjects: [project, ...prev.portfolioProjects],
    }));
  };

  const deleteProject = (id: string) => {
    mutateEditing((prev) => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.filter((p) => p.id !== id),
    }));
  };

  const reorderProjects = (projects: PortfolioProject[]) => {
    mutateEditing((prev) => ({
      ...prev,
      portfolioProjects: projects,
    }));
  };

  const updatePackage = (id: string, updates: Partial<MediaServicePackage>) => {
    mutateEditing((prev) => ({
      ...prev,
      productionPackages: prev.productionPackages.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updates } : pkg
      ),
    }));
  };

  const addPackage = (pkg: MediaServicePackage) => {
    mutateEditing((prev) => ({
      ...prev,
      productionPackages: [pkg, ...prev.productionPackages],
    }));
  };

  const deletePackage = (id: string) => {
    mutateEditing((prev) => ({
      ...prev,
      productionPackages: prev.productionPackages.filter((pkg) => pkg.id !== id),
    }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    mutateEditing((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const updateProcessStep = (number: string, updates: Partial<ProcessStep>) => {
    mutateEditing((prev) => ({
      ...prev,
      processSteps: prev.processSteps.map((step) =>
        step.number === number ? { ...step, ...updates } : step
      ),
    }));
  };

  const updateEquipment = (id: string, updates: Partial<EquipmentItem>) => {
    mutateEditing((prev) => ({
      ...prev,
      studioEquipment: prev.studioEquipment.map((eq) =>
        eq.id === id ? { ...eq, ...updates } : eq
      ),
    }));
  };

  const addEquipment = (item: EquipmentItem) => {
    mutateEditing((prev) => ({
      ...prev,
      studioEquipment: [...prev.studioEquipment, item],
    }));
  };

  const deleteEquipment = (id: string) => {
    mutateEditing((prev) => ({
      ...prev,
      studioEquipment: prev.studioEquipment.filter((eq) => eq.id !== id),
    }));
  };

  const updateFaq = (index: number, updates: Partial<FAQItem>) => {
    mutateEditing((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, ...updates } : f)),
    }));
  };

  const addFaq = (faq: FAQItem) => {
    mutateEditing((prev) => ({
      ...prev,
      faqs: [...prev.faqs, faq],
    }));
  };

  const deleteFaq = (index: number) => {
    mutateEditing((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Revert local changes back to the published Firestore state
  const revertChanges = () => {
    setEditingData(data);
    setHasUnsavedChanges(false);
    setSaveError(null);
  };

  // Save all changes to Firestore
  const saveAllChanges = async (): Promise<{ success: boolean; error?: string }> => {
    setIsSaving(true);
    setSaveError(null);

    const result = await saveSiteDataToFirestore(editingData, authUser?.uid);

    setIsSaving(false);
    if (result.success) {
      setData(editingData);
      setHasUnsavedChanges(false);
      return { success: true };
    } else {
      setSaveError(result.error || 'Failed to save changes.');
      return { success: false, error: result.error };
    }
  };

  const resetToDefaults = async () => {
    setEditingData(DEFAULT_STATE);
    setHasUnsavedChanges(true);
  };

  const exportData = () => {
    return JSON.stringify(editingData, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const next: SiteDataState = {
          ...DEFAULT_STATE,
          ...parsed,
          heroData: { ...DEFAULT_STATE.heroData, ...(parsed.heroData || {}) },
        };
        setEditingData(next);
        setHasUnsavedChanges(true);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported', e);
    }
    return false;
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        editingData,
        isLoading,
        isAuthenticated,
        authUser,
        hasUnsavedChanges,
        isSaving,
        saveError,
        login,
        logout,
        updateHeroData,
        addPartition,
        deletePartition,
        renamePartition,
        updateProject,
        addProject,
        deleteProject,
        reorderProjects,
        updatePackage,
        addPackage,
        deletePackage,
        updateService,
        updateProcessStep,
        updateEquipment,
        addEquipment,
        deleteEquipment,
        updateFaq,
        addFaq,
        deleteFaq,
        saveAllChanges,
        revertChanges,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
