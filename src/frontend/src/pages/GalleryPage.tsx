import { Palette, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Painting } from "../backend.d";
import { Footer } from "../components/Footer";
import { PaintingCard } from "../components/PaintingCard";
import { PaintingDetailModal } from "../components/PaintingDetailModal";
import { PublicHeader } from "../components/PublicHeader";
import { type SamplePainting, samplePaintings } from "../data/samplePaintings";
import { useGetAllPaintings } from "../hooks/useQueries";

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

interface DisplayPainting {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  priceUSD: number;
  dimensions: string;
  material: string;
}

function mapBackendPainting(p: Painting): DisplayPainting {
  return {
    id: p.id.toString(),
    title: p.title,
    description: p.description,
    imageUrl: p.image.getDirectURL(),
    priceUSD: p.priceUSD,
    dimensions: p.dimensions,
    material: p.material,
  };
}

function mapSamplePainting(p: SamplePainting): DisplayPainting {
  return {
    id: `sample-${p.id}`,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    priceUSD: p.priceUSD,
    dimensions: p.dimensions,
    material: p.material,
  };
}

const WHY_CARDS = [
  {
    icon: Sparkles,
    title: "Curated Excellence",
    body: "Every piece in our gallery is handpicked for its quality and emotional depth, ensuring only the finest works reach our walls.",
    bg: "from-rose-500 to-orange-400",
    blob: "bg-yellow-300/30",
    ocid: "about.curated.card",
  },
  {
    icon: Palette,
    title: "Diverse Styles",
    body: "From modern abstracts to classic portraits, our catalog reflects a wide spectrum of artistic visions that speak to every soul.",
    bg: "from-violet-600 to-fuchsia-500",
    blob: "bg-pink-300/30",
    ocid: "about.diverse.card",
  },
  {
    icon: Users,
    title: "Empowering Artists",
    body: "We provide a platform for creators to share their work with a global audience, turning passion into lasting legacy.",
    bg: "from-emerald-500 to-teal-400",
    blob: "bg-cyan-300/30",
    ocid: "about.empower.card",
  },
];

export function GalleryPage() {
  const { data: backendPaintings, isLoading } = useGetAllPaintings();
  const [selectedPainting, setSelectedPainting] =
    useState<DisplayPainting | null>(null);

  const paintings: DisplayPainting[] =
    backendPaintings && backendPaintings.length > 0
      ? backendPaintings.map(mapBackendPainting)
      : samplePaintings.map(mapSamplePainting);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        <img
          src="/assets/generated/hero-gallery.dim_1400x600.jpg"
          alt="Binita Art Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div
          className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center"
          style={{ minHeight: "420px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
              Original Artworks
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-700 text-white leading-tight mb-4">
              Binita Art Gallery
            </h1>
            <p className="font-display text-lg italic text-white/80 max-w-md">
              Where Art Meets Soul
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <main id="gallery" className="flex-1 max-w-7xl mx-auto w-full px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Original Works
          </p>
          <h2 className="font-display text-4xl font-500 text-foreground">
            Explore Our Collection
          </h2>
          <div className="w-12 h-px bg-border mx-auto mt-6" />
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="gallery.loading_state"
          >
            {SKELETON_IDS.map((id) => (
              <div
                key={id}
                className="bg-card border border-border animate-pulse"
              >
                <div className="aspect-[4/5] bg-muted" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="gallery.list"
          >
            {paintings.map((painting, i) => (
              <PaintingCard
                key={painting.id}
                title={painting.title}
                imageUrl={painting.imageUrl}
                priceUSD={painting.priceUSD}
                dimensions={painting.dimensions}
                material={painting.material}
                index={i}
                onViewDetails={() => setSelectedPainting(painting)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ─── About Section ─────────────────────────────────────── */}
      <section
        id="about"
        className="relative overflow-hidden bg-slate-950 py-28 px-6"
        data-ocid="about.section"
      >
        {/* Decorative paint-blob background shapes */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-2/3 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs tracking-[0.35em] uppercase text-rose-400 mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-2">
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-violet-400 bg-clip-text text-transparent">
                About Binita
              </span>
              <br />
              <span className="text-white">Art Gallery</span>
            </h2>
            {/* Rainbow divider */}
            <div className="flex justify-center mt-6 gap-1">
              {[
                "bg-rose-500",
                "bg-orange-400",
                "bg-amber-400",
                "bg-emerald-400",
                "bg-teal-400",
                "bg-violet-500",
              ].map((c) => (
                <div key={c} className={`h-1 w-8 rounded-full ${c}`} />
              ))}
            </div>
          </motion.div>

          {/* Welcome + mission paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="max-w-3xl mx-auto text-center mb-20 space-y-5"
          >
            <p className="font-body text-lg text-slate-300 leading-relaxed">
              Welcome to{" "}
              <span className="text-amber-300 font-semibold">
                Binita Art Gallery
              </span>
              , a vibrant digital space where creativity meets expression. We
              are dedicated to showcasing a diverse collection of contemporary
              and traditional artworks, curated to inspire art enthusiasts and
              collectors alike.
            </p>
            <p className="font-body text-base text-slate-400 leading-relaxed">
              Our mission is to bridge the gap between talented artists and
              those who appreciate the beauty of visual storytelling. Whether
              you are looking for a statement piece for your home or exploring
              the latest in digital and fine arts, we provide a seamless
              experience to discover and acquire unique creations.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mb-10"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  data-ocid={card.ocid}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                  className="relative overflow-hidden rounded-2xl p-7 text-white shadow-xl"
                >
                  {/* Card gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-90`}
                  />
                  {/* Blob accent */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full ${card.blob} blur-xl`}
                  />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-5">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-display text-xl font-bold mb-3">
                      {card.title}
                    </h4>
                    <p className="font-body text-sm text-white/85 leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex justify-center"
          >
            <a
              href="#gallery"
              data-ocid="about.explore.button"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-semibold text-base text-white shadow-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              {/* Animated gradient button bg */}
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-violet-500 transition-all duration-500 group-hover:from-violet-500 group-hover:via-rose-500 group-hover:to-amber-400" />
              <Palette className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Explore Our Collection</span>
            </a>
          </motion.div>
        </div>
      </section>
      {/* ─────────────────────────────────────────────────────────── */}

      <Footer />

      {selectedPainting && (
        <PaintingDetailModal
          open={!!selectedPainting}
          onClose={() => setSelectedPainting(null)}
          title={selectedPainting.title}
          imageUrl={selectedPainting.imageUrl}
          priceUSD={selectedPainting.priceUSD}
          dimensions={selectedPainting.dimensions}
          material={selectedPainting.material}
          description={selectedPainting.description}
        />
      )}
    </div>
  );
}
