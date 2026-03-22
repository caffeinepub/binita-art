import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ExternalBlob, PaintingInfo } from "../backend.d";
import { useAuth } from "../contexts/AuthContext";
import {
  uploadImageAsBlob,
  useAddPainting,
  useGetPainting,
  useUpdatePainting,
} from "../hooks/useQueries";
import { AdminLoginPage } from "./AdminLoginPage";

interface FormFields {
  title: string;
  priceUSD: string;
  dimensions: string;
  material: string;
  description: string;
}

interface PaintingFormPageProps {
  mode: "new" | "edit";
}

export function PaintingFormPage({ mode }: PaintingFormPageProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { id?: string };
  const paintingId = params.id ? BigInt(params.id) : null;

  const { data: existing } = useGetPainting(
    mode === "edit" ? paintingId : null,
  );
  const addMutation = useAddPainting();
  const updateMutation = useUpdatePainting();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormFields>({
    title: "",
    priceUSD: "",
    dimensions: "",
    material: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if (mode === "edit" && existing) {
      setFormData({
        title: existing.title,
        priceUSD: existing.priceUSD.toString(),
        dimensions: existing.dimensions,
        material: existing.material,
        description: existing.description,
      });
      setImagePreview(existing.image.getDirectURL());
    }
  }, [existing, mode]);

  // Guard: redirect to admin login if not authenticated
  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const buildInfo = async (): Promise<PaintingInfo> => {
    let image: ExternalBlob;
    if (imageFile) {
      const blob = await uploadImageAsBlob(imageFile);
      image = blob.withUploadProgress((pct) => setUploadProgress(pct));
    } else if (mode === "edit" && existing) {
      image = existing.image;
    } else {
      throw new Error("No image selected");
    }

    return {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image,
      priceUSD: Number.parseFloat(formData.priceUSD),
      dimensions: formData.dimensions.trim(),
      material: formData.material.trim(),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "new" && !imageFile) {
      toast.error("Please select a painting image");
      return;
    }
    if (mode === "edit" && !existing && !imageFile) {
      toast.error("Painting data is still loading. Please wait and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const info = await buildInfo();

      if (mode === "new") {
        await addMutation.mutateAsync(info);
        toast.success("Painting added successfully");
      } else if (paintingId !== null) {
        await updateMutation.mutateAsync({ id: paintingId, info });
        toast.success("Painting updated successfully");
      }

      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save painting. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const set =
    (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const submitLabel = () => {
    if (isSubmitting && uploadProgress > 0 && uploadProgress < 100) {
      return `Uploading ${uploadProgress}%…`;
    }
    if (isSubmitting) return "Saving…";
    return mode === "new" ? "Add Painting" : "Save Changes";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="font-body text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            data-ocid="painting_form.back.button"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <div className="w-px h-4 bg-border" />
          <h1 className="font-display text-lg tracking-widest uppercase text-foreground">
            {mode === "new" ? "Add New Painting" : "Edit Painting"}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Painting Image
            </p>
            <button
              type="button"
              className="w-full border border-dashed border-border aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors relative overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="painting_form.dropzone"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center px-6">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="font-body text-sm text-muted-foreground">
                    Click to upload image
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP · Max 10MB
                  </p>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              data-ocid="painting_form.upload_button"
            />
            {imageFile && (
              <p className="font-body text-xs text-muted-foreground mt-2 truncate">
                {imageFile.name}
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label
                htmlFor="title"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
              >
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={set("title")}
                placeholder="e.g. Lotus at Twilight"
                required
                className="rounded-none border-border bg-card font-body text-sm"
                data-ocid="painting_form.title.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="price"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
              >
                Rate (₹)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.priceUSD}
                onChange={set("priceUSD")}
                placeholder="e.g. 1800"
                required
                className="rounded-none border-border bg-card font-body text-sm"
                data-ocid="painting_form.price.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="dimensions"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
              >
                Dimensions
              </Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={set("dimensions")}
                placeholder='e.g. 24" × 36"'
                required
                className="rounded-none border-border bg-card font-body text-sm"
                data-ocid="painting_form.dimensions.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="material"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
              >
                Material Used
              </Label>
              <Input
                id="material"
                value={formData.material}
                onChange={set("material")}
                placeholder="e.g. Oil on Canvas"
                required
                className="rounded-none border-border bg-card font-body text-sm"
                data-ocid="painting_form.material.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={set("description")}
                placeholder="Describe the artwork, its inspiration, and technique…"
                rows={5}
                required
                className="rounded-none border-border bg-card font-body text-sm resize-none"
                data-ocid="painting_form.description.textarea"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-body text-xs tracking-widest uppercase py-3.5 bg-foreground text-background hover:bg-foreground/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              data-ocid="painting_form.submit_button"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {submitLabel()}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
