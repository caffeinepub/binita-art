import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "@tanstack/react-router";
import { Loader2, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Painting } from "../backend.d";
import { useAuth } from "../contexts/AuthContext";
import { useDeletePainting, useGetAllPaintings } from "../hooks/useQueries";

export function AdminDashboardPage() {
  const { logout } = useAuth();
  const { data: paintings, isLoading } = useGetAllPaintings();
  const deleteMutation = useDeletePainting();
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const displayPaintings = paintings && paintings.length > 0 ? paintings : [];

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Painting deleted");
    } catch {
      toast.error("Failed to delete painting");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg tracking-widest uppercase text-foreground">
              Binita Art
            </h1>
            <p className="font-body text-xs text-muted-foreground tracking-wide">
              Admin Dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="admin.view_gallery.link"
            >
              View Gallery
            </Link>
            <button
              type="button"
              onClick={logout}
              className="font-body text-xs tracking-widest uppercase flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="admin.logout.button"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-500 text-foreground">
              Manage Paintings
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {isLoading
                ? "Loading…"
                : `${displayPaintings.length} artwork${displayPaintings.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link
            to="/admin/new"
            className="font-body text-xs tracking-widest uppercase flex items-center gap-2 bg-foreground text-background px-5 py-2.5 hover:bg-foreground/80 transition-colors"
            data-ocid="admin.add_painting.button"
          >
            <Plus className="h-3.5 w-3.5" />
            Add New Painting
          </Link>
        </div>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : displayPaintings.length === 0 ? (
          <div
            className="text-center py-24 border border-dashed border-border"
            data-ocid="admin.paintings.empty_state"
          >
            <p className="font-display text-xl text-muted-foreground mb-4">
              No paintings yet
            </p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Add your first artwork to begin the collection.
            </p>
            <Link
              to="/admin/new"
              className="font-body text-xs tracking-widest uppercase inline-flex items-center gap-2 border border-border px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Upload First Painting
            </Link>
          </div>
        ) : (
          <div
            className="border border-border overflow-hidden"
            data-ocid="admin.paintings.table"
          >
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-left px-5 py-3 w-20">
                    Image
                  </th>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-left px-5 py-3">
                    Title
                  </th>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-left px-5 py-3 hidden md:table-cell">
                    Price
                  </th>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-left px-5 py-3 hidden lg:table-cell">
                    Dimensions
                  </th>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-left px-5 py-3 hidden lg:table-cell">
                    Material
                  </th>
                  <th className="font-body text-xs tracking-widest uppercase text-muted-foreground text-right px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayPaintings.map((painting: Painting, idx: number) => (
                  <tr
                    key={painting.id.toString()}
                    className="hover:bg-muted/40 transition-colors"
                    data-ocid={`admin.paintings.item.${idx + 1}`}
                  >
                    <td className="px-5 py-3">
                      <img
                        src={painting.image.getDirectURL()}
                        alt={painting.title}
                        className="w-14 h-14 object-cover border border-border"
                      />
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-display text-sm font-500 text-foreground">
                        {painting.title}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {painting.description}
                      </p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="font-body text-sm text-foreground">
                        ₹{painting.priceUSD.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="font-body text-sm text-foreground">
                        {painting.dimensions}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="font-body text-sm text-foreground">
                        {painting.material}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          to="/admin/edit/$id"
                          params={{ id: painting.id.toString() }}
                          className="font-body text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                          data-ocid={`admin.paintings.edit_button.${idx + 1}`}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingId(painting.id)}
                          className="font-body text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                          data-ocid={`admin.paintings.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(o) => !o && setDeletingId(null)}
      >
        <AlertDialogContent data-ocid="admin.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Painting
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body">
              Are you sure you want to delete this painting? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="font-body text-xs tracking-widest uppercase rounded-none"
              data-ocid="admin.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="font-body text-xs tracking-widest uppercase rounded-none bg-destructive hover:bg-destructive/80"
              data-ocid="admin.delete.confirm_button"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
