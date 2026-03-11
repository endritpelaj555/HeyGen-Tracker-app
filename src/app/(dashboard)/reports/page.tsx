'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { Header } from '@/components/layout/Header';
import { MetricCard, MetricCardGrid } from '@/components/ui/MetricCard';
import { LineChartComponent } from '@/components/ui/Chart';
import {
  mockTwitterMetrics,
  mockLinkedInMetrics,
  mockHeyGenMetrics,
} from '@/lib/data';

interface Report {
  id: string;
  name: string;
  type: 'weekly' | 'monthly';
  period: string;
  createdAt: string;
}

const generateReports = (): Report[] => {
  const reports: Report[] = [];
  const now = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 7);

    reports.push({
      id: `weekly-${i}`,
      name: `Weekly Report - Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      type: 'weekly',
      period: date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      createdAt: date.toISOString(),
    });
  }

  for (let i = 0; i < 3; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    reports.push({
      id: `monthly-${i}`,
      name: `Monthly Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      type: 'monthly',
      period: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      createdAt: date.toISOString(),
    });
  }

  return reports;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(generateReports());
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'weekly' | 'monthly'>('all');

  const filteredReports =
    filterType === 'all'
      ? reports
      : reports.filter((r) => r.type === filterType);

  const exportToPDF = async (report: Report) => {
    try {
      toast.loading('Generating PDF...');

      const canvas = await html2canvas(document.body, {
        allowTaint: true,
        backgroundColor: '#0A0A0F',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${report.name}.pdf`);

      toast.dismiss();
      toast.success('PDF exported successfully');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to export PDF');
    }
  };

  const exportToCSV = (report: Report) => {
    try {
      // Prepare data
      const data: (string | number)[][] = [
        ['Report Name', report.name],
        ['Type', report.type],
        ['Period', report.period],
        ['Generated', new Date().toLocaleDateString()],
        [],
        ['Platform', 'Metric', 'Value'],
      ];

      // Add Twitter metrics
      const latestTwitter = mockTwitterMetrics[mockTwitterMetrics.length - 1];
      data.push(
        ['Twitter', 'Followers', latestTwitter.followers] as (string | number)[],
        ['Twitter', 'Impressions', latestTwitter.impressions] as (string | number)[],
        ['Twitter', 'Engagement Rate', latestTwitter.engagementRate] as (string | number)[],
        ['Twitter', 'Video Views', latestTwitter.videoViews] as (string | number)[]
      );

      // Add LinkedIn metrics
      const latestLinkedIn = mockLinkedInMetrics[mockLinkedInMetrics.length - 1];
      data.push(
        ['LinkedIn', 'Followers', latestLinkedIn.followers] as (string | number)[],
        ['LinkedIn', 'Page Views', latestLinkedIn.pageViews] as (string | number)[],
        ['LinkedIn', 'Engagements', latestLinkedIn.engagements] as (string | number)[],
        ['LinkedIn', 'Engagement Rate', latestLinkedIn.engagementRate] as (string | number)[]
      );

      // Add HeyGen metrics
      const latestHeyGen = mockHeyGenMetrics[mockHeyGenMetrics.length - 1];
      data.push(
        ['HeyGen', 'Video Views', latestHeyGen.videoViews] as (string | number)[],
        ['HeyGen', 'Avatar Views', latestHeyGen.avatarViews] as (string | number)[],
        ['HeyGen', 'Video Engagements', latestHeyGen.videoEngagements] as (string | number)[]
      );

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');

      // Download
      XLSX.writeFile(wb, `${report.name}.xlsx`);
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  const getChartData = (days: number) => {
    let data: any[] = [];
    if (selectedReport?.type === 'weekly') {
      data = mockTwitterMetrics.slice(-7);
    } else {
      data = mockTwitterMetrics.slice(-30);
    }

    return data.map((m: any) => ({
      date: new Date(m.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      ...m,
    }));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        title="Reports"
        subtitle="Generate and export comprehensive reports"
        showDatePicker
      />

      <div className="flex-1 overflow-auto bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
        <div className="p-6 max-w-6xl mx-auto">
          {!selectedReport ? (
            <>
              {/* Filter section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <Filter className="w-5 h-5 text-heygen-teal" />
                <div className="flex gap-2">
                  {(['all', 'weekly', 'monthly'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                        filterType === type
                          ? 'bg-heygen-teal text-heygen-dark'
                          : 'bg-heygen-dark-3 text-heygen-gray hover:text-heygen-white'
                      }`}
                    >
                      {type === 'all' ? 'All Reports' : `${type} Reports`}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Reports grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <FileText className="w-12 h-12 text-heygen-gray mx-auto mb-4 opacity-50" />
                    <p className="text-heygen-gray mb-2">No reports found</p>
                  </motion.div>
                ) : (
                  filteredReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedReport(report)}
                      className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 hover:border-heygen-teal cursor-pointer transition-all hover:shadow-heygen-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="w-8 h-8 text-heygen-teal" />
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.type === 'weekly'
                              ? 'bg-heygen-purple/10 text-heygen-purple'
                              : 'bg-heygen-teal/10 text-heygen-teal'
                          }`}
                        >
                          {report.type === 'weekly' ? 'Weekly' : 'Monthly'}
                        </span>
                      </div>

                      <h3 className="font-semibold text-heygen-white mb-2">
                        {report.name}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-heygen-gray mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{report.period}</span>
                      </div>

                      <p className="text-xs text-heygen-gray mb-4">
                        Created{' '}
                        {new Date(report.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>

                      <p className="text-sm text-heygen-teal hover:text-heygen-teal/80 transition-colors">
                        View Details
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              {/* Report detail view */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-heygen-white mb-2">
                      {selectedReport.name}
                    </h1>
                    <p className="text-heygen-gray">
                      Period: {selectedReport.period}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => exportToCSV(selectedReport)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5 text-heygen-teal hover:bg-heygen-dark-4 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Export CSV
                    </button>
                    <button
                      onClick={() => exportToPDF(selectedReport)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5 text-heygen-teal hover:bg-heygen-dark-4 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="px-4 py-2 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5 text-heygen-gray hover:text-heygen-white transition-all"
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/* Report summary */}
                <div className="mb-12">
                  <h2 className="text-lg font-semibold text-heygen-white mb-4">
                    Summary
                  </h2>
                  <MetricCardGrid columns={3}>
                    <MetricCard
                      title="Total Followers"
                      value={45000 + Math.floor(Math.random() * 5000)}
                      trend="up"
                      percentChange={2.5}
                    />
                    <MetricCard
                      title="Total Impressions"
                      value={250000 + Math.floor(Math.random() * 50000)}
                      trend="up"
                      percentChange={3.2}
                    />
                    <MetricCard
                      title="Avg Engagement Rate"
                      value={3.2}
                      unit="%"
                      trend="up"
                      percentChange={1.5}
                    />
                  </MetricCardGrid>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
                  >
                    <LineChartComponent
                      data={getChartData(
                        selectedReport.type === 'weekly' ? 7 : 30
                      )}
                      dataKeys={[
                        {
                          key: 'followers',
                          name: 'Followers',
                          color: '#00C2B2',
                        },
                      ]}
                      height={300}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
                  >
                    <LineChartComponent
                      data={getChartData(
                        selectedReport.type === 'weekly' ? 7 : 30
                      )}
                      dataKeys={[
                        {
                          key: 'impressions',
                          name: 'Impressions',
                          color: '#7C3AED',
                        },
                      ]}
                      height={300}
                    />
                  </motion.div>
                </div>

                {/* Platform breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
                >
                  <h3 className="text-lg font-semibold text-heygen-white mb-4">
                    Platform Performance
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Twitter */}
                    <div>
                      <h4 className="font-semibold text-heygen-white mb-3">
                        X (Twitter)
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Followers</span>
                          <span className="text-heygen-white font-medium">
                            45,234
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Impressions</span>
                          <span className="text-heygen-white font-medium">
                            250,432
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Engagement</span>
                          <span className="text-heygen-white font-medium">
                            2.8%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <h4 className="font-semibold text-heygen-white mb-3">
                        LinkedIn
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Followers</span>
                          <span className="text-heygen-white font-medium">
                            28,456
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Impressions</span>
                          <span className="text-heygen-white font-medium">
                            175,234
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Engagement</span>
                          <span className="text-heygen-white font-medium">
                            4.2%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* HeyGen */}
                    <div>
                      <h4 className="font-semibold text-heygen-white mb-3">
                        HeyGen
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Video Views</span>
                          <span className="text-heygen-white font-medium">
                            320,456
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Avatar Views</span>
                          <span className="text-heygen-white font-medium">
                            215,234
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-heygen-gray">Engagements</span>
                          <span className="text-heygen-white font-medium">
                            12,534
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
