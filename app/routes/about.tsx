import { UtensilsCrossed, Users, Award, Leaf } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-12">
      <section className="relative h-80 overflow-hidden rounded-xl">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Interior del restaurante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">Nuestra Historia</h1>
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto">
        <p className="text-xl text-gray-700">
          Desde 1985, El Sabor Mexicano ha sido el corazón de la auténtica cocina mexicana en nuestra ciudad, 
          ofreciendo sabores tradicionales con un toque moderno.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md">
          <UtensilsCrossed className="h-12 w-12 text-red-600 mb-4" />
          <h2 className="text-2xl font-semibold text-red-800 mb-2">Nuestra Cocina</h2>
          <p className="text-gray-700">
            Nos enorgullecemos de utilizar recetas transmitidas por generaciones, 
            preparadas con ingredientes frescos y locales. Cada platillo es una 
            obra maestra de sabor y tradición.
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md">
          <Users className="h-12 w-12 text-yellow-600 mb-4" />
          <h2 className="text-2xl font-semibold text-yellow-800 mb-2">Nuestro Equipo</h2>
          <p className="text-gray-700">
            Detrás de cada plato hay un equipo apasionado de chefs y personal de 
            servicio dedicados a brindar una experiencia culinaria excepcional a 
            nuestros comensales.
          </p>
        </div>
      </div>

      <section className="bg-white p-8 rounded-lg shadow-lg border border-red-200">
        <h2 className="text-3xl font-bold text-center text-red-800 mb-6">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Award className="h-16 w-16 text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Calidad</h3>
            <p className="text-gray-600">Comprometidos con la excelencia en cada detalle de nuestros platillos y servicio.</p>
          </div>
          <div className="text-center">
            <Leaf className="h-16 w-16 text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Sustentabilidad</h3>
            <p className="text-gray-600">Priorizamos ingredientes orgánicos y prácticas eco-amigables en nuestra operación.</p>
          </div>
          <div className="text-center">
            <Users className="h-16 w-16 text-red-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Comunidad</h3>
            <p className="text-gray-600">Apoyamos a productores locales y participamos activamente en eventos comunitarios.</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="relative h-80 overflow-hidden rounded-xl">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Platillo mexicano tradicional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">Sabores Auténticos</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-red-800 mb-4">Experiencia Culinaria Única</h2>
          <p className="text-lg text-gray-700 mb-6">
            En El Sabor Mexicano, cada visita es una aventura gastronómica. 
            Nuestros chefs combinan técnicas tradicionales con presentaciones modernas 
            para crear platillos que deleitan todos los sentidos.
          </p>
          <a 
            href="/menu" 
            className="inline-block bg-red-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
          >
            Explorar Menú
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-lg shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-yellow-400 opacity-90"></div>
        <div className="relative z-10 text-white p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Visítanos y Vive la Experiencia</h2>
          <p className="text-lg mb-6">
            Te invitamos a disfrutar de la rica tradición culinaria mexicana en un ambiente 
            acogedor y festivo. ¡Haz tu reserva hoy y déjate sorprender por nuestros sabores!
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-red-700 font-semibold py-2 px-6 rounded-full hover:bg-red-100 transition duration-300"
          >
            Reservar Mesa
          </a>
        </div>
      </section>
    </div>
  );
}