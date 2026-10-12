"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CatalogProduct } from "@/lib/data/catalog";
import {
  CollectionImageRecord,
  uploadCollectionImage,
  deleteCollectionImage,
} from "@/app/actions/admin-images";
import {
  UploadCloud,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  FileImage,
  Sparkles,
  Info,
} from "lucide-react";
import { MAX_IMAGES_PER_COLLECTION } from "@/lib/validations/imageUpload";

interface CollectionPhotoManagerProps {
  product: CatalogProduct;
  initialImages: CollectionImageRecord[];
  onImagesUpdated: (newImages: CollectionImageRecord[]) => void;
}

export function CollectionPhotoManager({
  product,
  initialImages,
  onImagesUpdated,
}: CollectionPhotoManagerProps) {
  const [images, setImages] = useState<CollectionImageRecord[]>(initialImages);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Deletion modal state
  const [imageToDelete, setImageToDelete] = useState<CollectionImageRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCount = images.length;
  const isQuotaFull = currentCount >= MAX_IMAGES_PER_COLLECTION;
  const availableSlots = Math.max(0, MAX_IMAGES_PER_COLLECTION - currentCount);

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    setUploadSuccess(null);

    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    // Client-side quick checks
    const validExts = [".jpg", ".jpeg", ".png", ".webp"];
    const isExtValid = validExts.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isExtValid) {
      setUploadError("Formato no permitido. Solo se aceptan archivos JPG, PNG o WebP.");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("El archivo supera el tamaño máximo permitido de 5 MB.");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleCancelPreview = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadError(null);
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    if (isQuotaFull) {
      setUploadError(
        `Límite alcanzado: Esta colección ya cuenta con 10 fotografías. Elimina una para subir una nueva.`
      );
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("collectionId", product.id);

      const result = await uploadCollectionImage(formData);

      if (!result.success || !result.data) {
        setUploadError(result.error || "Ocurrió un error al subir la fotografía.");
        setIsUploading(false);
        return;
      }

      const updated = [...images, result.data];
      setImages(updated);
      onImagesUpdated(updated);

      setUploadSuccess(`¡Fotografía "${selectedFile.name}" subida exitosamente!`);
      handleCancelPreview();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado al cargar fotografía.";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deleteCollectionImage(imageToDelete.id, imageToDelete.storage_path);

      if (!result.success) {
        setDeleteError(result.error || "No fue posible eliminar la imagen.");
        setIsDeleting(false);
        return;
      }

      const filtered = images.filter((img) => img.id !== imageToDelete.id);
      setImages(filtered);
      onImagesUpdated(filtered);
      setImageToDelete(null);
      setUploadSuccess("Fotografía eliminada con éxito de Supabase Storage.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar.";
      setDeleteError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Collection Summary & Quota Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {product.categoryName}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                {product.id}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-plum mt-1">{product.name}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              {product.shortDescription}
            </p>
          </div>

          {/* Quota Badge Indicator */}
          <div className="flex flex-col items-start sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Cupo de Fotos:
              </span>
              <span
                className={`text-sm font-black px-3 py-1 rounded-full ${
                  isQuotaFull
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : currentCount >= 8
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                }`}
              >
                {currentCount} / {MAX_IMAGES_PER_COLLECTION} utilizadas
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1">
              {availableSlots === 0
                ? "Cupo agotado (máximo 10)"
                : `${availableSlots} ${availableSlots === 1 ? "cupo disponible" : "cupos disponibles"}`}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-rose-50 border border-rose-100 overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${
                isQuotaFull ? "bg-primary" : currentCount >= 8 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${(currentCount / MAX_IMAGES_PER_COLLECTION) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>0 fotos</span>
            <span>5 fotos</span>
            <span>10 fotos (máximo)</span>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-plum">Subir Nueva Fotografía</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            Formatos: JPG, PNG, WebP (máx. 5 MB)
          </span>
        </div>

        {/* Upload Alerts */}
        {uploadError && (
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* Quota Exceeded Block */}
        {isQuotaFull && !previewUrl ? (
          <div className="p-6 rounded-2xl bg-secondary/50 border border-purple-100 text-center space-y-2">
            <Info className="w-6 h-6 text-primary mx-auto" />
            <p className="text-sm font-bold text-plum">
              Has alcanzado el límite de 10 fotografías para esta colección
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Para agregar una fotografía nueva o sustituir una existente, primero debes eliminar
              alguna de las fotos de la galería inferior.
            </p>
          </div>
        ) : previewUrl && selectedFile ? (
          /* Preview Mode Before Confirming */
          <div className="p-5 rounded-2xl border-2 border-primary/40 bg-rose-50/30 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vista Previa antes de confirmar</span>
              </span>
              <button
                type="button"
                onClick={handleCancelPreview}
                disabled={isUploading}
                className="p-1.5 rounded-full hover:bg-rose-100 text-muted-foreground hover:text-plum transition-colors cursor-pointer"
                title="Descartar vista previa"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              {/* Preview Thumbnail */}
              <div className="sm:col-span-4 relative aspect-square w-full max-w-[200px] mx-auto rounded-2xl overflow-hidden border border-rose-200 shadow-sm bg-white">
                <Image
                  src={previewUrl}
                  alt="Vista previa"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Preview Details and Action */}
              <div className="sm:col-span-8 space-y-3">
                <div className="space-y-1 text-xs">
                  <p className="text-plum font-bold truncate">Archivo: {selectedFile.name}</p>
                  <p className="text-muted-foreground">
                    Tamaño: {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <p className="text-muted-foreground">Tipo detectado: {selectedFile.type}</p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Verificado localmente. La imagen original en tu computadora no se modificará.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleConfirmUpload}
                    disabled={isUploading}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-primary hover:bg-[#c93d75] disabled:opacity-50 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subiendo a Supabase Storage...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        <span>Confirmar y Guardar Fotografía</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelPreview}
                    disabled={isUploading}
                    className="px-4 py-2.5 rounded-full text-xs font-bold text-plum bg-secondary hover:bg-rose-100/70 border border-purple-100 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* File Input Trigger Zone */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-rose-200 hover:border-primary/60 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-rose-50/20 hover:bg-rose-50/40 space-y-3 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-white text-primary group-hover:scale-110 flex items-center justify-center mx-auto shadow-2xs border border-rose-100 transition-transform">
              <FileImage className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-plum">
                Haz clic para seleccionar una fotografía desde tu dispositivo
              </p>
              <p className="text-xs text-muted-foreground">
                Se mostrará una vista previa obligatoria antes de confirmar la carga.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Current Photo Gallery Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-100 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <FileImage className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-plum">
              Fotografías Activas en el Catálogo ({images.length})
            </h3>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {images.length === 0 ? "Sin fotografías cargadas" : "Visibles públicamente"}
          </span>
        </div>

        {images.length === 0 ? (
          /* Fallback State */
          <div className="py-12 px-6 text-center space-y-3 bg-secondary/20 rounded-2xl border border-dashed border-rose-200">
            <p className="text-sm font-bold text-plum">
              Esta colección aún no tiene fotografías en Supabase Storage
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              En el catálogo público y en los modales se exhibe automáticamente la ilustración
              artesanal oficial como alternativa estética garantizada.
            </p>
          </div>
        ) : (
          /* Grid of Uploaded Images */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="group relative bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-rose-50/50 overflow-hidden">
                  <Image
                    src={img.public_url}
                    alt={img.file_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                    #{index + 1}
                  </span>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3 space-y-2">
                  <div className="space-y-0.5 text-left">
                    <p className="text-xs font-bold text-plum truncate" title={img.file_name}>
                      {img.file_name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {(img.file_size_bytes / 1024).toFixed(1)} KB •{" "}
                      {img.mime_type.split("/")[1]?.toUpperCase()}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setImageToDelete(img)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold text-destructive hover:bg-rose-50 transition-colors cursor-pointer w-full justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Image Deletion */}
      {imageToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-rose-100 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-destructive flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-extrabold text-plum">Confirmar Eliminación</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ¿Estás seguro de que deseas eliminar permanentemente la fotografía{" "}
                <strong className="text-plum">&ldquo;{imageToDelete.file_name}&rdquo;</strong>?
              </p>
              <p className="text-[11px] text-muted-foreground">
                Esta acción eliminará el archivo de Supabase Storage y su referencia en la base de
                datos. No afectará las imágenes de tu computadora.
              </p>
            </div>

            {deleteError && (
              <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-xs">
                {deleteError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setImageToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-plum bg-secondary hover:bg-rose-100 border border-purple-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-destructive hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isDeleting ? "Eliminando..." : "Sí, Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
