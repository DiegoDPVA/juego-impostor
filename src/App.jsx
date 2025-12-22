import React, { useState, useEffect } from 'react';
import { Users, Copy, Check, Crown, AlertCircle, Share2, Wifi, WifiOff, X, Settings } from 'lucide-react';

// Mock Firebase (para pruebas locales)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, update } from "firebase/database";

// 🔥 TU CONFIGURACIÓN DE FIREBASE (pégala aquí tal cual la copiaste de la consola)
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Inicializar Firebase
import { database } from './firebase';
import { ref, set, get, onValue, update } from 'firebase/database';

const WORDS_WITH_CLUES = {
    'Animales': {
        'Perro': ['Doméstico', 'Olfato', 'Raza', 'Leal'],
        'Gato': ['Bigotes', 'Garras', 'Independiente', 'Nocturno'],
        'León': ['Felino', 'Savana', 'Dorado', 'Rey'],
        'Tigre': ['Felino', 'Asiático', 'Rayas', 'Cazador'],
        'Elefante': ['Memoria', 'Gigante', 'Marfil', 'Trompa'],
        'Jirafa': ['Alto', 'Manchas', 'Herbívoro', 'Cuello'],
        'Mono': ['Primate', 'Árbol', 'Inteligente', 'Ágil'],
        'Cebra': ['Rayas', 'Herbívoro', 'Manada', 'Pradera'],
        'Oso': ['Hibernación', 'Peludo', 'Carnívoro', 'Bosque'],
        'Ballena': ['Océano', 'Gigante', 'Mamífero', 'Canto'],
        'Delfín': ['Océano', 'Inteligente', 'Saltador', 'Amigable'],
        'Tiburón': ['Océano', 'Dientes', 'Cazador', 'Aleta'],
        'Pingüino': ['Frío', 'Ave', 'Blanco', 'Torpe'],
        'Águila': ['Ave', 'Rapaz', 'Vista', 'Montaña'],
        'Búho': ['Ave', 'Nocturno', 'Sabiduría', 'Rotación'],
        'Loro': ['Ave', 'Colorido', 'Imitador', 'Tropical'],
        'Serpiente': ['Reptil', 'Escamas', 'Veneno', 'Rastrero'],
        'Cocodrilo': ['Reptil', 'Agua', 'Dientes', 'Prehistórico'],
        'Tortuga': ['Reptil', 'Caparazón', 'Lenta', 'Longevo'],
        'Rana': ['Anfibio', 'Salto', 'Agua', 'Metamorfosis'],
        'Caballo': ['Equino', 'Veloz', 'Montura', 'Crines'],
        'Vaca': ['Bovino', 'Leche', 'Manso', 'Pradera'],
        'Cerdo': ['Mamífero', 'Granja', 'Rosado', 'Inteligente'],
        'Oveja': ['Mamífero', 'Lana', 'Rebaño', 'Balido'],
        'Gallina': ['Ave', 'Huevo', 'Granja', 'Plumas'],
        'Pato': ['Ave', 'Agua', 'Plano', 'Migratorio'],
        'Conejo': ['Mamífero', 'Orejas', 'Veloz', 'Zanahoria'],
        'Ratón': ['Roedor', 'Pequeño', 'Cola', 'Queso'],
        'Ardilla': ['Roedor', 'Árbol', 'Nueces', 'Cola'],
        'Zorro': ['Mamífero', 'Astuto', 'Rojo', 'Nocturno'],
        'Lobo': ['Mamífero', 'Manada', 'Carnívoro', 'Bosque'],
        'Canguro': ['Marsupial', 'Salto', 'Bolsa', 'Australia'],
        'Koala': ['Marsupial', 'Árbol', 'Eucalipto', 'Australia'],
        'Panda': ['Oso', 'Bambú', 'Blanco', 'China'],
        'Gorila': ['Primate', 'Grande', 'Fuerte', 'Selva'],
        'Camello': ['Mamífero', 'Joroba', 'Desierto', 'Resistente'],
        'Rinoceronte': ['Mamífero', 'Cuerno', 'Pesado', 'África'],
        'Hipopótamo': ['Mamífero', 'Agua', 'Pesado', 'África'],
        'Foca': ['Mamífero', 'Agua', 'Polar', 'Aletas'],
        'Pulpo': ['Molusco', 'Tentáculos', 'Inteligente', 'Tinta'],
        'Medusa': ['Invertebrado', 'Transparente', 'Picadura', 'Flotante'],
        'Estrella': ['Invertebrado', 'Marina', 'Brazos', 'Regeneración'],
        'Cangrejo': ['Crustáceo', 'Pinzas', 'Lateral', 'Playa'],
        'Araña': ['Arácnido', 'Tela', 'Ocho', 'Veneno'],
        'Mariposa': ['Insecto', 'Alas', 'Colorida', 'Metamorfosis'],
        'Abeja': ['Insecto', 'Miel', 'Aguijón', 'Colonia'],
        'Hormiga': ['Insecto', 'Colonia', 'Fuerte', 'Organizada'],
        'Mosquito': ['Insecto', 'Sangre', 'Zumbido', 'Picadura'],
        'Mosca': ['Insecto', 'Alas', 'Molesta', 'Rápida'],
        'Caracol': ['Molusco', 'Lento', 'Caparazón', 'Baba']
    },
    'Comidas': {
        'Pizza': ['Italiano', 'Masa', 'Horno', 'Redonda', 'Queso'],
        'Hamburguesa': ['Pan', 'Carne', 'Americana', 'Rápida', 'Redonda'],
        'Pasta': ['Italiana', 'Trigo', 'Salsa', 'Hervir', 'Larga'],
        'Paella': ['Española', 'Arroz', 'Azafrán', 'Marisco', 'Valencia'],
        'Sushi': ['Japonés', 'Arroz', 'Pescado', 'Alga', 'Crudo'],
        'Tacos': ['Mexicano', 'Tortilla', 'Picante', 'Doblar'],
        'Burrito': ['Mexicano', 'Enrollado', 'Frijoles', 'Grande'],
        'Paella': ['Arroz', 'Español', 'Marisco', 'Azafrán'],
        'Tortilla': ['Huevo', 'Español', 'Patata', 'Redonda'],
        'Jamón': ['Cerdo', 'Curado', 'Español', 'Lonchas'],
        'Queso': ['Lácteo', 'Curado', 'Amarillo', 'Variado'],
        'Pan': ['Harina', 'Horno', 'Básico', 'Corteza'],
        'Croissant': ['Francés', 'Mantequilla', 'Hojaldre', 'Desayuno'],
        'Helado': ['Frío', 'Dulce', 'Cremoso', 'Verano'],
        'Tarta': ['Dulce', 'Horno', 'Capas', 'Celebración'],
        'Chocolate': ['Dulce', 'Cacao', 'Marrón', 'Tableta'],
        'Galleta': ['Dulce', 'Crujiente', 'Horno', 'Pequeña'],
        'Caramelo': ['Dulce', 'Azúcar', 'Duro', 'Envuelto'],
        'Café': ['Bebida', 'Caliente', 'Amargo', 'Energía'],
        'Té': ['Bebida', 'Caliente', 'Hojas', 'Infusión'],
        'Agua': ['Líquido', 'Transparente', 'Vital', 'Bebida'],
        'Zumo': ['Líquido', 'Frutas', 'Dulce', 'Vitaminas'],
        'Leche': ['Lácteo', 'Blanco', 'Vaca', 'Calcio'],
        'Yogur': ['Lácteo', 'Fermentado', 'Cremoso', 'Probiótico'],
        'Mantequilla': ['Láctea', 'Amarilla', 'Grasa', 'Untar'],
        'Huevo': ['Proteína', 'Gallina', 'Cáscara', 'Versatil'],
        'Pollo': ['Ave', 'Carne', 'Blanca', 'Común'],
        'Pescado': ['Marino', 'Omega', 'Espinas', 'Escamas'],
        'Carne': ['Proteína', 'Roja', 'Animal', 'Cocinar'],
        'Arroz': ['Grano', 'Blanco', 'Asiático', 'Cereal'],
        'Patata': ['Tubérculo', 'Marrón', 'Versátil', 'Tierra'],
        'Tomate': ['Rojo', 'Fruta', 'Jugoso', 'Salsa'],
        'Lechuga': ['Verde', 'Hoja', 'Ensalada', 'Fresco'],
        'Cebolla': ['Bulbo', 'Capas', 'Lágrimas', 'Aromático'],
        'Ajo': ['Bulbo', 'Blanco', 'Fuerte', 'Dientes'],
        'Zanahoria': ['Naranja', 'Raíz', 'Crujiente', 'Vista'],
        'Manzana': ['Fruta', 'Roja', 'Redonda', 'Común'],
        'Plátano': ['Fruta', 'Amarillo', 'Potasio', 'Tropical'],
        'Naranja': ['Fruta', 'Cítrico', 'Vitamina', 'Jugosa'],
        'Fresa': ['Fruta', 'Roja', 'Semillas', 'Dulce'],
        'Uva': ['Fruta', 'Racimo', 'Pequeña', 'Vino'],
        'Sandía': ['Fruta', 'Verde', 'Roja', 'Verano'],
        'Melón': ['Fruta', 'Redondo', 'Dulce', 'Verano'],
        'Pera': ['Fruta', 'Verde', 'Forma', 'Jugosa'],
        'Limón': ['Fruta', 'Amarillo', 'Ácido', 'Cítrico'],
        'Kiwi': ['Fruta', 'Verde', 'Peludo', 'Vitamina'],
        'Piña': ['Fruta', 'Tropical', 'Espinosa', 'Corona'],
        'Mango': ['Fruta', 'Tropical', 'Dulce', 'Naranja'],
        'Aguacate': ['Fruta', 'Verde', 'Cremoso', 'Grasa'],
        'Cereza': ['Fruta', 'Roja', 'Pequeña', 'Hueso']
    },
    'Deportes': {
        'Fútbol': ['Balón', 'Portería', 'Once', 'Mundial'],
        'Baloncesto': ['Aro', 'Bote', 'Cinco', 'Canasta'],
        'Tenis': ['Raqueta', 'Individual', 'Red', 'Pelota'],
        'Voleibol': ['Red', 'Seis', 'Saque', 'Playa'],
        'Béisbol': ['Bate', 'Nueve', 'Diamante', 'Americana'],
        'Golf': ['Hoyo', 'Palo', 'Verde', 'Individual'],
        'Natación': ['Agua', 'Piscina', 'Estilo', 'Brazada'],
        'Atletismo': ['Pista', 'Velocidad', 'Salto', 'Medalla'],
        'Ciclismo': ['Bicicleta', 'Pedal', 'Vuelta', 'Etapa'],
        'Boxeo': ['Guantes', 'Ring', 'Round', 'Golpe'],
        'Karate': ['Arte', 'Kimono', 'Kata', 'Japonés'],
        'Judo': ['Arte', 'Tatami', 'Lanzamiento', 'Japonés'],
        'Taekwondo': ['Arte', 'Patada', 'Coreano', 'Cinturón'],
        'Esgrima': ['Espada', 'Máscara', 'Toque', 'Elegante'],
        'Gimnasia': ['Flexibilidad', 'Aparato', 'Artística', 'Nota'],
        'Esquí': ['Nieve', 'Montaña', 'Tablas', 'Velocidad'],
        'Snowboard': ['Nieve', 'Montaña', 'Tabla', 'Freestyle'],
        'Surf': ['Ola', 'Tabla', 'Playa', 'Equilibrio'],
        'Patinaje': ['Hielo', 'Cuchillas', 'Giro', 'Artístico'],
        'Hockey': ['Disco', 'Palo', 'Hielo', 'Patines'],
        'Rugby': ['Oval', 'Contacto', 'Quince', 'Británico'],
        'Balonmano': ['Portería', 'Mano', 'Siete', 'Europeo'],
        'Waterpolo': ['Agua', 'Portería', 'Siete', 'Natación'],
        'Ping Pong': ['Mesa', 'Paleta', 'Red', 'Pequeña'],
        'Badminton': ['Volante', 'Raqueta', 'Red', 'Rápido'],
        'Escalada': ['Pared', 'Agarre', 'Altura', 'Cuerda'],
        'Equitación': ['Caballo', 'Silla', 'Elegante', 'Salto'],
        'Remo': ['Agua', 'Bote', 'Pala', 'Equipo'],
        'Vela': ['Agua', 'Barco', 'Viento', 'Regata'],
        'Halterofilia': ['Peso', 'Fuerza', 'Barra', 'Levantamiento'],
        'Parapente': ['Aire', 'Montaña', 'Vela', 'Vuelo'],
        'Paracaidismo': ['Aire', 'Altura', 'Caída', 'Libertad'],
        'Buceo': ['Agua', 'Profundidad', 'Tanque', 'Marina'],
        'Triatlón': ['Tres', 'Resistencia', 'Completo', 'Extremo'],
        'Maratón': ['Carrera', 'Distancia', 'Resistencia', 'Kilómetros'],
        'Crossfit': ['Intenso', 'Variado', 'Fuerza', 'Moderno'],
        'Yoga': ['Flexibilidad', 'Meditación', 'Postura', 'India'],
        'Pilates': ['Core', 'Control', 'Colchoneta', 'Suave'],
        'Zumba': ['Baile', 'Música', 'Latina', 'Fitness'],
        'Spinning': ['Bicicleta', 'Música', 'Grupal', 'Intenso'],
        'Aerobic': ['Cardio', 'Música', 'Grupal', 'Ritmo'],
        'Dardos': ['Diana', 'Punta', 'Pub', 'Precisión'],
        'Billar': ['Mesa', 'Taco', 'Bolas', 'Tacada'],
        'Bolos': ['Pista', 'Bola', 'Pinos', 'Strike'],
        'Ajedrez': ['Tablero', 'Mental', 'Rey', 'Estrategia'],
        'Poker': ['Cartas', 'Apuesta', 'Farol', 'Fichas'],
        'Motociclismo': ['Motor', 'Dos', 'Curva', 'Velocidad'],
        'Automovilismo': ['Motor', 'Circuito', 'Velocidad', 'Fórmula'],
        'Sumo': ['Japonés', 'Ring', 'Peso', 'Empuje'],
        'Lucha': ['Contacto', 'Lona', 'Agarre', 'Fuerza']
    },
    'Profesiones': {
        'Médico': ['Salud', 'Bata', 'Hospital', 'Estetoscopio'],
        'Enfermera': ['Salud', 'Hospital', 'Cuidado', 'Inyección'],
        'Profesor': ['Educación', 'Clase', 'Enseñanza', 'Pizarra'],
        'Policía': ['Ley', 'Uniforme', 'Orden', 'Sirena'],
        'Bombero': ['Fuego', 'Manguera', 'Rescate', 'Valiente'],
        'Abogado': ['Ley', 'Juicio', 'Toga', 'Defensa'],
        'Juez': ['Ley', 'Toga', 'Martillo', 'Sentencia'],
        'Arquitecto': ['Edificio', 'Plano', 'Diseño', 'Construcción'],
        'Ingeniero': ['Técnico', 'Cálculo', 'Construcción', 'Proyecto'],
        'Electricista': ['Corriente', 'Cable', 'Voltaje', 'Instalación'],
        'Fontanero': ['Agua', 'Tubería', 'Llave', 'Reparación'],
        'Carpintero': ['Madera', 'Sierra', 'Mueble', 'Martillo'],
        'Mecánico': ['Motor', 'Herramienta', 'Reparación', 'Grasa'],
        'Piloto': ['Avión', 'Vuelo', 'Cabina', 'Altura'],
        'Azafata': ['Avión', 'Servicio', 'Vuelo', 'Uniforme'],
        'Chef': ['Cocina', 'Gorro', 'Restaurante', 'Receta'],
        'Camarero': ['Restaurante', 'Bandeja', 'Servicio', 'Propina'],
        'Panadero': ['Horno', 'Masa', 'Madrugada', 'Aroma'],
        'Carnicero': ['Carne', 'Cuchillo', 'Mostrador', 'Corte'],
        'Pescadero': ['Pescado', 'Hielo', 'Olor', 'Escamas'],
        'Agricultor': ['Campo', 'Cosecha', 'Tierra', 'Sembrar'],
        'Ganadero': ['Animal', 'Campo', 'Leche', 'Cría'],
        'Veterinario': ['Animal', 'Salud', 'Clínica', 'Cuidado'],
        'Dentista': ['Dientes', 'Boca', 'Taladro', 'Blancos'],
        'Farmacéutico': ['Medicamento', 'Receta', 'Pastilla', 'Farmacia'],
        'Periodista': ['Noticia', 'Micrófono', 'Información', 'Redacción'],
        'Fotógrafo': ['Cámara', 'Imagen', 'Flash', 'Lente'],
        'Actor': ['Teatro', 'Película', 'Papel', 'Escenario'],
        'Cantante': ['Voz', 'Micrófono', 'Escenario', 'Melodía'],
        'Músico': ['Instrumento', 'Melodía', 'Escenario', 'Nota'],
        'Pintor': ['Cuadro', 'Pincel', 'Color', 'Lienzo'],
        'Escritor': ['Libro', 'Pluma', 'Historia', 'Palabras'],
        'Contador': ['Números', 'Impuestos', 'Finanzas', 'Calculadora'],
        'Diseñador': ['Creativo', 'Computadora', 'Visual', 'Proyecto'],
        'Programador': ['Código', 'Computadora', 'Software', 'Tecleo'],
        'Científico': ['Laboratorio', 'Experimento', 'Bata', 'Investigación'],
        'Taxista': ['Conductor', 'Ciudad', 'Tarifa', 'Licencia'],
        'Camionero': ['Carretera', 'Carga', 'Grande', 'Volante'],
        'Cartero': ['Correo', 'Bolsa', 'Reparto', 'Uniforme'],
        'Recepcionista': ['Entrada', 'Teléfono', 'Atención', 'Sonrisa'],
        'Limpiador': ['Escoba', 'Limpieza', 'Trapo', 'Detergente'],
        'Jardinero': ['Plantas', 'Tijeras', 'Verde', 'Exterior'],
        'Peluquero': ['Cabello', 'Tijeras', 'Corte', 'Peinado'],
        'Sastre': ['Ropa', 'Aguja', 'Medida', 'Costura'],
        'Zapatero': ['Zapato', 'Reparación', 'Suela', 'Cuero'],
        'Relojero': ['Tiempo', 'Precisión', 'Mecanismo', 'Pequeño'],
        'Cerrajero': ['Llave', 'Cerradura', 'Seguridad', 'Apertura'],
        'Electricista': ['Corriente', 'Voltaje', 'Cable', 'Luz'],
        'Soldador': ['Metal', 'Calor', 'Unión', 'Máscara'],
        'Albañil': ['Construcción', 'Cemento', 'Ladrillo', 'Paleta']
    },
    'Objetos cotidianos': {
        'Mesa': ['Mueble', 'Comer', 'Plana', 'Cuatro'],
        'Silla': ['Mueble', 'Sentarse', 'Respaldo', 'Patas'],
        'Sofá': ['Mueble', 'Sala', 'Cómodo', 'Varios'],
        'Cama': ['Mueble', 'Dormir', 'Colchón', 'Descanso'],
        'Almohada': ['Dormir', 'Cabeza', 'Mullido', 'Funda'],
        'Lámpara': ['Luz', 'Iluminar', 'Bombilla', 'Decoración'],
        'Espejo': ['Reflejo', 'Cristal', 'Imagen', 'Pared'],
        'Reloj': ['Tiempo', 'Manecillas', 'Hora', 'Puntual'],
        'Teléfono': ['Comunicación', 'Llamada', 'Pantalla', 'Móvil'],
        'Televisor': ['Pantalla', 'Imagen', 'Sala', 'Canales'],
        'Ordenador': ['Pantalla', 'Teclado', 'Digital', 'Trabajo'],
        'Teclado': ['Teclas', 'Escribir', 'Letras', 'Ordenador'],
        'Ratón': ['Click', 'Cursor', 'Ordenador', 'Deslizar'],
        'Mando': ['Control', 'Botones', 'Juego', 'Inalámbrico'],
        'Cargador': ['Cable', 'Energía', 'Batería', 'Enchufe'],
        'Bolígrafo': ['Escribir', 'Tinta', 'Azul', 'Claro'],
        'Lápiz': ['Escribir', 'Grafito', 'Borrar', 'Madera'],
        'Libro': ['Páginas', 'Leer', 'Historia', 'Portada'],
        'Cuaderno': ['Páginas', 'Escribir', 'Hojas', 'Espiral'],
        'Mochila': ['Espalda', 'Cargar', 'Cremallera', 'Estudiante'],
        'Maleta': ['Viaje', 'Ruedas', 'Ropa', 'Grande'],
        'Paraguas': ['Lluvia', 'Abrir', 'Tela', 'Protección'],
        'Gafas': ['Vista', 'Cristales', 'Nariz', 'Montura'],
        'Llave': ['Puerta', 'Metal', 'Cerradura', 'Girar'],
        'Cartera': ['Dinero', 'Bolsillo', 'Tarjetas', 'Cuero'],
        'Peine': ['Cabello', 'Púas', 'Desenredar', 'Plástico'],
        'Cepillo': ['Cabello', 'Cerdas', 'Dientes', 'Limpiar'],
        'Toalla': ['Secar', 'Algodón', 'Baño', 'Absorbente'],
        'Jabón': ['Limpiar', 'Espuma', 'Olor', 'Manos'],
        'Champú': ['Cabello', 'Lavar', 'Espuma', 'Botella'],
        'Vela': ['Fuego', 'Cera', 'Luz', 'Olor'],
        'Cortina': ['Ventana', 'Tela', 'Privacidad', 'Colgar'],
        'Alfombra': ['Suelo', 'Tela', 'Decoración', 'Pisada'],
        'Jarrón': ['Flores', 'Cerámica', 'Decoración', 'Agua'],
        'Tijeras': ['Cortar', 'Hojas', 'Metal', 'Filo'],
        'Regla': ['Medir', 'Recta', 'Centímetros', 'Escuela'],
        'Grapadora': ['Unir', 'Papel', 'Grapas', 'Oficina'],
        'Calculadora': ['Números', 'Botones', 'Operaciones', 'Resultado'],
        'Agenda': ['Fechas', 'Citas', 'Páginas', 'Organización'],
        'Calendario': ['Fechas', 'Días', 'Meses', 'Pared'],
        'Despertador': ['Alarma', 'Mañana', 'Hora', 'Sonido'],
        'Ventilador': ['Aire', 'Aspas', 'Fresco', 'Verano'],
        'Radiador': ['Calor', 'Invierno', 'Metal', 'Pared'],
        'Bombilla': ['Luz', 'Rosca', 'Cristal', 'Electricidad'],
        'Enchufe': ['Corriente', 'Pared', 'Conexión', 'Agujeros'],
        'Interruptor': ['Luz', 'Pared', 'Presionar', 'Encender'],
        'Cable': ['Conexión', 'Plástico', 'Electricidad', 'Enrollar'],
        'Batería': ['Energía', 'Portátil', 'Carga', 'Química']
    },
    'Países': {
        'España': ['Europa', 'Madrid', 'Península', 'Ibérico'],
        'Francia': ['Europa', 'París', 'Torre', 'Hexágono'],
        'Italia': ['Europa', 'Roma', 'Bota', 'Pasta'],
        'Alemania': ['Europa', 'Berlín', 'Cerveza', 'Muro'],
        'Portugal': ['Europa', 'Lisboa', 'Atlántico', 'Fado'],
        'Inglaterra': ['Europa', 'Londres', 'Té', 'Reina'],
        'Grecia': ['Europa', 'Atenas', 'Filosofía', 'Antigua'],
        'Rusia': ['Europa', 'Moscú', 'Grande', 'Frío'],
        'Turquía': ['Europa', 'Estambul', 'Bósforo', 'Puente'],
        'Polonia': ['Europa', 'Varsovia', 'Chopin', 'Este'],
        'Holanda': ['Europa', 'Ámsterdam', 'Tulipanes', 'Molinos'],
        'Bélgica': ['Europa', 'Bruselas', 'Chocolate', 'Cerveza'],
        'Suiza': ['Europa', 'Berna', 'Montañas', 'Neutral'],
        'Austria': ['Europa', 'Viena', 'Música', 'Alpes'],
        'Suecia': ['Europa', 'Estocolmo', 'Nórdico', 'IKEA'],
        'Noruega': ['Europa', 'Oslo', 'Fiordos', 'Vikingos'],
        'Dinamarca': ['Europa', 'Copenhague', 'Sirena', 'LEGO'],
        'Finlandia': ['Europa', 'Helsinki', 'Sauna', 'Nokia'],
        'Irlanda': ['Europa', 'Dublín', 'Verde', 'Duende'],
        'Escocia': ['Europa', 'Edimburgo', 'Gaita', 'Whisky'],
        'China': ['Asia', 'Pekín', 'Muralla', 'Dragón'],
        'Japón': ['Asia', 'Tokio', 'Sushi', 'Samurái'],
        'Corea': ['Asia', 'Seúl', 'Tecnología', 'K-pop'],
        'India': ['Asia', 'Delhi', 'Taj', 'Curry'],
        'Tailandia': ['Asia', 'Bangkok', 'Tropical', 'Templos'],
        'Vietnam': ['Asia', 'Hanói', 'Bahía', 'Pho'],
        'Indonesia': ['Asia', 'Yakarta', 'Islas', 'Volcanes'],
        'Filipinas': ['Asia', 'Manila', 'Islas', 'Tropical'],
        'Australia': ['Oceanía', 'Canberra', 'Canguros', 'Grande'],
        'Brasil': ['América', 'Brasilia', 'Amazonas', 'Carnaval'],
        'Argentina': ['América', 'Buenos Aires', 'Tango', 'Carne'],
        'México': ['América', 'Ciudad', 'Azteca', 'Tacos'],
        'Chile': ['América', 'Santiago', 'Largo', 'Montañas'],
        'Perú': ['América', 'Lima', 'Machu', 'Inca'],
        'Colombia': ['América', 'Bogotá', 'Café', 'Esmeralda'],
        'Venezuela': ['América', 'Caracas', 'Petróleo', 'Salto'],
        'Ecuador': ['América', 'Quito', 'Mitad', 'Galápagos'],
        'Uruguay': ['América', 'Montevideo', 'Pequeño', 'Playa'],
        'Estados Unidos': ['América', 'Washington', 'Grande', 'Libertad'],
        'Canadá': ['América', 'Ottawa', 'Grande', 'Frío'],
        'Cuba': ['América', 'Habana', 'Isla', 'Ron'],
        'Jamaica': ['América', 'Kingston', 'Isla', 'Reggae'],
        'Egipto': ['África', 'Cairo', 'Pirámides', 'Nilo'],
        'Sudáfrica': ['África', 'Pretoria', 'Safari', 'Diamantes'],
        'Marruecos': ['África', 'Rabat', 'Desierto', 'Marrakech'],
        'Kenia': ['África', 'Nairobi', 'Safari', 'Corredor'],
        'Nigeria': ['África', 'Abuja', 'Petróleo', 'Poblado'],
        'Islandia': ['Europa', 'Reikiavik', 'Volcanes', 'Aurora'],
        'Nueva Zelanda': ['Oceanía', 'Wellington', 'Kiwi', 'Hobbit']
    },
    'Instrumentos musicales': {
        'Guitarra': ['Cuerdas', 'Seis', 'Púa', 'Traste'],
        'Piano': ['Teclado', 'Blanco', 'Negro', 'Cola'],
        'Batería': ['Percusión', 'Platillos', 'Palos', 'Ritmo'],
        'Violín': ['Cuerdas', 'Arco', 'Clásico', 'Pequeño'],
        'Flauta': ['Viento', 'Tubular', 'Agujeros', 'Soplar'],
        'Trompeta': ['Viento', 'Metal', 'Válvulas', 'Jazz'],
        'Saxofón': ['Viento', 'Metal', 'Curvo', 'Jazz'],
        'Clarinete': ['Viento', 'Madera', 'Negro', 'Boquilla'],
        'Oboe': ['Viento', 'Madera', 'Doble', 'Agudo'],
        'Fagot': ['Viento', 'Madera', 'Grave', 'Grande'],
        'Tuba': ['Viento', 'Metal', 'Grande', 'Grave'],
        'Trombón': ['Viento', 'Metal', 'Varas', 'Deslizar'],
        'Arpa': ['Cuerdas', 'Vertical', 'Ángel', 'Pedales'],
        'Acordeón': ['Viento', 'Fuelle', 'Botones', 'Tango'],
        'Armónica': ['Viento', 'Pequeña', 'Blues', 'Bolsillo'],
        'Pandereta': ['Percusión', 'Sacudir', 'Sonajas', 'Mano'],
        'Tambor': ['Percusión', 'Parche', 'Palo', 'Ritmo'],
        'Maracas': ['Percusión', 'Sacudir', 'Semillas', 'Par'],
        'Xilófono': ['Percusión', 'Láminas', 'Madera', 'Colores'],
        'Triángulo': ['Percusión', 'Metal', 'Forma', 'Varilla'],
        'Castañuelas': ['Percusión', 'Madera', 'Español', 'Flamenco'],
        'Banjo': ['Cuerdas', 'Redondo', 'Country', 'Americano'],
        'Ukelele': ['Cuerdas', 'Pequeño', 'Hawaiano', 'Cuatro'],
        'Órgano': ['Teclado', 'Tubos', 'Iglesia', 'Pedales'],
        'Contrabajo': ['Cuerdas', 'Grande', 'Grave', 'Vertical'],
        'Violonchelo': ['Cuerdas', 'Arco', 'Grande', 'Sentado'],
        'Gaita': ['Viento', 'Bolsa', 'Escocés', 'Tubos'],
        'Bongos': ['Percusión', 'Par', 'Mano', 'Latino'],
        'Conga': ['Percusión', 'Alto', 'Mano', 'Cubano'],
        'Djembe': ['Percusión', 'Africano', 'Mano', 'Copa'],
        'Campanas': ['Percusión', 'Metal', 'Iglesia', 'Sonido'],
        'Gong': ['Percusión', 'Metal', 'Redondo', 'Asiático'],
        'Theremin': ['Electrónico', 'Ondas', 'Sin', 'Misterioso'],
        'Melódica': ['Viento', 'Teclado', 'Soplar', 'Portátil'],
        'Ocarina': ['Viento', 'Cerámica', 'Pequeña', 'Ovalada'],
        'Kazoo': ['Viento', 'Vibración', 'Juguete', 'Zumbido'],
        'Cítara': ['Cuerdas', 'Antigua', 'Griega', 'Pulsada'],
        'Laúd': ['Cuerdas', 'Medieval', 'Pera', 'Antiguo'],
        'Mandolina': ['Cuerdas', 'Pequeña', 'Pera', 'Aguda'],
        'Sitar': ['Cuerdas', 'Indio', 'Largo', 'Resonancia'],
        'Balalaika': ['Cuerdas', 'Ruso', 'Triangular', 'Tres'],
        'Dulcémele': ['Cuerdas', 'Tabla', 'Golpear', 'Martillos'],
        'Cuerno': ['Viento', 'Metal', 'Caza', 'Curvo'],
        'Corneta': ['Viento', 'Metal', 'Militar', 'Señal'],
        'Fliscorno': ['Viento', 'Metal', 'Válvulas', 'Suave'],
        'Bombardino': ['Viento', 'Metal', 'Tenor', 'Banda'],
        'Timbal': ['Percusión', 'Caldera', 'Parche', 'Orquesta'],
        'Platillos': ['Percusión', 'Metal', 'Redondo', 'Choque'],
        'Caja': ['Percusión', 'Parche', 'Bordones', 'Militar'],
        'Bombo': ['Percusión', 'Grande', 'Grave', 'Pedal']
    },
    'Lugares': {
        'Playa': ['Arena', 'Mar', 'Olas', 'Verano'],
        'Montaña': ['Alta', 'Nieve', 'Cumbre', 'Escalada'],
        'Bosque': ['Árboles', 'Verde', 'Naturaleza', 'Animales'],
        'Río': ['Agua', 'Corriente', 'Peces', 'Puente'],
        'Lago': ['Agua', 'Tranquilo', 'Redondo', 'Patos'],
        'Mar': ['Agua', 'Salada', 'Olas', 'Grande'],
        'Océano': ['Agua', 'Enorme', 'Profundo', 'Azul'],
        'Desierto': ['Arena', 'Calor', 'Seco', 'Dunas'],
        'Parque': ['Verde', 'Bancos', 'Niños', 'Árboles'],
        'Jardín': ['Plantas', 'Flores', 'Cuidado', 'Verde'],
        'Plaza': ['Ciudad', 'Centro', 'Gente', 'Fuente'],
        'Calle': ['Ciudad', 'Asfalto', 'Coches', 'Acera'],
        'Avenida': ['Ciudad', 'Ancha', 'Grande', 'Principal'],
        'Biblioteca': ['Libros', 'Silencio', 'Leer', 'Estantes'],
        'Museo': ['Arte', 'Historia', 'Exposición', 'Cultura'],
        'Cine': ['Películas', 'Pantalla', 'Palomitas', 'Oscuro'],
        'Teatro': ['Escenario', 'Obra', 'Actores', 'Butacas'],
        'Hospital': ['Médicos', 'Enfermos', 'Urgencias', 'Camas'],
        'Farmacia': ['Medicamentos', 'Cruz', 'Receta', 'Verde'],
        'Supermercado': ['Compras', 'Carrito', 'Productos', 'Cajas'],
        'Restaurante': ['Comida', 'Camarero', 'Mesa', 'Menú'],
        'Cafetería': ['Café', 'Mesa', 'Charlar', 'Bebidas'],
        'Bar': ['Bebidas', 'Barra', 'Taburete', 'Noche'],
        'Hotel': ['Habitaciones', 'Camas', 'Turistas', 'Recepción'],
        'Aeropuerto': ['Aviones', 'Vuelos', 'Maletas', 'Terminal'],
        'Estación': ['Tren', 'Andén', 'Vías', 'Reloj'],
        'Gimnasio': ['Ejercicio', 'Máquinas', 'Pesas', 'Sudor'],
        'Piscina': ['Agua', 'Nadar', 'Cloro', 'Azul'],
        'Estadio': ['Deporte', 'Grande', 'Gradas', 'Césped'],
        'Iglesia': ['Religión', 'Campana', 'Banco', 'Cruz'],
        'Escuela': ['Niños', 'Clases', 'Pizarra', 'Recreo'],
        'Universidad': ['Estudiantes', 'Carreras', 'Campus', 'Grado'],
        'Oficina': ['Trabajo', 'Escritorio', 'Ordenador', 'Reuniones'],
        'Banco': ['Dinero', 'Cuenta', 'Cajero', 'Seguridad'],
        'Correos': ['Cartas', 'Paquetes', 'Sello', 'Buzón'],
        'Mercado': ['Vendedores', 'Productos', 'Fresco', 'Puestos'],
        'Zoológico': ['Animales', 'Jaulas', 'Visita', 'Cuidadores'],
        'Acuario': ['Peces', 'Agua', 'Cristal', 'Túnel'],
        'Castillo': ['Medieval', 'Piedra', 'Torres', 'Antiguo'],
        'Cueva': ['Oscura', 'Piedra', 'Estalactitas', 'Fresca'],
        'Puente': ['Cruzar', 'Río', 'Arco', 'Estructura'],
        'Túnel': ['Oscuro', 'Paso', 'Montaña', 'Largo'],
        'Puerto': ['Barcos', 'Mar', 'Muelle', 'Carga'],
        'Faro': ['Luz', 'Mar', 'Alto', 'Señal'],
        'Molino': ['Viento', 'Aspas', 'Harina', 'Antiguo'],
        'Granja': ['Animales', 'Campo', 'Granero', 'Tractor'],
        'Viñedo': ['Uvas', 'Vino', 'Filas', 'Campo'],
        'Mina': ['Profunda', 'Mineral', 'Oscura', 'Excavación'],
        'Cantera': ['Piedra', 'Excavación', 'Roca', 'Abierta'],
        'Prisión': ['Celdas', 'Rejas', 'Seguridad', 'Encierro']
    },
    'Marcas famosas': {
        'Nike': ['Deporte', 'Swoosh', 'Just', 'Zapatillas'],
        'Adidas': ['Deporte', 'Tres', 'Rayas', 'Alemana'],
        'Apple': ['Tecnología', 'Manzana', 'iPhone', 'Mac'],
        'Samsung': ['Tecnología', 'Coreana', 'Galaxy', 'Teléfono'],
        'Microsoft': ['Software', 'Windows', 'Bill', 'Ordenador'],
        'Google': ['Internet', 'Buscador', 'Colorido', 'Android'],
        'Amazon': ['Compras', 'Online', 'Flecha', 'Jeff'],
        'Facebook': ['Social', 'Meta', 'Azul', 'Like'],
        'Instagram': ['Social', 'Fotos', 'Cuadrado', 'Stories'],
        'WhatsApp': ['Mensajería', 'Verde', 'Teléfono', 'Chat'],
        'Netflix': ['Streaming', 'Series', 'Rojo', 'N'],
        'Spotify': ['Música', 'Verde', 'Streaming', 'Playlist'],
        'YouTube': ['Vídeos', 'Play', 'Rojo', 'Canal'],
        'McDonalds': ['Comida', 'Arcos', 'Amarillo', 'Hamburguesa'],
        'Burger King': ['Comida', 'Hamburguesa', 'Corona', 'Whopper'],
        'KFC': ['Pollo', 'Rojo', 'Coronel', 'Frito'],
        'Coca Cola': ['Bebida', 'Rojo', 'Burbujas', 'Refresco'],
        'Pepsi': ['Bebida', 'Azul', 'Rojo', 'Refresco'],
        'Starbucks': ['Café', 'Verde', 'Sirena', 'Vasos'],
        'Zara': ['Ropa', 'Español', 'Moda', 'Inditex'],
        'H&M': ['Ropa', 'Sueco', 'Económico', 'Letras'],
        'IKEA': ['Muebles', 'Sueco', 'Amarillo', 'Montaje'],
        'Toyota': ['Coches', 'Japonés', 'Confiable', 'Óvalo'],
        'BMW': ['Coches', 'Alemán', 'Lujo', 'Hélice'],
        'Mercedes': ['Coches', 'Alemán', 'Estrella', 'Lujo'],
        'Ferrari': ['Coches', 'Italiano', 'Rojo', 'Caballo'],
        'PlayStation': ['Videojuegos', 'Sony', 'Consola', 'Mando'],
        'Xbox': ['Videojuegos', 'Microsoft', 'Verde', 'X'],
        'Nintendo': ['Videojuegos', 'Mario', 'Switch', 'Japonés'],
        'Disney': ['Entretenimiento', 'Ratón', 'Castillo', 'Magia'],
        'Visa': ['Pago', 'Tarjeta', 'Azul', 'Oro'],
        'Mastercard': ['Pago', 'Tarjeta', 'Círculos', 'Rojo'],
        'PayPal': ['Pago', 'Online', 'Azul', 'P'],
        'eBay': ['Compras', 'Online', 'Subastas', 'Colores'],
        'Twitter': ['Social', 'Pájaro', 'Azul', 'Texto'],
        'TikTok': ['Social', 'Vídeos', 'Música', 'Nota'],
        'Snapchat': ['Social', 'Fantasma', 'Amarillo', 'Desaparece'],
        'Uber': ['Transporte', 'App', 'Taxi', 'Negro'],
        'Airbnb': ['Alojamiento', 'Casa', 'Viaje', 'Rosado'],
        'Tesla': ['Coches', 'Eléctrico', 'Elon', 'T'],
        'Audi': ['Coches', 'Alemán', 'Aros', 'Lujo'],
        'Volkswagen': ['Coches', 'Alemán', 'Beetle', 'VW'],
        'Ford': ['Coches', 'Americano', 'Óvalo', 'Azul'],
        'Honda': ['Coches', 'Japonés', 'Moto', 'H'],
        'Yamaha': ['Motos', 'Música', 'Diapasones', 'Japonés'],
        'Rolex': ['Reloj', 'Lujo', 'Corona', 'Suizo'],
        'Gucci': ['Moda', 'Lujo', 'GG', 'Italiano'],
        'Louis Vuitton': ['Moda', 'Lujo', 'Marrón', 'LV'],
        'Chanel': ['Moda', 'Lujo', 'CC', 'Francés'],
        'Prada': ['Moda', 'Lujo', 'Negro', 'Italiano']
    },
    'Electrodomésticos': {
        'Nevera': ['Frío', 'Comida', 'Alto', 'Puerta'],
        'Congelador': ['Frío', 'Hielo', 'Temperatura', 'Escarcha'],
        'Horno': ['Cocina', 'Calor', 'Hornear', 'Puerta'],
        'Microondas': ['Cocina', 'Rápido', 'Ondas', 'Girar'],
        'Tostadora': ['Desayuno', 'Pan', 'Dorar', 'Ranuras'],
        'Cafetera': ['Café', 'Mañana', 'Filtro', 'Bebida'],
        'Batidora': ['Cocina', 'Mezclar', 'Cuchillas', 'Velocidad'],
        'Licuadora': ['Cocina', 'Triturar', 'Vaso', 'Líquido'],
        'Freidora': ['Cocina', 'Aceite', 'Calor', 'Crujiente'],
        'Lavadora': ['Ropa', 'Agua', 'Tambor', 'Lavar'],
        'Secadora': ['Ropa', 'Calor', 'Tambor', 'Secar'],
        'Lavavajillas': ['Cocina', 'Platos', 'Agua', 'Lavar'],
        'Aspiradora': ['Limpieza', 'Succión', 'Polvo', 'Ruido'],
        'Plancha': ['Ropa', 'Calor', 'Vapor', 'Alisar'],
        'Ventilador': ['Aire', 'Aspas', 'Fresco', 'Girar'],
        'Calefactor': ['Calor', 'Invierno', 'Aire', 'Temperatura'],
        'Aire acondicionado': ['Frío', 'Verano', 'Split', 'Temperatura'],
        'Televisor': ['Pantalla', 'Imagen', 'Canales', 'Mando'],
        'Radio': ['Música', 'Ondas', 'Emisora', 'Frecuencia'],
        'Exprimidor': ['Zumo', 'Cítrico', 'Girar', 'Líquido'],
        'Robot cocina': ['Cocina', 'Multifunción', 'Automático', 'Mezclar'],
        'Campana extractora': ['Cocina', 'Humo', 'Succión', 'Arriba'],
        'Sandwichera': ['Cocina', 'Pan', 'Calentar', 'Cerrar'],
        'Yogurtera': ['Cocina', 'Lácteo', 'Fermentar', 'Frascos'],
        'Panificadora': ['Cocina', 'Pan', 'Masa', 'Automático'],
        'Vaporera': ['Cocina', 'Vapor', 'Sano', 'Niveles'],
        'Arrocera': ['Cocina', 'Arroz', 'Automático', 'Asiático'],
        'Picadora': ['Cocina', 'Triturar', 'Pequeña', 'Cuchillas'],
        'Molinillo': ['Cocina', 'Café', 'Girar', 'Polvo'],
        'Escalfador': ['Cocina', 'Huevo', 'Agua', 'Vapor'],
        'Fondue': ['Cocina', 'Queso', 'Pinchos', 'Compartido'],
        'Termo': ['Temperatura', 'Líquido', 'Aislante', 'Portátil'],
        'Crock-Pot': ['Cocina', 'Lento', 'Guisos', 'Tiempo'],
        'Waflera': ['Cocina', 'Masa', 'Cuadros', 'Desayuno'],
        'Crepera': ['Cocina', 'Plana', 'Delgada', 'Francesa'],
        'Deshidratador': ['Cocina', 'Secar', 'Frutas', 'Tiempo'],
        'Abrelatas': ['Cocina', 'Lata', 'Cortar', 'Girar'],
        'Sacacorchos': ['Cocina', 'Vino', 'Espiral', 'Botella'],
        'Bascula cocina': ['Cocina', 'Peso', 'Gramos', 'Precisión'],
        'Termómetro cocina': ['Cocina', 'Temperatura', 'Carne', 'Digital'],
        'Temporizador': ['Cocina', 'Tiempo', 'Alarma', 'Cuenta'],
        'Rallador': ['Cocina', 'Queso', 'Agujeros', 'Raspar'],
        'Pelador': ['Cocina', 'Cuchilla', 'Piel', 'Verdura'],
        'Colador': ['Cocina', 'Agujeros', 'Escurrir', 'Pasta'],
        'Escurridor': ['Cocina', 'Platos', 'Secar', 'Rejilla'],
        'Paño cocina': ['Cocina', 'Tela', 'Secar', 'Cuadros'],
        'Manopla': ['Cocina', 'Calor', 'Proteger', 'Mano'],
        'Delantal': ['Cocina', 'Proteger', 'Atar', 'Ropa'],
        'Rodillo': ['Cocina', 'Masa', 'Extender', 'Cilindro'],
        'Cortapastas': ['Cocina', 'Galletas', 'Forma', 'Metal']
    },
    'Superhéroes y personajes': {
        'Superman': ['Capa', 'Volar', 'Fuerte', 'S'],
        'Batman': ['Murciélago', 'Gotham', 'Rico', 'Oscuro'],
        'Spiderman': ['Araña', 'Telaraña', 'Trepar', 'Rojo'],
        'Ironman': ['Armadura', 'Tecnología', 'Tony', 'Rojo'],
        'Hulk': ['Verde', 'Fuerte', 'Enfado', 'Grande'],
        'Thor': ['Martillo', 'Dios', 'Trueno', 'Rubio'],
        'Capitán América': ['Escudo', 'Estrella', 'Soldado', 'Azul'],
        'Wonder Woman': ['Lazo', 'Tiara', 'Fuerte', 'Amazona'],
        'Flash': ['Rayo', 'Velocidad', 'Rojo', 'Rápido'],
        'Aquaman': ['Océano', 'Tridente', 'Peces', 'Rubio'],
        'Viuda Negra': ['Espía', 'Pelirroja', 'Agente', 'Rusa'],
        'Deadpool': ['Rojo', 'Espadas', 'Gracioso', 'Rompe'],
        'Wolverine': ['Garras', 'Mutante', 'Regeneración', 'Pelo'],
        'Sonic': ['Azul', 'Velocidad', 'Anillos', 'Erizo'],
        'Mario': ['Bigote', 'Fontanero', 'Saltar', 'Rojo'],
        'Luigi': ['Verde', 'Bigote', 'Hermano', 'Alto'],
        'Pikachu': ['Amarillo', 'Eléctrico', 'Ratón', 'Rayo'],
        'Mickey Mouse': ['Ratón', 'Orejas', 'Guantes', 'Disney'],
        'Bugs Bunny': ['Conejo', 'Zanahoria', 'Gris', 'Loco'],
        'Pato Donald': ['Pato', 'Azul', 'Enfadado', 'Disney'],
        'Bob Esponja': ['Amarillo', 'Cuadrado', 'Marino', 'Risa'],
        'Homer Simpson': ['Amarillo', 'Calvo', 'Cerveza', 'D\'oh'],
        'Bart Simpson': ['Amarillo', 'Niño', 'Monopatín', 'Travieso'],
        'Goku': ['Saiyajin', 'Naranja', 'Fuerte', 'Pelo'],
        'Naruto': ['Ninja', 'Rubio', 'Ramen', 'Bigotes'],
        'Elsa': ['Hielo', 'Reina', 'Trenza', 'Frozen'],
        'Cenicienta': ['Princesa', 'Zapato', 'Cristal', 'Calabaza'],
        'Blancanieves': ['Princesa', 'Manzana', 'Siete', 'Espejo'],
        'Shrek': ['Ogro', 'Verde', 'Pantano', 'Grande'],
        'Minions': ['Amarillo', 'Pequeño', 'Gafas', 'Plátano'],
        'Scooby Doo': ['Perro', 'Marrón', 'Misterio', 'Cobarde'],
        'Garfield': ['Gato', 'Naranja', 'Lasaña', 'Gordo'],
        'Popeye': ['Marinero', 'Espinacas', 'Pipa', 'Fuerte'],
        'Astérix': ['Galo', 'Pequeño', 'Bigote', 'Poción'],
        'Obélix': ['Galo', 'Grande', 'Fuerte', 'Menhir'],
        'He-Man': ['Musculoso', 'Espada', 'Castillo', 'Pelo'],
        'Doraemon': ['Gato', 'Azul', 'Robot', 'Futuro'],
        'Dora': ['Niña', 'Exploradora', 'Mochila', 'Mapa'],
        'Peppa Pig': ['Cerda', 'Rosa', 'Vestido', 'Hermano'],
        'Pokémon': ['Criatura', 'Captura', 'Evolución', 'Entrenador'],
        'Link': ['Espada', 'Verde', 'Zelda', 'Elfo'],
        'Sonic': ['Azul', 'Velocidad', 'Anillos', 'Erizo'],
        'Pacman': ['Amarillo', 'Redondo', 'Fantasmas', 'Comer'],
        'Donkey Kong': ['Gorila', 'Barril', 'Plátano', 'Fuerte'],
        'Kirby': ['Rosa', 'Redondo', 'Absorber', 'Estrella'],
        'Yoshi': ['Verde', 'Dinosaurio', 'Lengua', 'Huevo'],
        'Crash Bandicoot': ['Naranja', 'Marsupial', 'Cajas', 'Giro']
    },
    'Películas': {
        'Titanic': ['Barco', 'Iceberg', 'Romance', 'Hundimiento'],
        'Avatar': ['Azul', 'Pandora', 'Aliens', 'Selva'],
        'Star Wars': ['Galaxia', 'Laser', 'Fuerza', 'Espacio'],
        'Harry Potter': ['Mago', 'Cicatriz', 'Varita', 'Colegio'],
        'Jurassic Park': ['Dinosaurios', 'Isla', 'ADN', 'Parque'],
        'Matrix': ['Realidad', 'Píldora', 'Virtual', 'Neo'],
        'Frozen': ['Hielo', 'Hermanas', 'Canción', 'Reino'],
        'Toy Story': ['Juguetes', 'Vaquero', 'Astronauta', 'Animación'],
        'El Rey León': ['León', 'Savana', 'Cachorro', 'Musical'],
        'Avengers': ['Superhéroes', 'Equipo', 'Marvel', 'Tierra'],
        'Shrek': ['Ogro', 'Verde', 'Burro', 'Princesa'],
        'Buscando a Nemo': ['Pez', 'Océano', 'Padre', 'Búsqueda'],
        'Los Increíbles': ['Familia', 'Superhéroes', 'Rojo', 'Trajes'],
        'Gladiador': ['Roma', 'Arena', 'Espada', 'Venganza'],
        'Rocky': ['Boxeo', 'Escaleras', 'Campeon', 'Philadelphia'],
        'Terminator': ['Robot', 'Futuro', 'Arnold', 'Cyborg'],
        'Aliens': ['Espacio', 'Xenomorfo', 'Terror', 'Nave'],
        'Indiana Jones': ['Arqueólogo', 'Látigo', 'Sombrero', 'Tesoro'],
        'Regreso al Futuro': ['DeLorean', 'Tiempo', 'Reloj', 'Viaje'],
        'E.T.': ['Alien', 'Niño', 'Bicicleta', 'Dedo'],
        'Rambo': ['Soldado', 'Selva', 'Armas', 'Supervivencia'],
        'Batman': ['Murciélago', 'Gotham', 'Noche', 'Justiciero'],
        'Superman': ['Capa', 'Volar', 'S', 'Krypton'],
        'Spiderman': ['Araña', 'Telaraña', 'Trepar', 'Nueva York'],
        'Iron Man': ['Armadura', 'Tony', 'Tecnología', 'Rojo'],
        'Thor': ['Martillo', 'Dios', 'Trueno', 'Asgard'],
        'Hulk': ['Verde', 'Fuerte', 'Enfado', 'Gigante'],
        'Joker': ['Villano', 'Risa', 'Carta', 'Caos'],
        'Piratas del Caribe': ['Barco', 'Pirata', 'Tesoro', 'Jack'],
        'El Señor de los Anillos': ['Anillo', 'Hobbit', 'Tolkien', 'Épico'],
        'Crepúsculo': ['Vampiro', 'Romance', 'Bosque', 'Luna'],
        'Cincuenta Sombras': ['Romance', 'Gris', 'Adulto', 'Libro'],
        'La La Land': ['Musical', 'Jazz', 'Baile', 'Los Angeles'],
        'Moulin Rouge': ['Musical', 'Rojo', 'Cabaret', 'París'],
        'Chicago': ['Musical', 'Jazz', 'Prisión', 'Años 20'],
        'Grease': ['Musical', 'Rock', 'Años 50', 'Colegio'],
        'Dirty Dancing': ['Baile', 'Verano', 'Romance', 'Levantamiento'],
        'Ghost': ['Fantasma', 'Alfarería', 'Romance', 'Más allá'],
        'Casablanca': ['Blanco', 'Clásico', 'Aeropuerto', 'Guerra'],
        'Lo que el viento se llevó': ['Guerra', 'Sur', 'Plantación', 'Clásico'],
        'Cantando bajo la lluvia': ['Musical', 'Lluvia', 'Clásico', 'Paraguas'],
        'West Side Story': ['Musical', 'Pandillas', 'Nueva York', 'Romeo'],
        'El Mago de Oz': ['Arcoíris', 'Dorothy', 'Zapatos', 'Kansas'],
        'Mary Poppins': ['Niñera', 'Paraguas', 'Chimenea', 'Musical'],
        'Sonrisas y Lágrimas': ['Musical', 'Austria', 'Niños', 'Montaña'],
        'Aladdin': ['Lámpara', 'Genio', 'Alfombra', 'Deseos'],
        'La Bella y la Bestia': ['Rosa', 'Castillo', 'Maldición', 'Amor'],
        'La Sirenita': ['Sirena', 'Océano', 'Voz', 'Príncipe'],
        'Mulan': ['China', 'Guerra', 'Dragón', 'Honor'],
        'Pocahontas': ['Nativa', 'Colores', 'Viento', 'Virginia']
    },
    'Videojuegos': {
        'Minecraft': ['Bloques', 'Creatividad', 'Cuadrado', 'Construir'],
        'Fortnite': ['Battle', 'Construcción', 'Danza', 'Royale'],
        'FIFA': ['Fútbol', 'Equipos', 'Simulador', 'Deporte'],
        'GTA': ['Ciudad', 'Robo', 'Coches', 'Libertad'],
        'Pokemon': ['Criatura', 'Captura', 'Evolución', 'Entrenador'],
        'Zelda': ['Espada', 'Hyrule', 'Aventura', 'Link'],
        'Call of Duty': ['Guerra', 'Disparos', 'Militar', 'FPS'],
        'League of Legends': ['MOBA', 'Campeones', 'Torres', 'Estrategia'],
        'Among Us': ['Impostor', 'Nave', 'Tareas', 'Votar'],
        'Pac-Man': ['Amarillo', 'Laberinto', 'Fantasmas', 'Comer'],
        'Tetris': ['Bloques', 'Caída', 'Líneas', 'Puzzle'],
        'Doom': ['Infierno', 'Disparos', 'Demonios', 'FPS'],
        'Halo': ['Espacial', 'Anillo', 'Soldado', 'Casco'],
        'Assassins Creed': ['Asesino', 'Historia', 'Capucha', 'Parkour'],
        'God of War': ['Griego', 'Kratos', 'Dioses', 'Esparta'],
        'Uncharted': ['Tesoro', 'Escalada', 'Aventura', 'Nathan'],
        'The Last of Us': ['Hongos', 'Apocalipsis', 'Padre', 'Zombis'],
        'Red Dead Redemption': ['Oeste', 'Vaquero', 'Caballo', 'Arthur'],
        'Overwatch': ['Héroes', 'Equipo', 'Habilidades', 'Objetivo'],
        'Counter Strike': ['Terroristas', 'Bombas', 'Disparos', 'Competitivo'],
        'Valorant': ['Agentes', 'Táctico', 'Disparos', 'Spike'],
        'Fall Guys': ['Obstáculos', 'Colorido', 'Caídas', 'Competencia'],
        'Rocket League': ['Coches', 'Fútbol', 'Cohete', 'Aéreo'],
        'Apex Legends': ['Battle', 'Leyendas', 'Royale', 'Escuadra'],
        'Resident Evil': ['Horror', 'Zombis', 'Virus', 'Supervivencia'],
        'Silent Hill': ['Niebla', 'Horror', 'Psicológico', 'Pueblo'],
        'Metal Gear': ['Sigilo', 'Snake', 'Mecha', 'Espionaje'],
        'Final Fantasy': ['RPG', 'Cristales', 'Magia', 'Japonés'],
        'Dragon Ball': ['Saiyajin', 'Ki', 'Peleas', 'Goku'],
        'Street Fighter': ['Lucha', 'Hadouken', 'Arcade', 'Combos'],
        'Mortal Kombat': ['Lucha', 'Fatality', 'Sangre', 'Arcade'],
        'Dark Souls': ['Difícil', 'Medieval', 'Muerte', 'Jefe'],
        'Cuphead': ['Dibujo', 'Difícil', 'Jefe', 'Años 30'],
        'Hollow Knight': ['Insecto', 'Cueva', 'Metroidvania', 'Sombra'],
        'Celeste': ['Montaña', 'Plataforma', 'Difícil', 'Pixel'],
        'Undertale': ['RPG', 'Monstruos', 'Pacifista', 'Indie'],
        'Stardew Valley': ['Granja', 'Cultivo', 'Pueblo', 'Pixel'],
        'Animal Crossing': ['Isla', 'Animales', 'Relax', 'Construcción'],
        'Sims': ['Vida', 'Simulador', 'Casa', 'Personas'],
        'Crash Bandicoot': ['Marsupial', 'Cajas', 'Plataforma', 'Giro'],
        'Spyro': ['Dragón', 'Fuego', 'Gemas', 'Púrpura'],
        'Rayman': ['Limbs', 'Plataforma', 'Pelo', 'Colorido'],
        'Kirby': ['Rosa', 'Redondo', 'Absorber', 'Estrella'],
        'Metroid': ['Armadura', 'Espacial', 'Samus', 'Exploración'],
        'Donkey Kong': ['Gorila', 'Barril', 'Plátano', 'Arcade'],
        'Mega Man': ['Robot', 'Azul', 'Disparo', 'Capcom'],
        'Sonic': ['Azul', 'Velocidad', 'Anillos', 'Erizo'],
        'Castlevania': ['Vampiro', 'Látigo', 'Castillo', 'Gótico'],
        'Contra': ['Disparos', 'Cooperativo', 'Alien', 'Arcade'],
        'Bubble Bobble': ['Dragón', 'Burbujas', 'Arcade', 'Colorido']
    },
    'Ciudades del mundo': {
        'París': ['Francia', 'Torre', 'Amor', 'Luz'],
        'Londres': ['Inglaterra', 'Reloj', 'Niebla', 'Rojo'],
        'Nueva York': ['Estados Unidos', 'Libertad', 'Rascacielos', 'Manzana'],
        'Tokio': ['Japón', 'Neón', 'Tecnología', 'Anime'],
        'Roma': ['Italia', 'Coliseo', 'Antigua', 'Fuente'],
        'Berlín': ['Alemania', 'Muro', 'Puerta', 'Historia'],
        'Madrid': ['España', 'Capital', 'Oso', 'Centro'],
        'Barcelona': ['España', 'Gaudí', 'Sagrada', 'Playa'],
        'Ámsterdam': ['Holanda', 'Canales', 'Bicicleta', 'Tulipanes'],
        'Venecia': ['Italia', 'Canales', 'Góndola', 'Puentes'],
        'Dubái': ['Emiratos', 'Rascacielos', 'Lujo', 'Desierto'],
        'Sidney': ['Australia', 'Ópera', 'Bahía', 'Velas'],
        'Río de Janeiro': ['Brasil', 'Cristo', 'Playa', 'Carnaval'],
        'Buenos Aires': ['Argentina', 'Tango', 'Obelisco', 'Carne'],
        'Ciudad de México': ['México', 'Azteca', 'Grande', 'Tacos'],
        'Moscú': ['Rusia', 'Kremlin', 'Rojo', 'Frío'],
        'Estambul': ['Turquía', 'Bósforo', 'Mezquita', 'Puente'],
        'El Cairo': ['Egipto', 'Pirámides', 'Nilo', 'Antiguo'],
        'Jerusalén': ['Israel', 'Sagrada', 'Muro', 'Religión'],
        'Atenas': ['Grecia', 'Partenón', 'Antigua', 'Filosofía'],
        'Praga': ['Chequia', 'Reloj', 'Cerveza', 'Medieval'],
        'Viena': ['Austria', 'Música', 'Vals', 'Imperial'],
        'Lisboa': ['Portugal', 'Tranvía', 'Fado', 'Azulejo'],
        'Dublin': ['Irlanda', 'Cerveza', 'Verde', 'Pub'],
        'Edimburgo': ['Escocia', 'Castillo', 'Gaita', 'Festival'],
        'Estocolmo': ['Suecia', 'Nórdico', 'Islas', 'Nobel'],
        'Oslo': ['Noruega', 'Fiordo', 'Nobel', 'Vikingos'],
        'Copenhague': ['Dinamarca', 'Sirena', 'Bicicleta', 'Hygge'],
        'Helsinki': ['Finlandia', 'Sauna', 'Nórdico', 'Diseño'],
        'Reikiavik': ['Islandia', 'Volcanes', 'Aurora', 'Géiser'],
        'Varsovia': ['Polonia', 'Chopin', 'Reconstruida', 'Este'],
        'Budapest': ['Hungría', 'Termas', 'Danubio', 'Parlamento'],
        'Cracovia': ['Polonia', 'Medieval', 'Universidad', 'Antigua'],
        'Brujas': ['Bélgica', 'Medieval', 'Canales', 'Chocolate'],
        'Ginebra': ['Suiza', 'Lago', 'Reloj', 'Internacional'],
        'Zúrich': ['Suiza', 'Banco', 'Lago', 'Caro'],
        'Milán': ['Italia', 'Moda', 'Duomo', 'Diseño'],
        'Florencia': ['Italia', 'Renacimiento', 'David', 'Arte'],
        'Nápoles': ['Italia', 'Pizza', 'Volcán', 'Sur'],
        'Sevilla': ['España', 'Giralda', 'Flamenco', 'Feria'],
        'Valencia': ['España', 'Paella', 'Fallas', 'Ciudad'],
        'Málaga': ['España', 'Costa', 'Picasso', 'Playa'],
        'Bilbao': ['España', 'Guggenheim', 'Pintxo', 'Industrial'],
        'San Francisco': ['Estados Unidos', 'Puente', 'Colinas', 'Golden'],
        'Los Ángeles': ['Estados Unidos', 'Hollywood', 'Playa', 'Ángeles'],
        'Las Vegas': ['Estados Unidos', 'Casino', 'Neón', 'Desierto'],
        'Miami': ['Estados Unidos', 'Playa', 'Cubano', 'Fiesta'],
        'Chicago': ['Estados Unidos', 'Viento', 'Rascacielos', 'Jazz'],
        'Boston': ['Estados Unidos', 'Historia', 'Universidad', 'Maratón'],
        'Seattle': ['Estados Unidos', 'Lluvia', 'Café', 'Aguja']
    },
    'Ropa y accesorios': {
        'Camisa': ['Botones', 'Mangas', 'Cuello', 'Torso'],
        'Camiseta': ['Manga', 'Algodón', 'Casual', 'Estampado'],
        'Pantalón': ['Piernas', 'Cintura', 'Bolsillos', 'Largo'],
        'Falda': ['Piernas', 'Femenino', 'Corta', 'Vuelo'],
        'Vestido': ['Femenino', 'Una pieza', 'Elegante', 'Ocasión'],
        'Chaqueta': ['Abrigo', 'Cremallera', 'Manga', 'Casual'],
        'Abrigo': ['Invierno', 'Largo', 'Caliente', 'Exterior'],
        'Jersey': ['Lana', 'Caliente', 'Cuello', 'Invierno'],
        'Sudadera': ['Capucha', 'Cómoda', 'Deporte', 'Algodón'],
        'Zapatos': ['Pies', 'Suela', 'Par', 'Cordones'],
        'Zapatillas': ['Deportivas', 'Cómodas', 'Suela', 'Cordones'],
        'Sandalias': ['Verano', 'Abiertas', 'Tiras', 'Playa'],
        'Botas': ['Altas', 'Invierno', 'Suela', 'Resistentes'],
        'Tacones': ['Altos', 'Femenino', 'Elegante', 'Puntiagudo'],
        'Calcetines': ['Pies', 'Algodón', 'Par', 'Dentro'],
        'Medias': ['Piernas', 'Finas', 'Femenino', 'Nylon'],
        'Ropa interior': ['Debajo', 'Íntimo', 'Algodón', 'Primera'],
        'Sujetador': ['Femenino', 'Pecho', 'Copas', 'Ajuste'],
        'Pijama': ['Dormir', 'Cómodo', 'Noche', 'Casa'],
        'Bata': ['Casa', 'Cinturón', 'Larga', 'Baño'],
        'Traje': ['Elegante', 'Chaqueta', 'Trabajo', 'Formal'],
        'Corbata': ['Masculino', 'Cuello', 'Nudo', 'Formal'],
        'Pajarita': ['Lazo', 'Cuello', 'Elegante', 'Pequeña'],
        'Bufanda': ['Cuello', 'Invierno', 'Larga', 'Abrigar'],
        'Gorro': ['Cabeza', 'Invierno', 'Lana', 'Caliente'],
        'Sombrero': ['Cabeza', 'Ala', 'Sol', 'Elegante'],
        'Gorra': ['Cabeza', 'Visera', 'Deporte', 'Casual'],
        'Guantes': ['Manos', 'Invierno', 'Par', 'Dedos'],
        'Cinturón': ['Cintura', 'Hebilla', 'Cuero', 'Ajustar'],
        'Tirantes': ['Hombros', 'Pantalón', 'Dos', 'Vintage'],
        'Pañuelo': ['Cuello', 'Tela', 'Pequeño', 'Decoración'],
        'Chaleco': ['Sin mangas', 'Sobre', 'Elegante', 'Capa'],
        'Poncho': ['Sudamericano', 'Ancho', 'Sin mangas', 'Tela'],
        'Kimono': ['Japonés', 'Largo', 'Mangas', 'Tradicional'],
        'Bikini': ['Playa', 'Dos piezas', 'Verano', 'Baño'],
        'Bañador': ['Playa', 'Nadar', 'Licra', 'Verano'],
        'Shorts': ['Corto', 'Verano', 'Piernas', 'Casual'],
        'Bermudas': ['Rodilla', 'Verano', 'Casual', 'Pantalón'],
        'Leggings': ['Ajustados', 'Deporte', 'Elástico', 'Piernas'],
        'Mallas': ['Ajustadas', 'Deporte', 'Licra', 'Fitness'],
        'Delantal': ['Cocina', 'Proteger', 'Atar', 'Trabajar'],
        'Mono': ['Una pieza', 'Trabajo', 'Completo', 'Cremallera'],
        'Peto': ['Pantalón', 'Tirantes', 'Pecho', 'Casual'],
        'Blazer': ['Chaqueta', 'Formal', 'Botones', 'Oficina'],
        'Cardigan': ['Botones', 'Abierto', 'Lana', 'Abuela'],
        'Parka': ['Abrigo', 'Capucha', 'Largo', 'Invierno'],
        'Anorak': ['Impermeable', 'Capucha', 'Deporte', 'Viento'],
        'Chubasquero': ['Lluvia', 'Impermeable', 'Capucha', 'Plástico'],
        'Gabardina': ['Larga', 'Elegante', 'Cinturón', 'Clásica'],
        'Smoking': ['Elegante', 'Negro', 'Pajarita', 'Gala']
    }
};

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-indigo-500'];

function App() {
    const [screen, setScreen] = useState('home');
    const [roomCode, setRoomCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [roomData, setRoomData] = useState(null);
    const [myRole, setMyRole] = useState(null);
    const [myClue, setMyClue] = useState(null);
    const [copied, setCopied] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [error, setError] = useState('');
    const [showReveal, setShowReveal] = useState(false);
    const [lastSeen, setLastSeen] = useState({});
    const [showSettings, setShowSettings] = useState(false);

    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const checkRoom = async (code) => {
        try {
            const roomRef = ref(database, `rooms/${code}`);
            const snapshot = await get(roomRef);
            return snapshot.exists() ? snapshot.val() : null;
        } catch (error) {
            console.error('Error checking room:', error);
            return null;
        }
    };

    const saveRoom = async (code, data) => {
        try {
            const roomRef = ref(database, `rooms/${code}`);
            await set(roomRef, data);
        } catch (err) {
            console.error('Error saving room:', err);
        }
    };

    const updatePlayerStatus = async (code, name) => {
        try {
            const room = await checkRoom(code);
            if (room) {
                const playerIndex = room.players.findIndex(p => p.name === name);
                if (playerIndex !== -1) {
                    const playerRef = ref(database, `rooms/${code}/players/${playerIndex}`);
                    await update(playerRef, {
                        lastSeen: Date.now(),
                        status: 'online'
                    });
                }
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const selectWithWeights = (items, weights) => {
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) return i;
        }
        return 0;
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('sala');
        if (code) {
            setInputCode(code.toUpperCase());
            setScreen('join');
        }
    }, []);

    useEffect(() => {
        if (roomCode) {
            const roomRef = ref(database, `rooms/${roomCode}`);
            const unsubscribe = onValue(roomRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setRoomData(data);
                    if (isHost) {
                        const now = Date.now();
                        const newLastSeen = {};
                        data.players.forEach(p => {
                            const timeSinceLastSeen = now - (p.lastSeen || now);
                            newLastSeen[p.name] = timeSinceLastSeen > 10000 ? 'offline' : 'online';
                        });
                        setLastSeen(newLastSeen);
                    }
                }
            });
            return () => unsubscribe();
        }
    }, [roomCode, isHost]);

    useEffect(() => {
        if (roomCode && playerName && (screen === 'lobby' || screen === 'game' || screen === 'results')) {
            const interval = setInterval(() => {
                updatePlayerStatus(roomCode, playerName);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [roomCode, playerName, screen]);

    useEffect(() => {
        if (roomData && screen === 'game' && !myRole) {
            const isImpostor = roomData.impostors?.includes(playerName);
            setMyRole(isImpostor ? 'impostor' : 'crewmate');
            if (isImpostor && roomData.settings.showClue && roomData.clue) {
                setMyClue(roomData.clue);
            }
            setTimeout(() => setShowReveal(true), 500);
        }
    }, [roomData, screen, playerName, myRole]);

    useEffect(() => {
        if (roomData?.status === 'game' && screen === 'lobby') setScreen('game');
        if (roomData?.status === 'results' && screen === 'game') setScreen('results');
        if (roomData?.status === 'lobby' && (screen === 'results' || screen === 'game')) {
            setScreen('lobby');
            setMyRole(null);
            setMyClue(null);
            setShowReveal(false);
        }
    }, [roomData?.status, screen]);

    const createRoom = async () => {
        if (!playerName.trim()) {
            setError('Por favor ingresa tu nombre');
            return;
        }
        const code = generateCode();
        const newRoom = {
            code,
            host: playerName,
            players: [{ name: playerName, color: COLORS[0], lastSeen: Date.now(), status: 'online', impostorWeight: 1, startWeight: 1 }],
            selectedCategories: Object.keys(WORDS_WITH_CLUES),
            settings: {
                showCategory: true,
                showClue: true,
                impostorCount: 1
            },
            status: 'lobby',
            word: null,
            impostors: [],
            round: 0,
            clueWeights: {},
            turnOrder: []
        };
        await saveRoom(code, newRoom);
        setRoomCode(code);
        setIsHost(true);
        setScreen('lobby');
    };

    const joinRoom = async () => {
        if (!playerName.trim()) {
            setError('Por favor ingresa tu nombre');
            return;
        }
        if (!inputCode.trim()) {
            setError('Por favor ingresa el código');
            return;
        }
        const code = inputCode.toUpperCase();
        const room = await checkRoom(code);
        if (!room) {
            setError('Sala no encontrada');
            return;
        }
        if (room.players.length >= 10) {
            setError('Sala llena (máximo 10 jugadores)');
            return;
        }
        if (room.status !== 'lobby') {
            setError('La partida ya comenzó');
            return;
        }
        const existingPlayer = room.players.find(p => p.name.toLowerCase() === playerName.toLowerCase());
        if (existingPlayer) {
            existingPlayer.lastSeen = Date.now();
            existingPlayer.status = 'online';
            await saveRoom(code, room);
            setRoomCode(code);
            setIsHost(room.host === playerName);
            setScreen('lobby');
            return;
        }
        const colorIndex = room.players.length % COLORS.length;
        room.players.push({
            name: playerName,
            color: COLORS[colorIndex],
            lastSeen: Date.now(),
            status: 'online',
            impostorWeight: 1,
            startWeight: 1
        });
        await saveRoom(code, room);
        setRoomCode(code);
        setIsHost(false);
        setScreen('lobby');
    };

    const removePlayer = async (playerToRemove) => {
        if (!isHost) return;
        const room = await checkRoom(roomCode);
        room.players = room.players.filter(p => p.name !== playerToRemove);
        if (room.players.length === 0) return;
        if (room.host === playerToRemove) {
            room.host = room.players[0].name;
        }
        await saveRoom(roomCode, room);
    };

    const startGame = async () => {
        const room = await checkRoom(roomCode);
        if (room.players.length < 2) {
            setError('Mínimo 2 jugadores para comenzar');
            return;
        }
        if (room.settings.impostorCount >= room.players.length) {
            setError('Debe haber al menos 1 tripulante');
            return;
        }
        if (!room.selectedCategories || room.selectedCategories.length === 0) {
            setError('Selecciona al menos una categoría');
            return;
        }

        const randomCategory = room.selectedCategories[Math.floor(Math.random() * room.selectedCategories.length)];
        const words = Object.keys(WORDS_WITH_CLUES[randomCategory]);
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const clues = WORDS_WITH_CLUES[randomCategory][randomWord];

        if (!room.clueWeights[randomWord]) {
            room.clueWeights[randomWord] = clues.map(() => 1);
        }

        let selectedImpostors = [];
        let availablePlayers = [...room.players];
        for (let i = 0; i < room.settings.impostorCount; i++) {
            if (availablePlayers.length === 0) break;
            const weights = availablePlayers.map(p => p.impostorWeight || 1);
            const idx = selectWithWeights(availablePlayers, weights);
            selectedImpostors.push(availablePlayers[idx].name);
            availablePlayers.splice(idx, 1);
        }

        room.players.forEach(p => {
            p.impostorWeight = selectedImpostors.includes(p.name) ? 0.3 : Math.min((p.impostorWeight || 1) * 1.2, 2);
        });

        let selectedClue = null;
        if (room.settings.showClue) {
            const clueWeights = room.clueWeights[randomWord];
            const clueIdx = selectWithWeights(clues, clueWeights);
            selectedClue = clues[clueIdx];
            room.clueWeights[randomWord][clueIdx] = 0.2;
            room.clueWeights[randomWord] = room.clueWeights[randomWord].map((w, i) => i === clueIdx ? 0.2 : Math.min(w * 1.3, 2));
        }

        const startWeights = room.players.map(p => p.startWeight || 1);
        const startIdx = selectWithWeights(room.players, startWeights);
        const startPlayer = room.players[startIdx];
        room.players[startIdx].startWeight = 0.4;
        room.players.forEach((p, i) => {
            if (i !== startIdx) p.startWeight = Math.min((p.startWeight || 1) * 1.2, 2);
        });

        const turnOrder = [startPlayer.name];
        let remaining = room.players.filter(p => p.name !== startPlayer.name);
        while (remaining.length > 0) {
            const randIdx = Math.floor(Math.random() * remaining.length);
            turnOrder.push(remaining[randIdx].name);
            remaining.splice(randIdx, 1);
        }

        room.status = 'game';
        room.currentCategory = randomCategory;
        room.word = randomWord;
        room.impostors = selectedImpostors;
        room.clue = selectedClue;
        room.round++;
        room.turnOrder = turnOrder;

        await saveRoom(roomCode, room);
        setScreen('game');
    };

    const endRound = async () => {
        const room = await checkRoom(roomCode);
        room.status = 'results';
        await saveRoom(roomCode, room);
        setScreen('results');
    };

    const newRound = async () => {
        const room = await checkRoom(roomCode);
        room.status = 'lobby';
        room.word = null;
        room.impostors = [];
        room.currentCategory = null;
        room.clue = null;
        room.turnOrder = [];
        await saveRoom(roomCode, room);
        setScreen('lobby');
        setMyRole(null);
        setMyClue(null);
        setShowReveal(false);
    };

    const changeCategory = async (cat) => {
        const room = await checkRoom(roomCode);
        if (room.selectedCategories.includes(cat)) {
            room.selectedCategories = room.selectedCategories.filter(c => c !== cat);
            if (room.selectedCategories.length === 0) room.selectedCategories = [cat];
        } else {
            room.selectedCategories.push(cat);
        }
        await saveRoom(roomCode, room);
    };

    const toggleAllCategories = async (selectAll) => {
        const room = await checkRoom(roomCode);
        room.selectedCategories = selectAll ? Object.keys(WORDS_WITH_CLUES) : ['Animales'];
        await saveRoom(roomCode, room);
    };

    const updateSettings = async (setting, value) => {
        const room = await checkRoom(roomCode);
        room.settings[setting] = value;
        await saveRoom(roomCode, room);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyLink = () => {
        const link = `${window.location.origin}${window.location.pathname}?sala=${roomCode}`;
        navigator.clipboard.writeText(link);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    if (screen === 'home' || screen === 'join') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4 animate-bounce">🕵️</div>
                        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-600 to-blue-600 mb-2">IMPOSTOR</h1>
                        <p className="text-gray-600 font-medium">¿Quién no sabe la palabra?</p>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={playerName}
                            onChange={(e) => { setPlayerName(e.target.value); setError(''); }}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                            maxLength={15}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                        {screen === 'join' && (
                            <input
                                type="text"
                                placeholder="Código de sala"
                                value={inputCode}
                                onChange={(e) => { setInputCode(e.target.value.toUpperCase()); setError(''); }}
                                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none uppercase transition-all"
                                maxLength={6}
                            />
                        )}
                        {screen === 'home' && (
                            <>
                                <button onClick={createRoom} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg active:scale-95">
                                    Crear Sala
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <span className="text-gray-400 text-sm font-medium">o</span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>
                                <button onClick={() => setScreen('join')} className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg active:scale-95">
                                    Unirse a Sala
                                </button>
                            </>
                        )}
                        {screen === 'join' && (
                            <>
                                <button onClick={joinRoom} className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg active:scale-95">
                                    Unirse
                                </button>
                                <button onClick={() => { setScreen('home'); setInputCode(''); setError(''); }} className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-all">
                                    Volver
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (screen === 'lobby') {
        const maxImpostors = (roomData?.players.length || 1) - 1;

        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-4">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Código de Sala</h2>
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <div className="text-4xl font-bold text-purple-600 tracking-wider bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-xl shadow-inner">
                                    {roomCode}
                                </div>
                                <button onClick={copyCode} className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all transform hover:scale-110 active:scale-95 shadow-lg" title="Copiar código">
                                    {copied ? <Check size={24} /> : <Copy size={24} />}
                                </button>
                            </div>
                            <button onClick={copyLink} className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                                <Share2 size={18} />
                                {copiedLink ? '¡Enlace copiado!' : 'Compartir enlace'}
                            </button>
                        </div>

                        {isHost && (
                            <>
                                <div className="mb-4">
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        className="flex items-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all"
                                    >
                                        <Settings size={20} />
                                        <span className="font-semibold">Configuración</span>
                                    </button>
                                </div>
                                {showSettings && (
                                    <div className="mb-6 space-y-4 bg-gradient-to-br from-gray-50 to-purple-50 p-4 rounded-xl border-2 border-purple-100">
                                        <div>
                                            <label className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer">
                                                <span className="font-medium text-gray-700">Mostrar categoría a todos</span>
                                                <input
                                                    type="checkbox"
                                                    checked={roomData?.settings?.showCategory}
                                                    onChange={(e) => updateSettings('showCategory', e.target.checked)}
                                                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer">
                                                <span className="font-medium text-gray-700">Dar pista al impostor</span>
                                                <input
                                                    type="checkbox"
                                                    checked={roomData?.settings?.showClue}
                                                    onChange={(e) => updateSettings('showClue', e.target.checked)}
                                                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Número de impostores: {roomData?.settings?.impostorCount || 1}</label>
                                            <input
                                                type="range"
                                                min="1"
                                                max={maxImpostors}
                                                value={roomData?.settings?.impostorCount || 1}
                                                onChange={(e) => updateSettings('impostorCount', parseInt(e.target.value))}
                                                className="w-full accent-purple-600"
                                            />
                                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                                <span>1</span>
                                                <span>{maxImpostors}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-semibold mb-3">Categorías seleccionadas:</label>
                                    <div className="space-y-2 max-h-60 overflow-y-auto bg-gradient-to-br from-gray-50 to-purple-50 p-3 rounded-xl border-2 border-purple-100">
                                        <label className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-all hover:shadow-md">
                                            <input
                                                type="checkbox"
                                                checked={roomData?.selectedCategories?.length === Object.keys(WORDS_WITH_CLUES).length}
                                                onChange={(e) => toggleAllCategories(e.target.checked)}
                                                className="w-5 h-5 accent-purple-600 cursor-pointer"
                                            />
                                            <span className="font-bold text-purple-600">✨ Todas las categorías</span>
                                        </label>
                                        <div className="h-px bg-gray-300 my-2"></div>
                                        {Object.keys(WORDS_WITH_CLUES).map(cat => (
                                            <label key={cat} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-all hover:shadow-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={roomData?.selectedCategories?.includes(cat)}
                                                    onChange={() => changeCategory(cat)}
                                                    className="w-5 h-5 accent-purple-600 cursor-pointer"
                                                />
                                                <span className="text-gray-700 font-medium">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {!isHost && (
                            <div className="mb-6 text-center">
                                <p className="text-lg text-gray-700 mb-3 font-semibold">Categorías activas:</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {roomData?.selectedCategories?.map(cat => (
                                        <span key={cat} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Users size={20} className="text-gray-600" />
                                <h3 className="text-lg font-semibold text-gray-800">Jugadores ({roomData?.players.length || 0})</h3>
                            </div>
                            <div className="space-y-2">
                                {roomData?.players.map((player, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color.split('-')[1]}-100 to-white shadow-sm hover:shadow-md transition-all`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full ${player.color} flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                                                {player.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-gray-800">{player.name}</span>
                                            {roomData?.host === player.name && <Crown size={16} className="text-yellow-500" />}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {(lastSeen[player.name] || player.status) === 'online' ? (
                                                <Wifi size={16} className="text-green-500" />
                                            ) : (
                                                <WifiOff size={16} className="text-red-500" />
                                            )}
                                            {isHost && player.name !== playerName && (
                                                <button
                                                    onClick={() => removePlayer(player.name)}
                                                    className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                                    title="Expulsar"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isHost && (
                            <button
                                onClick={startGame}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg active:scale-95"
                                disabled={roomData?.players.length < 2}
                            >
                                {roomData?.players.length < 2 ? 'Esperando más jugadores...' : 'Comenzar Partida'}
                            </button>
                        )}

                        {error && (
                            <div className="mt-4 flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (screen === 'game') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="max-w-md mx-auto relative z-10">
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ronda {roomData?.round}</h2>
                            {roomData?.settings?.showCategory && (
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl mb-4">
                                    <p className="text-xl font-semibold text-purple-700">Categoría: {roomData?.currentCategory}</p>
                                </div>
                            )}
                            {showReveal && (
                                <div className="animate__animated animate__fadeIn">
                                    {myRole === 'impostor' ? (
                                        <div>
                                            <div className="text-4xl font-black text-red-600 mb-4 animate-bounce">¡ERES EL IMPOSTOR!</div>
                                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl mb-4">
                                                <p className="text-xl font-semibold text-purple-700">Categoría: {roomData?.currentCategory}</p>
                                            </div>
                                            {roomData?.settings?.showClue && myClue && (
                                                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl mb-4">
                                                    <p className="text-lg font-semibold text-orange-700">Pista: {myClue}</p>
                                                </div>
                                            )}
                                            {!roomData?.settings?.showClue && (
                                                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl mb-4">
                                                    <p className="text-lg font-medium text-gray-600">Sin pista... ¡improvisa!</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-2xl font-bold text-gray-700 mb-2">{playerName}</p>
                                            <p className="text-4xl font-black text-blue-600 animate-pulse mb-4">{roomData?.word}</p>
                                            {roomData?.settings?.showCategory && (
                                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl">
                                                    <p className="text-lg font-semibold text-purple-700">Categoría: {roomData?.currentCategory}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {roomData?.turnOrder && roomData.turnOrder.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Orden de turnos</h3>
                                <div className="space-y-2">
                                    {roomData.turnOrder.map((name, idx) => {
                                        const player = roomData.players.find(p => p.name === name);
                                        return (
                                            <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl ${idx === 0 ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 shadow-md' : 'bg-gradient-to-r from-gray-100 to-white'}`}>
                                                <span className="font-bold text-gray-600 w-6">{idx + 1}.</span>
                                                <div className={`w-8 h-8 rounded-full ${player?.color || 'bg-gray-500'} flex items-center justify-center text-white font-bold shadow-inner`}>
                                                    {name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-700">{name}</span>
                                                {idx === 0 && <span className="ml-auto text-yellow-600 font-bold">🎯 Empieza</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Jugadores</h3>
                            <div className="space-y-2">
                                {roomData?.players.map((player, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color.split('-')[1]}-100 to-white shadow-sm`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white font-bold`}>
                                                {player.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-700">{player.name}</span>
                                            {roomData?.host === player.name && <Crown size={14} className="text-yellow-500" />}
                                        </div>
                                        {(lastSeen[player.name] || player.status) === 'online' ? (
                                            <Wifi size={14} className="text-green-500" />
                                        ) : (
                                            <WifiOff size={14} className="text-red-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isHost && (
                            <button
                                onClick={endRound}
                                className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold py-4 rounded-xl hover:from-red-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg active:scale-95"
                            >
                                Terminar Ronda y Revelar Impostor
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (screen === 'results') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="max-w-md mx-auto relative z-10">
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Ronda Terminada!</h2>
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl mb-4">
                                <p className="text-xl font-semibold text-purple-700">Categoría: {roomData?.currentCategory}</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">Palabra: {roomData?.word}</p>
                            </div>
                            <div className="text-3xl font-black text-red-600 mb-4 animate-bounce">
                                {roomData?.impostors && roomData.impostors.length > 1 ? '¡Los impostores eran:' : '¡El impostor era:'}
                            </div>
                            <div className="space-y-2">
                                {roomData?.impostors?.map((impostor, idx) => (
                                    <div key={idx} className="text-2xl font-bold text-red-500">
                                        {impostor}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Jugadores</h3>
                            <div className="space-y-2">
                                {roomData?.players.map((player, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color.split('-')[1]}-100 to-white shadow-sm`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white font-bold`}>
                                                {player.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-700">{player.name}</span>
                                            {roomData?.host === player.name && <Crown size={14} className="text-yellow-500" />}
                                            {roomData?.impostors?.includes(player.name) && <span className="text-red-600 font-bold ml-2">← IMPOSTOR</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {isHost && (
                            <button
                                onClick={newRound}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg active:scale-95"
                            >
                                Nueva Ronda
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default App;