import React, { useState } from "react";
import { useAgent } from "../../context/AgentContext";
import { FaBookOpen, FaTag, FaClock, FaGithub, FaRobot, FaSearch } from "react-icons/fa";

function BlogSection() {
  const { blogs } = useAgent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const allTags = ["ALL", ...new Set(blogs.flatMap((b) => b.tags || []))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "ALL" || (blog.tags && blog.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <FaRobot /> Autonomous Tech Publications
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            AI-Generated Technical Articles
          </h2>
          <p className="text-textMuted text-sm mt-1">
            Articles automatically written by the Tech Writer Agent upon analyzing GitHub diffs
          </p>
        </div>

        {/* Search & Tag Controls */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted text-xs" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-textMuted focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedTag === tag
                ? "bg-primary text-black"
                : "bg-white/5 border border-white/10 text-textMuted hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((blog) => {
          const isExpanded = expandedBlogId === blog.id;
          return (
            <div
              key={blog.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-textMuted">
                  <span className="flex items-center gap-1.5 text-primary font-mono">
                    <FaGithub /> {blog.repoName}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {blog.readTime} • {blog.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white hover:text-primary transition-colors cursor-pointer" onClick={() => setExpandedBlogId(isExpanded ? null : blog.id)}>
                  {blog.title}
                </h3>

                <p className="text-sm text-textMuted leading-relaxed">
                  {blog.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {blog.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-textMuted font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read Full Article Toggle */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setExpandedBlogId(isExpanded ? null : blog.id)}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-2"
                >
                  <FaBookOpen /> {isExpanded ? "Collapse Article" : "Read Full Article →"}
                </button>

                {isExpanded && (
                  <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-300 font-mono space-y-3 whitespace-pre-wrap animate-fade-in">
                    {blog.content}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogSection;
