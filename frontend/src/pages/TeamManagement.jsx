import { useState, useEffect } from 'react';
import { teamAPI } from '../../utils/api';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: null,
    links: { linkedin: '', instagram: '', youtube: '', facebook: '' },
    status: 'active'
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await teamAPI.getTeamMembers();
      setTeam(response.data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('status', formData.status);
    data.append('links', JSON.stringify(formData.links));
    if (formData.image) data.append('image', formData.image);

    try {
      if (editingMember) {
        await teamAPI.editTeamMember(editingMember.id, data);
      } else {
        await teamAPI.addTeamMember(data);
      }
      fetchTeam();
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      image: null,
      links: member.links || { linkedin: '', instagram: '', youtube: '', facebook: '' },
      status: member.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this team member?')) {
      try {
        await teamAPI.removeTeamMember(id);
        fetchTeam();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      image: null,
      links: { linkedin: '', instagram: '', youtube: '', facebook: '' },
      status: 'active'
    });
    setEditingMember(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 pt-30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingMember ? 'Edit' : 'Add'} Team Member
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={formData.links.linkedin}
                onChange={(e) => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
                className="p-2 border rounded"
              />
              <input
                type="url"
                placeholder="Instagram URL"
                value={formData.links.instagram}
                onChange={(e) => setFormData({ ...formData, links: { ...formData.links, instagram: e.target.value } })}
                className="p-2 border rounded"
              />
              <input
                type="url"
                placeholder="YouTube URL"
                value={formData.links.youtube}
                onChange={(e) => setFormData({ ...formData, links: { ...formData.links, youtube: e.target.value } })}
                className="p-2 border rounded"
              />
              <input
                type="url"
                placeholder="Facebook URL"
                value={formData.links.facebook}
                onChange={(e) => setFormData({ ...formData, links: { ...formData.links, facebook: e.target.value } })}
                className="p-2 border rounded"
              />
            </div>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {editingMember ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded-lg shadow">
            {member.image && (
              <img
                src={`http://localhost:5000${member.image.url}`}
                alt={member.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.position}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {member.status}</p>

            {member.links && (
              <div className="flex gap-2 mb-4">
                {member.links.linkedin && (
                  <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    LinkedIn
                  </a>
                )}
                {member.links.instagram && (
                  <a href={member.links.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                    Instagram
                  </a>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;