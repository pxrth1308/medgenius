"use client";
import { useState } from "react";
import Link from "next/link";

export default function ReportUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/report-analysis", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data.summary || "No response.");
    setPreviewUrl(URL.createObjectURL(file));
    setLoading(false);
  };

  const summaryLines = summary.split("\n").filter(Boolean);
  const quickFlags = summaryLines.slice(0, 2);
  const details = summaryLines.slice(2);

  return (
    <div className="min-h-screen bg-[#f3fbf6] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">🧾 Medical Report Analysis</h1>
          <Link
            href="/dashboard"
            className="text-sm text-green-600 hover:underline font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Upload Card */}
        <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload your report (.pdf, .png, .jpg):
            </label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
                if (selected) setPreviewUrl(URL.createObjectURL(selected));
              }}
              required
              className="w-full border border-gray-300 rounded-lg text-sm px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full sm:w-fit px-6 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Analyzing..." : "Analyze Report"}
            </button>
          </form>

          {previewUrl && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-600 mb-1">Report Preview</h2>
              <div className="border rounded-md overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Uploaded Report"
                  className="w-full max-h-[600px] object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary and Findings */}
        {summary && (
          <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                ✅ Summary Overview
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-1">
                {quickFlags.map((line, idx) => (
                  <p key={idx} className="text-sm text-green-900">{line}</p>
                ))}
              </div>
            </div>

            {details.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  🔍 Detailed Findings
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {details.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Future save feature */}
            <div className="pt-4">
              <button
                disabled
                className="text-sm px-4 py-2 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
              >
                💾 Save to History (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
