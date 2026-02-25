"use client"

import { useTranslations } from 'next-intl'
import { Footer } from '@/components/shared/Footer'
import { Navbar } from '@/components/shared/Navbar'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  const t = useTranslations("terms")

  return (
    <div className="min-h-screen bg-gray-1300">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-50 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600">
            {t('last-update')}
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            {t('intro')}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section1-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section1-content')}
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section2-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section2-content')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section3-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section3-content')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section4-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section4-content')}
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section5-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section5-content')}
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section6-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section6-content')}
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section7-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section7-content')}
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section8-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section8-content')}
            </p>
          </div>

          {/* Section 9 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section9-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section9-content')}
            </p>
          </div>

          {/* Section 10 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section10-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section10-content')}
            </p>
          </div>

          {/* Section 11 - Contact */}
          <div className="bg-blue-50 rounded-lg shadow-sm p-8 border border-blue-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('section11-title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section11-content')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
