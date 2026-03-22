import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";

interface PaintingDetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  priceUSD: number;
  dimensions: string;
  material: string;
  description: string;
}

export function PaintingDetailModal({
  open,
  onClose,
  title,
  imageUrl,
  priceUSD,
  dimensions,
  material,
  description,
}: PaintingDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden bg-card"
        data-ocid="painting.detail.dialog"
      >
        {/* Back button row */}
        <div className="px-5 pt-4 pb-0">
          <button
            type="button"
            onClick={onClose}
            data-ocid="painting.detail.back_button"
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image — reduced frame */}
          <div
            className="bg-muted mx-5 mb-5 md:mx-5 md:my-5 rounded overflow-hidden"
            style={{ maxHeight: 340 }}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{ maxHeight: 340 }}
            />
          </div>

          <div className="px-6 pb-6 pt-2 flex flex-col">
            <DialogHeader className="mb-5">
              <DialogTitle className="font-display text-xl font-500 text-foreground leading-snug">
                {title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-24">
                  Price
                </span>
                <span className="font-display text-lg font-600 text-foreground">
                  ₹{priceUSD.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-24">
                  Dimensions
                </span>
                <span className="font-body text-sm text-foreground">
                  {dimensions}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-body text-xs tracking-widest uppercase text-muted-foreground w-24">
                  Medium
                </span>
                <span className="font-body text-sm text-foreground">
                  {material}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-4 flex-1">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
