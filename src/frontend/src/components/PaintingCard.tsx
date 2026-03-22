import { motion } from "motion/react";

interface PaintingCardProps {
  title: string;
  imageUrl: string;
  priceUSD: number;
  dimensions: string;
  material: string;
  index?: number;
  onViewDetails: () => void;
}

export function PaintingCard({
  title,
  imageUrl,
  priceUSD,
  dimensions,
  material,
  index = 0,
  onViewDetails,
}: PaintingCardProps) {
  return (
    <motion.article
      className="bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
    >
      <div className="overflow-hidden aspect-[4/5] bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-base font-500 text-foreground mb-2 leading-snug">
          {title}
        </h3>
        <div className="space-y-1 flex-1">
          <p className="font-body text-xs text-muted-foreground tracking-wide">
            {dimensions}
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wide">
            {material}
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="font-display text-sm font-600 text-foreground">
            ₹{priceUSD.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={onViewDetails}
            data-ocid="gallery.view_details.button"
            className="font-body text-[11px] tracking-widest uppercase px-4 py-2 bg-secondary border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}
