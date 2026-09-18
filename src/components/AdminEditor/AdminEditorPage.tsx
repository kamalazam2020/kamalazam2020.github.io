import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../../context/SiteDataContext';
import { PortfolioProject, MediaServicePackage, ServiceItem, ProcessStep, FAQItem, EquipmentItem } from '../../types';
import {
  Film,
  DollarSign,
  Layers,
  Type,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  Eye,
  LogOut,
  RotateCcw,
  Download,
  UploadCloud,
  CheckCircle,
  Play,
  Save,
  Video,
  Image as ImageIcon,
  Edit3,
  FolderOpen,
  X,
  AlertCircle,
  Camera,
  Layers as LayersIcon,
  Cloud,
  RefreshCw,
} from 'lucide-react';

interface AdminEditorPageProps {
  onClose: () => void;
}

export const AdminEditorPage: React.FC<AdminEditorPageProps> = ({ onClose }) => {
  const {
    editingData,
    hasUnsavedChanges,
    isSaving,
    saveError,
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
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<'work' | 'pricing' | 'services' | 'texts'>('work');
  const [selectedCategory, setSelectedCategory] = useState<string>('Commercial Ads');
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  // Partition dialog states
  const [isAddPartitionOpen, setIsAddPartitionOpen] = useState(false);
  const [newPartitionInput, setNewPartitionInput] = useState('');
  const [isRenamePartitionOpen, setIsRenamePartitionOpen] = useState(false);
  const [renamePartitionInput, setRenamePartitionInput] = useState('');

  const importFileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleManualSave = async () => {
    const res = await saveAllChanges();
    if (res.success) {
      showToast('All changes saved and published to Firestore!');
    } else {
      alert(res.error || 'Failed to save to Firestore. Please check your network or authentication.');
    }
  };

  const handleRevert = () => {
    if (window.confirm('Discard all unsaved edits and restore the published Firestore version?')) {
      revertChanges();
      showToast('Unsaved edits discarded. Restored published version.');
    }
  };

  const handleSafeClose = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes that will not appear on the live site until saved. Exit anyway?')) {
        return;
      }
    }
    onClose();
  };

  // Combine customPartitions with project categories for safety
  const allPartitions = Array.from(
    new Set([
      ...(editingData.customPartitions || [
        'Commercial Ads',
        'Documentaries',
        'Podcasts',
        'Brand Films',
        '2D Animation',
        'Photography & Stills',
      ]),
      ...editingData.portfolioProjects.map((p) => p.category),
    ])
  );

  // Fallback if selected category is deleted
  const currentCategory = allPartitions.includes(selectedCategory)
    ? selectedCategory
    : allPartitions[0] || 'Commercial Ads';

  const filteredProjects = editingData.portfolioProjects.filter(
    (p) => p.category === currentCategory
  );

  // Video File Upload handler
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert('File is large (>50MB). For high-performance streaming, you can also paste a Cloudinary or CDN URL.');
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
        showToast('Video uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Image File Upload handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
        showToast('Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Create Video Project
  const handleCreateVideoProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: PortfolioProject = {
      id: newId,
      title: 'New Commercial Production',
      category: currentCategory,
      mediaType: 'video',
      client: 'Brand Partner',
      year: new Date().getFullYear().toString(),
      duration: '0:45',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=spk1t8xs&public_id=0917_3',
      description: 'Cinematic brand campaign highlighting visual direction and color grading.',
      featured: true,
    };
    addProject(newProject);
    setEditingProjectId(newId);
    showToast(`Added new video project in "${currentCategory}"`);
  };

  // Create Picture / Photo Project
  const handleCreatePhotoProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: PortfolioProject = {
      id: newId,
      title: 'New Editorial Stills & Photography',
      category: currentCategory,
      mediaType: 'image',
      client: 'Luxury Brand',
      year: new Date().getFullYear().toString(),
      thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=85',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=85',
      description: 'High-resolution medium format studio campaign and editorial photography.',
      featured: false,
    };
    addProject(newProject);
    setEditingProjectId(newId);
    showToast(`Added new photo/picture item in "${currentCategory}"`);
  };

  // Add Partition Action
  const handleAddPartitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPartitionInput.trim();
    if (!clean) return;
    addPartition(clean);
    setSelectedCategory(clean);
    setNewPartitionInput('');
    setIsAddPartitionOpen(false);
    showToast(`Created partition "${clean}"`);
  };

  // Rename Partition Action
  const handleRenamePartitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = renamePartitionInput.trim();
    if (!clean || clean === currentCategory) return;
    renamePartition(currentCategory, clean);
    setSelectedCategory(clean);
    setIsRenamePartitionOpen(false);
    showToast(`Renamed partition to "${clean}"`);
  };

  // Delete Partition Action
  const handleDeleteCurrentPartition = () => {
    if (allPartitions.length <= 1) {
      alert('You must keep at least one partition.');
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete the partition "${currentCategory}"? Projects in this partition will remain accessible or can be reassigned.`
      )
    ) {
      deletePartition(currentCategory);
      const remaining = allPartitions.filter((p) => p !== currentCategory);
      setSelectedCategory(remaining[0] || 'Commercial Ads');
      showToast(`Partition "${currentCategory}" removed`);
    }
  };

  // Create Pricing Package
  const handleCreatePackage = () => {
    const newId = `package-${Date.now()}`;
    const newPkg: MediaServicePackage = {
      id: newId,
      name: 'Custom Production Package',
      category: 'Video Production',
      tagline: 'High-impact commercial cinematography & master editing',
      pricing: '$3,500',
      ratePeriod: 'per production',
      turnaround: '5-7 Days',
      deliverables: [
        '4K Master Deliverable',
        'Vertical Social Cuts',
        'Show LUT Color Grade',
        'Licensed Audio Track',
      ],
      specs: 'RED V-Raptor / Sony FX6 • Cooke Anamorphic Cine Primes • Aputure 1200d Lighting',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      popular: false,
    };
    addPackage(newPkg);
    setEditingPackageId(newId);
    showToast('Created new service package');
  };

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kamal-azam-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Backup JSON exported successfully');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const ok = importData(content);
        if (ok) {
          showToast('Data imported into draft successfully! Click Save Changes to publish.');
        } else {
          alert('Failed to parse backup JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#090a0d] text-white flex flex-col font-sans selection:bg-[#a855f7] selection:text-white pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-5 left-1/2 z-50 px-5 py-2.5 rounded-full bg-[#1e1333] border border-[#a855f7]/60 text-white text-xs font-semibold shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4 text-[#c084fc]" />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar - Responsive & Firestore Backed */}
      <header className="sticky top-0 z-40 bg-[#111216]/95 backdrop-blur-xl border-b border-white/10 px-3 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center space-x-3">
          <img
            src="/kamal-azam-logo.png"
            alt="Kamal Azam"
            className="h-7 sm:h-8 w-auto object-contain brightness-110"
          />
          <div className="h-5 w-[1px] bg-white/15 hidden sm:block" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold uppercase tracking-wider text-xs sm:text-sm font-display text-white">
                Studio CMS Editor
              </span>
              {/* Cloud Sync & Dirty Status Badge */}
              {hasUnsavedChanges ? (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10px] sm:text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Unsaved Changes</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-[11px] font-mono">
                  <Cloud className="w-3 h-3 text-emerald-400" />
                  <span>Firestore Synced</span>
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-400">
              Changes persist across all visitors, devices, and browsers upon saving
            </p>
          </div>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Revert / Cancel Button */}
          {hasUnsavedChanges && (
            <button
              onClick={handleRevert}
              title="Discard unsaved changes and reload from Firestore"
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discard</span>
            </button>
          )}

          {/* Save to Firestore Button */}
          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              hasUnsavedChanges
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-pulse'
                : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50'
            }`}
          >
            <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? 'Saving to Firestore...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}</span>
          </button>

          {/* Live Site Close Button */}
          <button
            onClick={handleSafeClose}
            className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#9333ea] to-[#a855f7] hover:brightness-110 text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </button>

          {/* Backup */}
          <button
            onClick={handleExport}
            title="Export full website JSON backup"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium flex items-center space-x-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Backup</span>
          </button>

          {/* Restore */}
          <button
            onClick={() => importFileRef.current?.click()}
            title="Import website JSON backup"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium flex items-center space-x-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Restore</span>
          </button>
          <input
            ref={importFileRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />

          {/* Reset */}
          <button
            onClick={() => {
              if (window.confirm('Reset all website data to initial default state? Remember to click Save Changes to persist to Firestore.')) {
                resetToDefaults();
                showToast('Reset to default draft. Click Save Changes to publish.');
              }
            }}
            title="Reset to default content"
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/10 hover:border-red-500/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            title="Log out of CMS Editor"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Navigation Tabs - Horizontally scrollable on mobile/tablet */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('work')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'work'
                ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>🎬 My Work & Partitions ({editingData.portfolioProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pricing'
                ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>💎 Prices & Packages ({editingData.productionPackages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>⚡ Services & Equipment ({editingData.services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('texts')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'texts'
                ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>📝 Hero & Website Texts</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: WORK PORTFOLIO, PARTITIONS & MEDIA MANAGEMENT                       */}
        {/* ========================================================================= */}
        {activeTab === 'work' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Category Partition Header & Management Bar */}
            <div className="bg-[#131418] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-[#a855f7]" />
                    <span>Work Partitions & Media Sections</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload videos and high-res photos into separate partitions, create new custom partitions, or edit existing ones.
                  </p>
                </div>

                {/* Partition Actions & Media Creation Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setNewPartitionInput('');
                      setIsAddPartitionOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all border border-white/15 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>+ New Partition</span>
                  </button>

                  <button
                    onClick={handleCreateVideoProject}
                    className="px-3.5 py-2 rounded-xl bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>+ Add Video</span>
                  </button>

                  <button
                    onClick={handleCreatePhotoProject}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>+ Add Photo / Stills</span>
                  </button>
                </div>
              </div>

              {/* Partition Pills Bar with Rename and Delete */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
                {allPartitions.map((cat) => {
                  const count = editingData.portfolioProjects.filter((p) => p.category === cat).length;
                  const isSel = currentCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs uppercase font-medium tracking-wider flex items-center space-x-2 whitespace-nowrap transition-all cursor-pointer border ${
                        isSel
                          ? 'bg-[#a855f7] text-white border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                          isSel ? 'bg-white/25 text-white' : 'bg-white/10 text-neutral-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Partition Controls Toolbar */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-neutral-400">
                  <span className="font-mono text-white font-semibold">{currentCategory}</span>
                  <span>• {filteredProjects.length} project(s)</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setRenamePartitionInput(currentCategory);
                      setIsRenamePartitionOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium border border-white/10 flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>Rename Partition</span>
                  </button>

                  <button
                    onClick={handleDeleteCurrentPartition}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 text-xs font-medium border border-white/10 hover:border-red-500/30 flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Partition</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid for Selected Partition */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#131418] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#a855f7]/50 shadow-md group"
                >
                  {/* Thumbnail / Media Preview */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Media Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-mono uppercase text-white backdrop-blur-md">
                      {project.mediaType === 'image' ? (
                        <>
                          <Camera className="w-3 h-3 text-emerald-400" />
                          <span>Photo</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3 text-[#c084fc]" />
                          <span>Video ({project.duration || '0:45'})</span>
                        </>
                      )}
                    </div>

                    {/* Featured Star */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#9333ea] text-[10px] font-semibold uppercase tracking-wider text-white">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-1">
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        onClick={() =>
                          setEditingProjectId(editingProjectId === project.id ? null : project.id)
                        }
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c084fc] hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{editingProjectId === project.id ? 'Close' : 'Edit Media'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${project.title}"?`)) {
                            deleteProject(project.id);
                            showToast('Project deleted');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Project Editor Drawer */}
                  {editingProjectId === project.id && (
                    <div className="p-5 bg-[#181920] border-t border-white/15 space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-[#c084fc] font-semibold">
                          Edit Project Properties
                        </span>
                        <button
                          onClick={() => setEditingProjectId(null)}
                          className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                        >
                          Done
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-neutral-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, { title: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-neutral-400 mb-1">Client</label>
                            <input
                              type="text"
                              value={project.client}
                              onChange={(e) => updateProject(project.id, { client: e.target.value })}
                              className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                            />
                          </div>
                          <div>
                            <label className="block text-neutral-400 mb-1">Year</label>
                            <input
                              type="text"
                              value={project.year}
                              onChange={(e) => updateProject(project.id, { year: e.target.value })}
                              className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Partition / Category</label>
                          <select
                            value={project.category}
                            onChange={(e) => updateProject(project.id, { category: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                          >
                            {allPartitions.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">
                            {project.mediaType === 'image' ? 'High-Res Image URL' : 'Video Stream / Embed URL'}
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={project.mediaType === 'image' ? project.imageUrl || '' : project.videoUrl || ''}
                              onChange={(e) =>
                                updateProject(
                                  project.id,
                                  project.mediaType === 'image'
                                    ? { imageUrl: e.target.value }
                                    : { videoUrl: e.target.value }
                                )
                              }
                              placeholder="https://..."
                              className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                            />
                            <label className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer" title="Upload Media File">
                              <Upload className="w-4 h-4" />
                              <input
                                type="file"
                                accept={project.mediaType === 'image' ? 'image/*' : 'video/*'}
                                onChange={(e) =>
                                  project.mediaType === 'image'
                                    ? handleImageUpload(e, (url) => updateProject(project.id, { imageUrl: url, thumbnail: url }))
                                    : handleFileUpload(e, (url) => updateProject(project.id, { videoUrl: url }))
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Thumbnail Poster URL</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={project.thumbnail}
                              onChange={(e) => updateProject(project.id, { thumbnail: e.target.value })}
                              className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                            />
                            <label className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer" title="Upload Thumbnail">
                              <ImageIcon className="w-4 h-4" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) => updateProject(project.id, { thumbnail: url }))
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Description / Campaign Notes</label>
                          <textarea
                            rows={2}
                            value={project.description}
                            onChange={(e) => updateProject(project.id, { description: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                          />
                        </div>

                        <div className="flex items-center space-x-4 pt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={project.featured || false}
                              onChange={(e) => updateProject(project.id, { featured: e.target.checked })}
                              className="rounded accent-[#a855f7]"
                            />
                            <span className="text-white">Featured on Homepage</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 bg-[#131418] border border-white/10 rounded-2xl p-8">
                <Film className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white font-mono uppercase">
                  No projects in &ldquo;{currentCategory}&rdquo; yet
                </h4>
                <p className="text-xs text-neutral-400 mt-1 mb-4">
                  Add a new commercial video, documentary, or photography project to this partition.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={handleCreateVideoProject}
                    className="px-4 py-2 rounded-xl bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-semibold cursor-pointer"
                  >
                    + Add Video Project
                  </button>
                  <button
                    onClick={handleCreatePhotoProject}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    + Add Photo Project
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTION PACKAGES & PRICING                                      */}
        {/* ========================================================================= */}
        {activeTab === 'pricing' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-[#131418] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-[#a855f7]" />
                  <span>Production Packages & Pricing Tier Management</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Edit transparent service rates, turnaround metrics, camera specs, and deliverables.
                </p>
              </div>
              <button
                onClick={handleCreatePackage}
                className="px-4 py-2.5 rounded-xl bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editingData.productionPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#131418] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md group hover:border-[#a855f7]/50 transition-all"
                >
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#9333ea]/20 border border-[#a855f7]/30 text-[#c084fc] text-[10px] font-mono uppercase">
                          {pkg.category}
                        </span>
                        {pkg.popular && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-semibold uppercase">
                            Most Requested
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{pkg.name}</h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{pkg.tagline}</p>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline space-x-2">
                        <span className="text-2xl font-bold font-mono text-white">{pkg.pricing}</span>
                        <span className="text-xs text-neutral-400 font-mono">/ {pkg.ratePeriod || 'turnkey'}</span>
                      </div>

                      <div className="mt-3 space-y-1 text-xs text-neutral-300 font-mono">
                        <div className="text-neutral-400">⏱ Turnaround: {pkg.turnaround}</div>
                        <div className="text-neutral-400 text-[11px] line-clamp-2">🎥 {pkg.specs}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        onClick={() =>
                          setEditingPackageId(editingPackageId === pkg.id ? null : pkg.id)
                        }
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c084fc] hover:text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{editingPackageId === pkg.id ? 'Close' : 'Edit Tier'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete package "${pkg.name}"?`)) {
                            deletePackage(pkg.id);
                            showToast('Package removed');
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Package Editor */}
                  {editingPackageId === pkg.id && (
                    <div className="p-5 bg-[#181920] border-t border-white/15 space-y-3 text-xs animate-fadeIn">
                      <div>
                        <label className="block text-neutral-400 mb-1">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => updatePackage(pkg.id, { name: e.target.value })}
                          className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-neutral-400 mb-1">Price</label>
                          <input
                            type="text"
                            value={pkg.pricing}
                            onChange={(e) => updatePackage(pkg.id, { pricing: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-400 mb-1">Turnaround</label>
                          <input
                            type="text"
                            value={pkg.turnaround}
                            onChange={(e) => updatePackage(pkg.id, { turnaround: e.target.value })}
                            className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={pkg.tagline}
                          onChange={(e) => updatePackage(pkg.id, { tagline: e.target.value })}
                          className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1">Camera & Lighting Specs</label>
                        <textarea
                          rows={2}
                          value={pkg.specs}
                          onChange={(e) => updatePackage(pkg.id, { specs: e.target.value })}
                          className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-white focus:outline-none focus:border-[#a855f7]"
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pkg.popular || false}
                            onChange={(e) => updatePackage(pkg.id, { popular: e.target.checked })}
                            className="rounded accent-[#a855f7]"
                          />
                          <span className="text-white">Mark as Most Popular Badge</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SERVICES & STUDIO EQUIPMENT                                        */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* Core Services Section */}
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono mb-4 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#a855f7]" />
                <span>Production Disciplines & Services</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editingData.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-[#131418] border border-white/10 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-[#c084fc] font-bold">
                        Service ID: {service.id}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Service Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, { title: e.target.value })}
                        className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Short Summary</label>
                      <textarea
                        rows={2}
                        value={service.shortDesc}
                        onChange={(e) => updateService(service.id, { shortDesc: e.target.value })}
                        className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Background Image URL</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={service.bgImage}
                          onChange={(e) => updateService(service.id, { bgImage: e.target.value })}
                          className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                        />
                        <label className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer" title="Upload Service Background">
                          <ImageIcon className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(e, (url) => updateService(service.id, { bgImage: url }))
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Equipment Section */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-[#a855f7]" />
                  <span>Cinema Equipment & Studio Rigs ({editingData.studioEquipment.length})</span>
                </h3>
                <button
                  onClick={() => {
                    const newEq: EquipmentItem = {
                      id: `eq-${Date.now()}`,
                      name: 'Cinema Camera Rig',
                      category: 'Cameras',
                      specs: 'Full-frame 8K / 4K RAW Cinema Package',
                      image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
                    };
                    addEquipment(newEq);
                    showToast('Added equipment item');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Gear</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editingData.studioEquipment.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#131418] border border-white/10 rounded-xl p-4 space-y-2 relative"
                  >
                    <button
                      onClick={() => {
                        deleteEquipment(item.id);
                        showToast('Equipment removed');
                      }}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono">Item Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateEquipment(item.id, { name: e.target.value })}
                        className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono">Category & Specs</label>
                      <input
                        type="text"
                        value={item.specs}
                        onChange={(e) => updateEquipment(item.id, { specs: e.target.value })}
                        className="w-full bg-[#0d0e12] border border-white/15 rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: HERO HEADLINES, CONTACT & TEXTS                                    */}
        {/* ========================================================================= */}
        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div className="bg-[#131418] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
              <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono flex items-center space-x-2">
                <Type className="w-4 h-4 text-[#a855f7]" />
                <span>Hero Presentation & Media Links</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    Creator Name
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.name}
                    onChange={(e) => updateHeroData({ name: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    Role & Title
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.role}
                    onChange={(e) => updateHeroData({ role: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                  Primary Headline / Tagline
                </label>
                <input
                  type="text"
                  value={editingData.heroData.tagline}
                  onChange={(e) => updateHeroData({ tagline: e.target.value })}
                  className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                  Sub-Tagline Narrative
                </label>
                <textarea
                  rows={3}
                  value={editingData.heroData.subtagline}
                  onChange={(e) => updateHeroData({ subtagline: e.target.value })}
                  className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    Phone / Quick Dial
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.phone}
                    onChange={(e) => updateHeroData({ phone: e.target.value, phoneDisplay: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    WhatsApp Chat URL
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.whatsappUrl}
                    onChange={(e) => updateHeroData({ whatsappUrl: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    Background Video (WebM)
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.videoWebm}
                    onChange={(e) => updateHeroData({ videoWebm: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                    Background Video (MP4)
                  </label>
                  <input
                    type="text"
                    value={editingData.heroData.videoMp4}
                    onChange={(e) => updateHeroData({ videoMp4: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-300 mb-1">
                  Hero Poster URL (Shown before video loads)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editingData.heroData.posterUrl}
                    onChange={(e) => updateHeroData({ posterUrl: e.target.value })}
                    className="w-full bg-[#0d0e12] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                  <label className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white cursor-pointer" title="Upload Hero Poster">
                    <ImageIcon className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (url) => updateHeroData({ posterUrl: url }))}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-[#131418] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono">
                  Frequently Asked Questions ({editingData.faqs.length})
                </h3>
                <button
                  onClick={() => {
                    addFaq({
                      question: 'What is your typical production timeline?',
                      answer: 'Most commercial campaigns deliver within 5 to 10 business days following principal photography.',
                    });
                    showToast('Added FAQ item');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  + Add FAQ
                </button>
              </div>

              <div className="space-y-3">
                {editingData.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#0d0e12] border border-white/15 rounded-xl p-4 space-y-2 relative">
                    <button
                      onClick={() => {
                        deleteFaq(idx);
                        showToast('FAQ deleted');
                      }}
                      className="absolute top-3 right-3 text-neutral-500 hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, { question: e.target.value })}
                        className="w-full bg-[#141518] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono">Answer</label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, { answer: e.target.value })}
                        className="w-full bg-[#141518] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#a855f7]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW PARTITION                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAddPartitionOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#16171c] border border-white/20 rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAddPartitionOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[#a855f7] mb-2">
                <FolderOpen className="w-5 h-5" />
                <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono">
                  Create Work Partition
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Enter a category name for your media section (e.g. &ldquo;Automotive&rdquo;, &ldquo;Fashion Films&rdquo;, &ldquo;Music Videos&rdquo;).
              </p>

              <form onSubmit={handleAddPartitionSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    Partition Name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. Music Videos"
                    value={newPartitionInput}
                    onChange={(e) => setNewPartitionInput(e.target.value)}
                    className="w-full bg-[#0a0b0d] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddPartitionOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
                  >
                    Add Partition
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: RENAME PARTITION                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isRenamePartitionOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#16171c] border border-white/20 rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsRenamePartitionOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[#a855f7] mb-2">
                <Edit3 className="w-5 h-5" />
                <h3 className="text-base font-bold uppercase tracking-wider text-white font-mono">
                  Rename Partition
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Renaming will automatically update all projects assigned to this category.
              </p>

              <form onSubmit={handleRenamePartitionSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    New Partition Name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={renamePartitionInput}
                    onChange={(e) => setRenamePartitionInput(e.target.value)}
                    className="w-full bg-[#0a0b0d] border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRenamePartitionOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#9333ea] hover:bg-[#a855f7] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
