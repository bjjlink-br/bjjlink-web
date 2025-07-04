"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { FilePlus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useDataSections } from "@/contexts/DataSectionsContext"
import { KEYS_STORAGE } from "@/utils/constants"

interface UploadImageProps {
  className?: string
  maxSize?: number // in MB
  onImageUpload?: (files: File[]) => void 
  sectionUpload: "GALLERY" | "PROFILE";
  isRemote?: boolean;
}

export function UploadImage({
  className,
  maxSize = 5, // Default max size is 5MB
  onImageUpload,
  sectionUpload = "PROFILE",
  isRemote
}: UploadImageProps) {
  const t = useTranslations("create-portifolio");
  const [error, setError] = React.useState<string | null>(null)
  const { setDataSections } = useDataSections();
  const [uploadedFiles, setUploadedFiles] = React.useState<Array<{
    file: File,
    preview: string,
    name: string
  }>>([])

  React.useEffect(() => {
    const sectionsString = localStorage.getItem(KEYS_STORAGE.sections);

    if (sectionsString) {
      const sections = JSON.parse(sectionsString);
      const gallery = sections?.gallery?.imagesGallery || [];
  
      const remoteFiles = gallery.map((img: any) => ({
        name: img.filename,
        preview: img.url,
        isRemote: true
      }));
  
      setUploadedFiles(remoteFiles);
    } else {
      if (sectionUpload === "GALLERY") {
        setDataSections(prev => ({
          ...prev,
          gallery: {
            type: 'GALLERY',
            imagesGallery: uploadedFiles.map(f => f.file)
          }
        }));
      } else {
        setDataSections(prev => ({
          ...prev,
          gallery: {
            type: 'PROFILE',
            image: uploadedFiles[0]?.file || null
          }
        }));
      }
    }
  }, [uploadedFiles, sectionUpload, setDataSections]);


  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      const validFiles = acceptedFiles.filter(file => {
        if (file.size > maxSize * 1024 * 1024) {
          setError(`Arquivo ${file.name} excede ${maxSize}MB`)
          return false
        }
        return true
      })

      const newFiles = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }))

      setUploadedFiles(prev => [...prev, ...newFiles])

      if (onImageUpload) {
        // onImageUpload(validFiles)
        onImageUpload([...uploadedFiles.map(f => f.file), ...validFiles])
      }
    },
    [maxSize, onImageUpload, uploadedFiles],
  )

  const removeImage = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      const removed = newFiles[index];
  
      if (!removed.isRemote) {
        URL.revokeObjectURL(removed.preview);
      }
  
      newFiles.splice(index, 1);
      return newFiles;
    });
    
    // setUploadedFiles(prev => {
    //   const newFiles = [...prev]
    //   URL.revokeObjectURL(newFiles[index].preview)
    //   newFiles.splice(index, 1)
    //   return newFiles
    // })
  }

   // Limpar objetos URL quando o componente desmontar
   React.useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [uploadedFiles])

  // Modificar o useDropzone para aceitar múltiplos arquivos
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true, // Habilita múltiplos arquivos
  })

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center p-8 text-center",
          "rounded-lg cursor-pointer",
          "transition-colors duration-200",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          error && "border-destructive border-dashed",
        )}
      >
        <input {...getInputProps()} />

        {uploadedFiles.length > 0 ? (
          <div className="w-full space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={file.name} className="relative w-full">
                <div className="flex flex-row items-center justify-between bg-slate-900 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <Image 
                      src={file.preview} 
                      alt={file.name} 
                      className="object-contain rounded-md" 
                      width={46} 
                      height={46} 
                      onLoad={() => URL.revokeObjectURL(file.preview)}
                    />
                    <span className="text-sm text-brand-blue-100 truncate">
                      {sectionUpload === "GALLERY" ? `Imagem ${index+1}` : "Imagem de perfil"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(index)
                    }}
                    className="bg-semantic-red-500/5 text-semantic-red-500 hover:bg-semantic-red-500/5 hover:text-semantic-red-500 hover:cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {sectionUpload === "GALLERY" && (
              <div className="flex items-center gap-2 mt-4 justify-center">
                <FilePlus className="w-3 h-3 text-white" />
                <p className="text-white">Adicionar mais fotos</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-7 h-7 rounded-full bg-transparent border-2 border-brand-blue-500 flex items-center justify-center mt-4">
                <Plus className="w-5 h-5 text-brand-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-base font-secondary text-gray-50">{t("steps.profile.upload-title")}</span>
                <p className="text-sm font-secondary text-gray-50">{t("steps.profile.upload-description")}</p>
                <p className="text-xs text-gray-200 font-secondary">JPG, PNG, GIF or WEBP (max. {maxSize}MB)</p>
            </div>
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
          </div>
        )}
      </div>
    </Card>
  )
}

