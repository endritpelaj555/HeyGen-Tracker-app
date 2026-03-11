'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Header } from '@/components/layout/Header';

const metricSchema = z.object({
  platform: z.enum(['twitter', 'linkedin', 'heygen']),
  contentType: z.enum(['post', 'video', 'story', 'other']),
  date: z.string().min(1, 'Date is required'),
  title: z.string().min(1, 'Title is required'),
  likes: z.coerce.number().min(0).default(0),
  shares: z.coerce.number().min(0).default(0),
  comments: z.coerce.number().min(0).default(0),
  views: z.coerce.number().min(0).default(0),
  notes: z.string().optional(),
});

type MetricFormData = z.infer<typeof metricSchema>;

interface ManualMetric extends MetricFormData {
  id: string;
  uploadedFiles?: File[];
}

export default function ManualEntryPage() {
  const [metrics, setMetrics] = useState<ManualMetric[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAddingMetric, setIsAddingMetric] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetricFormData>({
    resolver: zodResolver(metricSchema) as any,
    defaultValues: {
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0,
    },
  });

  // File dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
      toast.success(`${acceptedFiles.length} file(s) uploaded`);
    },
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
  });

  const onSubmit = (data: MetricFormData) => {
    const newMetric: ManualMetric = {
      ...data,
      id: Date.now().toString(),
      uploadedFiles,
    };

    setMetrics((prev) => [newMetric, ...prev]);
    reset();
    setUploadedFiles([]);
    setIsAddingMetric(false);
    toast.success('Metric added successfully');
  };

  const deleteMetric = (id: string) => {
    setMetrics((prev) => prev.filter((m) => m.id !== id));
    toast.success('Metric deleted');
  };

  const exportMetrics = () => {
    const csvContent = [
      ['ID', 'Platform', 'Type', 'Date', 'Title', 'Likes', 'Shares', 'Comments', 'Views', 'Notes'].join(','),
      ...metrics.map((m) =>
        [
          m.id,
          m.platform,
          m.contentType,
          m.date,
          m.title,
          m.likes,
          m.shares,
          m.comments,
          m.views,
          m.notes || '',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manual-metrics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Metrics exported as CSV');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="Manual Data Entry"
        subtitle="Add custom metrics and upload content"
        showDatePicker
      />

      <div className="flex-1 overflow-auto bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Add new metric button */}
          {!isAddingMetric && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsAddingMetric(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-heygen-teal text-heygen-dark font-semibold hover:shadow-heygen transition-all mb-8"
            >
              <Plus className="w-5 h-5" />
              Add New Metric
            </motion.button>
          )}

          {/* Add metric form */}
          {isAddingMetric && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 mb-8"
            >
              <h2 className="text-lg font-semibold text-heygen-white mb-4">
                Add New Metric
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Platform and content type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Platform
                    </label>
                    <select
                      {...register('platform')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    >
                      <option value="twitter">X (Twitter)</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="heygen">HeyGen</option>
                    </select>
                    {errors.platform && (
                      <p className="text-heygen-red text-xs mt-1">
                        {errors.platform.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Content Type
                    </label>
                    <select
                      {...register('contentType')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    >
                      <option value="post">Post</option>
                      <option value="video">Video</option>
                      <option value="story">Story</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.contentType && (
                      <p className="text-heygen-red text-xs mt-1">
                        {errors.contentType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date and title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      {...register('date')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                    {errors.date && (
                      <p className="text-heygen-red text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Post title or description"
                      {...register('title')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                    {errors.title && (
                      <p className="text-heygen-red text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Likes
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register('likes')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Shares
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register('shares')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Comments
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register('comments')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Views
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      {...register('views')}
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-heygen-white mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Add any additional notes..."
                    {...register('notes')}
                    rows={3}
                    className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal resize-none"
                  />
                </div>

                {/* File upload */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-heygen-teal bg-heygen-teal/10'
                      : 'border-heygen-dark-5 hover:border-heygen-teal'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 text-heygen-teal mx-auto mb-2" />
                  <p className="text-heygen-white font-medium">
                    {isDragActive
                      ? 'Drop files here...'
                      : 'Drag files here or click to select'}
                  </p>
                  <p className="text-heygen-gray text-sm">
                    Images and videos supported
                  </p>
                </div>

                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-heygen-white mb-2">
                      Uploaded Files ({uploadedFiles.length})
                    </p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-heygen-teal" />
                            <span className="text-sm text-heygen-white">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedFiles((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="text-heygen-red hover:text-heygen-red/80 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-heygen-teal text-heygen-dark font-semibold hover:shadow-heygen transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Metric
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingMetric(false);
                      reset();
                      setUploadedFiles([]);
                    }}
                    className="px-4 py-2 rounded-lg border border-heygen-dark-5 text-heygen-gray hover:text-heygen-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Metrics list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-heygen-white">
                Saved Metrics ({metrics.length})
              </h2>
              {metrics.length > 0 && (
                <button
                  onClick={exportMetrics}
                  className="px-4 py-2 rounded-lg border border-heygen-dark-5 text-heygen-teal hover:bg-heygen-dark-3 transition-all text-sm font-medium"
                >
                  Export as CSV
                </button>
              )}
            </div>

            {metrics.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className="text-heygen-gray mb-4">No metrics yet</p>
                <p className="text-heygen-gray text-sm">
                  Add your first metric to get started
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 hover:border-heygen-teal transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-heygen-teal/10 text-heygen-teal">
                            {metric.platform.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-heygen-purple/10 text-heygen-purple">
                            {metric.contentType}
                          </span>
                          <span className="text-xs text-heygen-gray">
                            {metric.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-heygen-white mb-2">
                          {metric.title}
                        </h3>
                        <div className="grid grid-cols-4 gap-3 text-xs">
                          <div>
                            <span className="text-heygen-gray">Likes:</span>
                            <p className="font-semibold text-heygen-white">
                              {metric.likes.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-heygen-gray">Shares:</span>
                            <p className="font-semibold text-heygen-white">
                              {metric.shares.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-heygen-gray">Comments:</span>
                            <p className="font-semibold text-heygen-white">
                              {metric.comments.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-heygen-gray">Views:</span>
                            <p className="font-semibold text-heygen-white">
                              {metric.views.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMetric(metric.id)}
                        className="text-heygen-red hover:text-heygen-red/80 transition-colors mt-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
