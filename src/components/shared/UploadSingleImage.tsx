"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useDataSections } from "@/contexts/DataSectionsContext"

interface UploadImageProps {
  className?: string
  maxSize?: number // in MB
  onImageUpload?: (file: File | null) => void 
}

export function UploadSingleImage({
  className,
  maxSize = 5, // Default max size is 5MB
  onImageUpload,
}: UploadImageProps) {
  const t = useTranslations("create-portifolio");
  const [error, setError] = React.useState<string | null>(null)
  const { setDataSections } = useDataSections();
  const [uploadedFile, setUploadedFile] = React.useState<{
    file: File,
    preview: string,
    name: string
  } | null>(null)

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]

      if (file.size > maxSize * 1024 * 1024) {
        setError(`Arquivo ${file.name} excede ${maxSize}MB`)
        return
      }

      const newFile = {
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }

      console.log(newFile)

      setUploadedFile(newFile)

      if (onImageUpload) {
        onImageUpload(file)
      }
    },
    [maxSize, onImageUpload],
  )

  const removeImage = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview)
      setUploadedFile(null)
      if (onImageUpload) {
        onImageUpload(null)
        setDataSections((prev) => ({
          ...prev,
          gallery: {
              type: 'profile',
              image: null 
          },
        }));
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false, // Agora só aceita uma única imagem
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

        {uploadedFile ? (
          <div className="w-full space-y-2">
            <div className="relative w-full">
              <div className="flex flex-row items-center justify-between bg-slate-900 p-2 rounded">
                <div className="flex items-center gap-2">
                  <Image 
                    src={uploadedFile.preview} 
                    alt={uploadedFile.name} 
                    className="object-contain rounded-md" 
                    width={46} 
                    height={46} 
                  />
                  <span className="text-sm text-brand-blue-100 truncate">{uploadedFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage()
                  }}
                  className="bg-semantic-red-500/5 text-semantic-red-500 hover:bg-semantic-red-500/5 hover:text-semantic-red-500 hover:cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-7 h-7 rounded-full bg-transparent border-2 border-brand-blue-500 flex items-center justify-center mt-4">
                <Plus className="w-5 h-5 text-brand-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-base font-secondary text-gray-50">{t("steps.profile.upload-title")}</span>
                <p className="text-sm font-secondary text-gray-50">{t("steps.profile.upload-description")}</p>
                <p className="text-xs text-gray-200 font-secondary">JPG, PNG, GIF ou WEBP (máx. {maxSize}MB)</p>
            </div>
            {error && <p className="text-xs text-destructive font-medium">{error}</p>}
          </div>
        )}
      </div>
    </Card>
  )
}
