import React, { useState, useEffect } from 'react';
import { Users, Copy, Check, Crown, AlertCircle, Share2, Wifi, WifiOff } from 'lucide-react';
import { database } from './firebase';
import { ref, set, get, onValue, update } from 'firebase/database';

const CATEGORIES = {
    'Animales': ['Perro', 'Gato', 'León', 'Tigre', 'Elefante', 'Jirafa', 'Mono', 'Cebra', 'Hipopótamo', 'Rinoceronte', 'Oso', 'Lobo', 'Zorro', 'Conejo', 'Ardilla', 'Ratón', 'Caballo', 'Vaca', 'Cerdo', 'Oveja', 'Gallina', 'Pato', 'Pavo', 'Águila', 'Búho', 'Loro', 'Delfín', 'Ballena', 'Tiburón', 'Pingüino', 'Foca', 'Cocodrilo', 'Serpiente', 'Tortuga', 'Rana', 'Canguro', 'Koala', 'Panda', 'Camello', 'Gorila'],
    'Comidas': ['Pizza', 'Hamburguesa', 'Pasta', 'Paella', 'Sushi', 'Tacos', 'Burrito', 'Ensalada', 'Sopa', 'Arroz', 'Pollo', 'Carne', 'Pescado', 'Jamón', 'Queso', 'Pan', 'Bocadillo', 'Croissant', 'Helado', 'Tarta', 'Pastel', 'Galletas', 'Chocolate', 'Caramelo', 'Palomitas', 'Patatas fritas', 'Nuggets', 'Hot dog', 'Tortilla', 'Empanada', 'Churros', 'Donut', 'Muffin', 'Sandwich', 'Wrap', 'Lasaña', 'Risotto', 'Ceviche', 'Guacamole', 'Nachos'],
    'Deportes': ['Fútbol', 'Baloncesto', 'Tenis', 'Voleibol', 'Béisbol', 'Golf', 'Natación', 'Atletismo', 'Ciclismo', 'Boxeo', 'Karate', 'Judo', 'Taekwondo', 'Esgrima', 'Gimnasia', 'Esquí', 'Snowboard', 'Surf', 'Patinaje', 'Hockey', 'Rugby', 'Balonmano', 'Waterpolo', 'Ping pong', 'Badminton', 'Escalada', 'Equitación', 'Remo', 'Vela', 'Halterofilia', 'Parapente', 'Paracaidismo', 'Buceo', 'Triatlón', 'Maratón', 'Crossfit', 'Yoga', 'Pilates', 'Zumba', 'Spinning'],
    'Profesiones': ['Médico', 'Enfermera', 'Profesor', 'Policía', 'Bombero', 'Abogado', 'Juez', 'Arquitecto', 'Ingeniero', 'Electricista', 'Fontanero', 'Carpintero', 'Mecánico', 'Piloto', 'Azafata', 'Chef', 'Camarero', 'Panadero', 'Carnicero', 'Granjero', 'Veterinario', 'Dentista', 'Farmacéutico', 'Periodista', 'Fotógrafo', 'Actor', 'Cantante', 'Músico', 'Pintor', 'Escritor', 'Contador', 'Diseñador', 'Programador', 'Científico', 'Agricultor', 'Pescador', 'Taxista', 'Camionero', 'Cartero', 'Recepcionista'],
    'Objetos cotidianos': ['Mesa', 'Silla', 'Sofá', 'Cama', 'Almohada', 'Lámpara', 'Espejo', 'Reloj', 'Teléfono', 'Televisor', 'Ordenador', 'Teclado', 'Ratón', 'Mando', 'Cargador', 'Bolígrafo', 'Lápiz', 'Libro', 'Cuaderno', 'Mochila', 'Maleta', 'Paraguas', 'Gafas', 'Llave', 'Cartera', 'Peine', 'Cepillo', 'Toalla', 'Jabón', 'Champú', 'Vela', 'Cortina', 'Alfombra', 'Jarrón', 'Marco', 'Tijeras', 'Regla', 'Grapadora', 'Calculadora', 'Agenda'],
    'Países': ['España', 'Francia', 'Italia', 'Alemania', 'Portugal', 'Inglaterra', 'Grecia', 'Rusia', 'Turquía', 'Polonia', 'Holanda', 'Bélgica', 'Suiza', 'Austria', 'Suecia', 'Noruega', 'Dinamarca', 'Finlandia', 'Irlanda', 'Escocia', 'China', 'Japón', 'Corea', 'India', 'Tailandia', 'Vietnam', 'Indonesia', 'Filipinas', 'Australia', 'Brasil', 'Argentina', 'México', 'Chile', 'Perú', 'Colombia', 'Venezuela', 'Ecuador', 'Uruguay', 'Estados Unidos', 'Canadá'],
    'Instrumentos musicales': ['Guitarra', 'Piano', 'Batería', 'Violín', 'Flauta', 'Trompeta', 'Saxofón', 'Clarinete', 'Oboe', 'Fagot', 'Tuba', 'Trombón', 'Arpa', 'Acordeón', 'Armónica', 'Pandereta', 'Tambor', 'Maracas', 'Xilófono', 'Triángulo', 'Castañuelas', 'Banjo', 'Ukelele', 'Órgano', 'Contrabajo', 'Violonchelo', 'Gaita', 'Bongos', 'Conga', 'Djembe', 'Campanas', 'Gong', 'Theremin', 'Melódica', 'Ocarina'],
    'Lugares': ['Playa', 'Montaña', 'Bosque', 'Río', 'Lago', 'Mar', 'Océano', 'Desierto', 'Parque', 'Jardín', 'Plaza', 'Calle', 'Avenida', 'Biblioteca', 'Museo', 'Cine', 'Teatro', 'Hospital', 'Farmacia', 'Supermercado', 'Restaurante', 'Cafetería', 'Bar', 'Hotel', 'Aeropuerto', 'Estación', 'Gimnasio', 'Piscina', 'Estadio', 'Iglesia', 'Escuela', 'Universidad', 'Oficina', 'Banco', 'Correos', 'Mercado', 'Zoológico', 'Acuario', 'Castillo', 'Cueva'],
    'Marcas famosas': ['Nike', 'Adidas', 'Puma', 'Apple', 'Samsung', 'Huawei', 'Microsoft', 'Google', 'Amazon', 'Facebook', 'Instagram', 'WhatsApp', 'Netflix', 'Spotify', 'YouTube', 'McDonalds', 'Burger King', 'KFC', 'Coca-Cola', 'Pepsi', 'Starbucks', 'Zara', 'H&M', 'IKEA', 'Toyota', 'BMW', 'Mercedes', 'Ferrari', 'PlayStation', 'Xbox', 'Nintendo', 'Disney', 'Visa', 'Mastercard', 'PayPal', 'eBay', 'Twitter', 'TikTok', 'Snapchat', 'Uber'],
    'Electrodomésticos': ['Nevera', 'Congelador', 'Horno', 'Microondas', 'Tostadora', 'Cafetera', 'Batidora', 'Licuadora', 'Freidora', 'Lavadora', 'Secadora', 'Lavavajillas', 'Aspiradora', 'Plancha', 'Ventilador', 'Calefactor', 'Aire acondicionado', 'Televisor', 'Radio', 'Exprimidor', 'Robot de cocina', 'Campana extractora', 'Sandwichera', 'Yogurtera', 'Panificadora', 'Vaporera', 'Arrocera', 'Picadora', 'Molinillo', 'Escalfador', 'Fondue', 'Termo'],
    'Superhéroes': ['Superman', 'Batman', 'Spider-Man', 'Ironman', 'Hulk', 'Thor', 'Capitán América', 'Viuda Negra', 'Flash', 'Aquaman', 'Wonder Woman', 'Deadpool', 'Wolverine', 'Sonic', 'Mario', 'Luigi', 'Pikachu', 'Mickey Mouse', 'Bugs Bunny', 'Pato Donald', 'Bob Esponja', 'Homer Simpson', 'Bart Simpson', 'Goku', 'Naruto', 'Elsa', 'Cenicienta', 'Blancanieves', 'Shrek', 'Minions', 'Scooby Doo', 'Garfield', 'Popeye', 'Astérix', 'Obélix', 'He-Man', 'Doraemon', 'Dora', 'Peppa Pig', 'Pokémon']
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
    const [copied, setCopied] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [error, setError] = useState('');
    const [showReveal, setShowReveal] = useState(false);
    const [lastSeen, setLastSeen] = useState({});
    const [isOnline, setIsOnline] = useState(true);

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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('sala');
        if (code) {
            setInputCode(code.toUpperCase());
            setScreen('join');
        }
    }, []);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
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

    const createRoom = async () => {
        if (!playerName.trim()) {
            setError('Por favor ingresa tu nombre');
            return;
        }
        const code = generateCode();
        const newRoom = {
            code,
            host: playerName,
            players: [{ name: playerName, color: COLORS[0], lastSeen: Date.now(), status: 'online' }],
            selectedCategories: Object.keys(CATEGORIES),
            status: 'lobby',
            word: null,
            impostor: null,
            round: 0
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
        const existingPlayer = room.players.find(p => p.name === playerName);
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
            status: 'online'
        });
        await saveRoom(code, room);
        setRoomCode(code);
        setIsHost(false);
        setScreen('lobby');
    };

    const startGame = async () => {
        const room = await checkRoom(roomCode);
        if (room.players.length < 3) {
            setError('Mínimo 3 jugadores para comenzar');
            return;
        }
        if (!room.selectedCategories || room.selectedCategories.length === 0) {
            setError('Selecciona al menos una categoría');
            return;
        }
        const randomCategory = room.selectedCategories[Math.floor(Math.random() * room.selectedCategories.length)];
        const words = CATEGORIES[randomCategory];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomImpostor = Math.floor(Math.random() * room.players.length);
        room.status = 'game';
        room.currentCategory = randomCategory;
        room.word = randomWord;
        room.impostor = room.players[randomImpostor].name;
        room.round++;
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
        room.impostor = null;
        room.currentCategory = null;
        await saveRoom(roomCode, room);
        setScreen('lobby');
        setMyRole(null);
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
        room.selectedCategories = selectAll ? Object.keys(CATEGORIES) : ['Animales'];
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

    useEffect(() => {
        if (roomData && screen === 'game' && !myRole) {
            const isImpostor = roomData.impostor === playerName;
            setMyRole(isImpostor ? 'impostor' : 'crewmate');
            setTimeout(() => setShowReveal(true), 500);
        }
    }, [roomData, screen, playerName, myRole]);

    useEffect(() => {
        if (roomData?.status === 'game' && screen === 'lobby') setScreen('game');
        if (roomData?.status === 'results' && screen === 'game') setScreen('results');
        if (roomData?.status === 'lobby' && (screen === 'results' || screen === 'game')) {
            setScreen('lobby');
            setMyRole(null);
            setShowReveal(false);
        }
    }, [roomData?.status, screen]);

    // Pantallas...
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
                            <div className="mb-6">
                                <label className="block text-gray-700 font-semibold mb-3">Categorías seleccionadas:</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto bg-gradient-to-br from-gray-50 to-purple-50 p-3 rounded-xl border-2 border-purple-100">
                                    <label className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-all hover:shadow-md">
                                        <input
                                            type="checkbox"
                                            checked={roomData?.selectedCategories?.length === Object.keys(CATEGORIES).length}
                                            onChange={(e) => toggleAllCategories(e.target.checked)}
                                            className="w-5 h-5 accent-purple-600 cursor-pointer"
                                        />
                                        <span className="font-bold text-purple-600">✨ Todas las categorías</span>
                                    </label>
                                    <div className="h-px bg-gray-300 my-2"></div>
                                    {Object.keys(CATEGORIES).map(cat => (
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
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color}-100 to-white shadow-sm hover:shadow-md transition-all`}>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isHost && (
                            <button
                                onClick={startGame}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg active:scale-95"
                                disabled={roomData?.players.length < 3}
                            >
                                {roomData?.players.length < 3 ? 'Esperando más jugadores...' : 'Comenzar Partida'}
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
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl mb-4">
                                <p className="text-xl font-semibold text-purple-700">Categoría: {roomData?.currentCategory}</p>
                            </div>
                            {showReveal && (
                                <div className="animate__animated animate__fadeIn">
                                    {myRole === 'impostor' ? (
                                        <div className="text-4xl font-black text-red-600 mb-4 animate-bounce">¡ERES EL IMPOSTOR!</div>
                                    ) : (
                                        <>
                                            <p className="text-2xl font-bold text-green-600 mb-2">Eres tripulante</p>
                                            <p className="text-4xl font-black text-blue-600 animate-pulse">{roomData?.word}</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Jugadores</h3>
                            <div className="space-y-2">
                                {roomData?.players.map((player, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color}-100 to-white shadow-sm`}>
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
                            <div className="text-4xl font-black text-red-600 mb-4 animate-bounce">¡El impostor era {roomData?.impostor}!</div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Jugadores</h3>
                            <div className="space-y-2">
                                {roomData?.players.map((player, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-${player.color}-100 to-white shadow-sm`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white font-bold`}>
                                                {player.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-700">{player.name}</span>
                                            {roomData?.host === player.name && <Crown size={14} className="text-yellow-500" />}
                                            {roomData?.impostor === player.name && <span className="text-red-600 font-bold ml-2">← IMPOSTOR</span>}
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