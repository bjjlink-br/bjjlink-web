"use client"

import * as React from "react"
import { Pencil, Save, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ProfileEditor() {
  const [bioOpen, setBioOpen] = React.useState(true)
  const [buttonOpen, setButtonOpen] = React.useState(false)
  const [headline, setHeadline] = React.useState("")
  const [supportingText, setSupportingText] = React.useState("")
  const [buttonName, setButtonName] = React.useState("")
  const [buttonUrl, setButtonUrl] = React.useState("")

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Pencil className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-medium">Perfil</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <Collapsible
          open={bioOpen}
          onOpenChange={setBioOpen}
          className="space-y-4"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h2 className="text-lg font-medium">Sua bio</h2>
              <Button size="sm">
                <span className="sr-only">Toggle bio section</span>
                {bioOpen ? "−" : "+"}
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título em destaque</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                maxLength={150}
                placeholder="Escreva"
                className="bg-background/50"
              />
              <div className="text-xs text-muted-foreground text-right">
                {headline.length}/150
              </div>
            </div>
            <div className="space-y-2">
              <Label>Texto de apoio</Label>
              <Textarea
                value={supportingText}
                onChange={(e) => setSupportingText(e.target.value)}
                maxLength={150}
                placeholder="Escreva"
                className="bg-background/50 min-h-[100px]"
              />
              <div className="text-xs text-muted-foreground text-right">
                {supportingText.length}/150
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={buttonOpen}
          onOpenChange={setButtonOpen}
          className="space-y-4"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h2 className="text-lg font-medium">Botão</h2>
              <Button size="sm">
                <span className="sr-only">Toggle button section</span>
                {buttonOpen ? "−" : "+"}
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do botão</Label>
              <Input
                value={buttonName}
                onChange={(e) => setButtonName(e.target.value)}
                maxLength={50}
                placeholder="Escreva o nome do botão"
                className="bg-background/50"
              />
              <div className="text-xs text-muted-foreground text-right">
                {buttonName.length}/50
              </div>
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <div className="flex">
                <div className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">
                  http://
                </div>
                <Input
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="Colocar link"
                  className="bg-background/50 rounded-l-none"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button className="w-full" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  )
}

