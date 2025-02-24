import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Briefcase, User, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Interview } from '../types';
import { format } from 'date-fns';

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    candidate_name: '',
    candidate_email: '',
    domain: 'frontend',
    tech_stack: '',
    scheduled_at: '',
  });

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .order('scheduled_at', { ascending: true });

    if (error) {
      console.error('Error fetching interviews:', error);
      return;
    }

    setInterviews(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('interviews')
      .insert([formData])
      .select()
      .single();

    if (error) {
      console.error('Error creating interview:', error);
      return;
    }

    setInterviews([...interviews, data]);
    setShowModal(false);
    setFormData({
      candidate_name: '',
      candidate_email: '',
      domain: 'frontend',
      tech_stack: '',
      scheduled_at: '',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interviews</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Schedule Interview
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {interviews.length === 0 ? (
          <div className="p-6">
            <p className="text-gray-600 text-center">No interviews scheduled</p>
          </div>
        ) : (
          <div className="divide-y">
            {interviews.map((interview) => (
              <div key={interview.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {interview.candidate_name}
                    </h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-1" />
                        {interview.candidate_email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {interview.domain} - {interview.tech_stack}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(interview.scheduled_at), 'PPP')}
                        <Clock className="h-4 w-4 ml-2 mr-1" />
                        {format(new Date(interview.scheduled_at), 'p')}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    interview.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Schedule New Interview</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.candidate_name}
                  onChange={(e) => setFormData({ ...formData, candidate_name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.candidate_email}
                  onChange={(e) => setFormData({ ...formData, candidate_email: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain
                </label>
                <select
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="finance">Finance</option>
                  <option value="hr">HR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack
                </label>
                <input
                  type="text"
                  required
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="e.g., React, Node.js"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;