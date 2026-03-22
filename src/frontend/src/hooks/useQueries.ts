import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob } from "../backend";
import type { Painting, PaintingInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllPaintings() {
  const { actor, isFetching } = useActor();
  return useQuery<Painting[]>({
    queryKey: ["paintings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPaintings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPainting(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Painting>({
    queryKey: ["painting", id?.toString() ?? "null"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      if (id === null) throw new Error("No painting id");
      return actor.getPainting(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddPainting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: PaintingInfo) => {
      if (!actor) throw new Error("No actor");
      // biome-ignore lint/suspicious/noExplicitAny: runtime ExternalBlob is compatible
      return actor.addPainting(info as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paintings"] });
    },
  });
}

export function useUpdatePainting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, info }: { id: bigint; info: PaintingInfo }) => {
      if (!actor) throw new Error("No actor");
      // biome-ignore lint/suspicious/noExplicitAny: runtime ExternalBlob is compatible
      return actor.updatePainting(id, info as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paintings"] });
    },
  });
}

export function useDeletePainting() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deletePainting(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paintings"] });
    },
  });
}

export async function uploadImageAsBlob(file: File): Promise<ExternalBlob> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image file is too large. Please use an image under 10MB.");
  }
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);
  return ExternalBlob.fromBytes(uint8);
}
