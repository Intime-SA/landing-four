"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { sendMetaEvent } from "../services/metaEventSend"
import { useUserTracking } from "./context/traking-context"

// Extender la interfaz Window para incluir fbq
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export default function MoneyMakerLanding() {
  const [loading, setLoading] = useState(false)
  const { sendTrackingData } = useUserTracking();


  const handleClick = async () => {
    try {
      setLoading(true)
      
      // Generar un email temporal para el evento (en producción esto vendría del formulario de registro)
      const tempEmail = `user_${Date.now()}@example.com`;
      
      // Enviar evento a Meta
      const success = await sendMetaEvent(tempEmail, "10");
      
      if (success) {
        console.log('Evento de registro enviado exitosamente a Meta');
      } else {
        console.warn('No se pudo enviar el evento a Meta');
      }

      // Enviar evento de compra a Facebook
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Purchase', {
          content_name: 'Botón CTA',
          value: 0,
          currency: 'USD',
        });
        console.log('Evento de compra enviado a Facebook');
      } else {
        console.warn('No se pudo enviar el evento de compra a Facebook');
      }

      try {
        await sendTrackingData();
        console.log('Datos de tracking enviados exitosamente');
      } catch (error) {
        console.warn('Error enviando datos de tracking:', error);
      }
      
      // Simular loading por 2 segundos
      setTimeout(() => {
        // Redirigir al usuario a la URL de registro
        window.location.href = process.env.NEXT_PUBLIC_REGISTER_URL || '';
        setLoading(false)
      }, 2000)
      
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      // Aún redirigir al usuario aunque falle el evento
      setTimeout(() => {
        window.location.href = process.env.NEXT_PUBLIC_REGISTER_URL || '';
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
    {/* Hero Section */}
    <section className="relative h-screen flex items-end justify-between w-full p-0 m-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #333 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #333 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated Background Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-1 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent -rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/5 w-72 h-1 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent rotate-45 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-amber-300 rounded-full animate-bounce delay-700 opacity-40"></div>
        <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-1000 opacity-50"></div>
        <div className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-1500 opacity-70"></div>
      </div>

      <div className="relative z-10 flex-1 max-w-2xl mb-16 pl-16">
        {/* Logo */}
        <div className="mb-8 flex justify-center md:justify-start">
          <Image
            src="/image.png"
            alt="Logo"
            width={250}
            height={250}
            className="w-24 h-auto md:w-40"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-black mb-8 leading-none flex justify-center md:justify-start">
          <Image
            src="/images/entre.png"
            alt="Logo"
            width={750}
            height={250}
            className="w-60 md:w-[500px] h-auto"
          />
        </h1>

        {/* Enhanced CTA Button */}
        <div className="relative w-fit mb-8">
          {/* Glow Effect Background */}
          
          <Button
          id='cta-button'
            size="lg"
            disabled={loading}
            onClick={handleClick}
            className="relative px-8 py-4 text-lg md:px-20 md:py-10 md:text-4xl font-black rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 shadow-2xl text-black transition-all duration-300 hover:scale-110 hover:from-yellow-200 hover:to-amber-700 focus:outline-none focus:ring-4 focus:ring-yellow-400 border-4 border-yellow-200/50 hover:border-yellow-100"
            style={{
              boxShadow: `
                0 0 30px rgba(251, 191, 36, 0.8),
                0 0 60px rgba(245, 158, 11, 0.6),
                0 0 90px rgba(251, 191, 36, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.2)
              `,
            }}
          >
            {loading ? (
              <span className="flex items-center gap-4">
                <span className="text-5xl animate-spin">⚡</span>
                <span>Cargando...</span>
              </span>
            ) : (
              <span className="flex items-center gap-4 text-white drop-shadow-lg">
                
                <span className="tracking-wider">¡ JUGAR AHORA !</span>
              </span>
            )}
          </Button>

          {/* Loader barra tipo Notion */}
          {loading && (
            <span className="absolute left-0 bottom-0 w-full h-2 overflow-hidden rounded-b-full">
              <span className="block h-full w-full bg-gradient-to-r from-green-400 via-white to-green-600 animate-notion-bar"></span>
            </span>
          )}

</div>

        
      </div>

      {/* Phone Mockup with enhanced glow */}
      <div className="relative z-10 flex-shrink-0">
        <div className="relative">
          {/* Phone glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 via-purple-400/30 to-pink-400/20 rounded-3xl blur-2xl animate-pulse"></div>
          <Image
            src="/phone.png"
            alt="Phone showing winning notification"
            width={520}
            height={780}
            className="max-w-none relative z-10"
          />
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-sm text-gray-400 mb-4 tracking-wider">JULIO 2025</div>
            <div className="text-6xl lg:text-7xl font-black text-white mb-4">560</div>
            <div className="text-lg font-bold text-gray-300 tracking-wider">PREMIOS PAGADOS</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-4 tracking-wider">JULIO 2025</div>
            <div className="text-6xl lg:text-7xl font-black text-white mb-4">1,286</div>
            <div className="text-lg font-bold text-gray-300 tracking-wider">USUARIOS REGISTRADOS</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-4 tracking-wider">JULIO 2025</div>
            <div className="text-6xl lg:text-7xl font-black text-white mb-4">+20M</div>
            <div className="text-lg font-bold text-gray-300 tracking-wider">NUESTROS GANADORES</div>
          </div>
        </div>
      </div>
    </section>

    {/* Teddy Bear Section */}
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-8 text-center">
        <div className="flex justify-center">
          <Image
            src="/images/teddy-bear.png"
            alt="Teddy bear mascot with sunglasses"
            width={1000}
            height={1000}
            className="max-w-full h-auto -mb-20"
          />
        </div>
      </div>
    </section>
  </div>
  )
}
