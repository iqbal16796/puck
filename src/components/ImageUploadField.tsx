"use client";
import React, { useRef, useState } from "react";
import { Upload, Link, X, Loader2, ImageIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function ImageUploadField({ value, onChange, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"preview" | "url">("preview");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Upload failed");
      }

      onChange(json.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Preview */}
      {value && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Drop zone / upload button */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative w-full rounded-lg border-2 border-dashed border-zinc-300 hover:border-zinc-400 transition-colors bg-zinc-50 hover:bg-zinc-100 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-center">
          {uploading ? (
            <>
              <Loader2 size={20} className="text-zinc-400 animate-spin" />
              <span className="text-xs text-zinc-500">Uploading…</span>
            </>
          ) : (
            <>
              <Upload size={18} className="text-zinc-400" />
              <span className="text-xs font-medium text-zinc-600">
                Click or drag to upload
              </span>
              <span className="text-[10px] text-zinc-400">PNG, JPG, WebP — max 5 MB</span>
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* URL toggle */}
      <button
        type="button"
        onClick={() => setMode(mode === "url" ? "preview" : "url")}
        className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-700 transition-colors self-start"
      >
        <Link size={11} />
        {mode === "url" ? "Hide URL input" : "Or paste a URL"}
      </button>

      {mode === "url" && (
        <div className="flex gap-1.5 items-center">
          <ImageIcon size={13} className="text-zinc-400 shrink-0" />
          <input
            id={id}
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full text-xs border border-zinc-200 rounded px-2 py-1.5 outline-none focus:border-zinc-400 bg-white"
          />
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1">
          <X size={11} /> {error}
        </p>
      )}
    </div>
  );
}
