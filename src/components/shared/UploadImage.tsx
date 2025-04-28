"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface UploadImageProps {
  className?: string
  maxSize?: number // in MB
  onImageUpload?: (files: File[]) => void 
}

export function UploadImage({
  className,
  maxSize = 5, // Default max size is 5MB
  onImageUpload,
}: UploadImageProps) {
  const t = useTranslations("create-portifolio");
  const [error, setError] = React.useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = React.useState<Array<{
    file: File,
    preview: string,
    name: string
  }>>([])

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
        onImageUpload(validFiles)
      }
    },
    [maxSize, onImageUpload],
  )

  const removeImage = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

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
                    />
                    <span className="text-sm text-brand-blue-100 truncate">Imagem {index+1}</span>
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

