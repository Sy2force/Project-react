import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Trash2, 
  Shield, 
  User, 
  Briefcase,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const {
    users,
    stats,
    loading,
    pagination,
    fetchUsers,
    updateUserRole,
    deleteUser,
    fetchStats,
    searchUsers,
    changePage
  } = useAdmin();

  // État local pour les filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Charger les données au montage
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
      fetchStats();
    }
  }, [user, fetchUsers, fetchStats]);

  // Redirection si pas admin
  if (!user || user.role !== 'admin') {
    return (
      <PageWrapper 
        title="Accès Refusé - Dashboard Admin | Shay Acoca Portfolio" 
        description="Accès administrateur requis pour cette page. Droits insuffisants."
      >
        <div className="min-h-screen flex items-center justify-center">
          <GlassCard className="text-center p-12">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-sora font-bold text-white mb-2">
              Accès Refusé
            </h1>
            <p className="text-white/70">
              Vous devez être administrateur pour accéder à cette page.
            </p>
          </GlassCard>
        </div>
      </PageWrapper>
    );
  }

  // Gestion de la recherche
  const handleSearch = async (e) => {
    e.preventDefault();
    await searchUsers(searchTerm, { role: roleFilter });
  };

  // Gestion du changement de rôle
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
    } catch (error) {
      // Erreur déjà gérée dans le hook avec toast
    }
  };

  // Gestion de la suppression avec confirmation
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setShowDeleteConfirm(null);
    } catch (error) {
      // Erreur déjà gérée dans le hook avec toast
    }
  };

  // Formatage des dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Icône par rôle
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-400" />;
      case 'business': return <Briefcase className="w-4 h-4 text-blue-400" />;
      default: return <User className="w-4 h-4 text-green-400" />;
    }
  };

  // Badge de rôle
  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-red-500/20 text-red-300 border-red-500/30',
      business: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      user: 'bg-green-500/20 text-green-300 border-green-500/30'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${colors[role]}`}>
        {getRoleIcon(role)}
        {role}
      </span>
    );
  };

  return (
    <PageWrapper 
      title="Dashboard Admin - Gestion Utilisateurs" 
      description="Interface d'administration pour la gestion des utilisateurs"
    >
      <div className="space-y-8">
        {/* En-tête avec statistiques */}
        <SectionHeader
          title="Dashboard Administrateur"
          subtitle="Gestion des utilisateurs et statistiques"
        />

        {/* Statistiques */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Utilisateurs</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Utilisateurs</p>
                  <p className="text-2xl font-bold text-white">{stats.roleStats.user}</p>
                </div>
                <User className="w-8 h-8 text-green-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Business</p>
                  <p className="text-2xl font-bold text-white">{stats.roleStats.business}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-400" />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Admins</p>
                  <p className="text-2xl font-bold text-white">{stats.roleStats.admin}</p>
                </div>
                <Shield className="w-8 h-8 text-red-400" />
              </div>
            </GlassCard>
          </div>
        )}

        {/* Filtres et recherche */}
        <GlassCard className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-11 px-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="">Tous les rôles</option>
              <option value="user">Utilisateur</option>
              <option value="business">Business</option>
              <option value="admin">Admin</option>
            </select>

            <Button type="submit" disabled={loading}>
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </form>
        </GlassCard>

        {/* Table des utilisateurs */}
        <GlassCard className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-sora font-semibold text-white">
              Utilisateurs ({pagination.totalItems})
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white/70">Chargement...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Aucun utilisateur trouvé</p>
            </div>
          ) : (
            <>
              {/* Table responsive */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Créé le
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Dernière connexion
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {users.map((userData) => (
                      <tr key={userData._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white line-clamp-1">
                              {userData.name}
                            </div>
                            <div className="text-sm text-white/70 line-clamp-1">
                              {userData.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {userData.role === 'admin' ? (
                            getRoleBadge(userData.role)
                          ) : (
                            <select
                              value={userData.role}
                              onChange={(e) => handleRoleChange(userData._id, e.target.value)}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500/50"
                            >
                              <option value="user">user</option>
                              <option value="business">business</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(userData.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(userData.lastLogin)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowDeleteConfirm(userData._id)}
                              disabled={userData.role === 'admin'}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title={userData.role === 'admin' ? 'Impossible de supprimer un admin' : 'Supprimer l\'utilisateur'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-sm text-white/70">
                    Page {pagination.currentPage} sur {pagination.totalPages} 
                    ({pagination.totalItems} utilisateurs)
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changePage(pagination.currentPage - 1, { search: searchTerm, role: roleFilter })}
                      disabled={!pagination.hasPrevPage}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-sm text-white">
                      {pagination.currentPage}
                    </span>
                    
                    <button
                      onClick={() => changePage(pagination.currentPage + 1, { search: searchTerm, role: roleFilter })}
                      disabled={!pagination.hasNextPage}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </GlassCard>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-6 max-w-md w-full"
          >
            <div className="text-center">
              <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-sora font-semibold text-white mb-2">
                Confirmer la suppression
              </h3>
              <p className="text-white/70 mb-6">
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="flex-1"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PageWrapper>
  );
};

export default AdminDashboard;
