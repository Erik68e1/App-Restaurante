// Datos simulados de mesas y clientes
const mesas = [
    { numero: 1, capacidad: 4 },
    { numero: 2, capacidad: 2 },
    { numero: 3, capacidad: 6 }
];

const clientes = [
    { nombre: "Cliente 1", mesa: 1, tiempo: 60 },
    { nombre: "Cliente 2", mesa: 2, tiempo: 45 }
];

// Función para mostrar mesas disponibles
function mostrarMesasDisponibles() {
    const mesasDisponibles = mesas.filter(mesa => {
        const clienteEnMesa = clientes.find(cliente => cliente.mesa === mesa.numero);
        return !clienteEnMesa;
    });

    const mesasDisponiblesDiv = document.getElementById("mesas-disponibles-card");
    mesasDisponiblesDiv.innerHTML = "<h2>Mesas Disponibles</h2>";
    if (mesasDisponibles.length === 0) {
        mesasDisponiblesDiv.innerHTML += "<p>No hay mesas disponibles en este momento.</p>";
    } else {
        mesasDisponibles.forEach(mesa => {
            mesasDisponiblesDiv.innerHTML += `<p>Mesa ${mesa.numero} - Capacidad: ${mesa.capacidad}</p>`;
        });
    }
}

// Función para mostrar clientes en el local
function mostrarClientesEnLocal() {
    const clientesEnLocalDiv = document.getElementById("clientes-en-local-card");
    clientesEnLocalDiv.innerHTML = "<h2>Clientes en el Local</h2>";
    if (clientes.length === 0) {
        clientesEnLocalDiv.innerHTML += "<p>No hay clientes en el local en este momento.</p>";
    } else {
        clientes.forEach(cliente => {
            clientesEnLocalDiv.innerHTML += `<p>${cliente.nombre} - Mesa ${cliente.mesa} - Tiempo restante: ${cliente.tiempo} minutos</p>`;
        });
    }
}

// Función para actualizar el tiempo de permanencia de los clientes
function actualizarTiempoClientes() {
    clientes.forEach(cliente => {
        cliente.tiempo -= 5; // Simulación de 5 minutos transcurridos
        if (cliente.tiempo <= 0) {
            const index = clientes.indexOf(cliente);
            clientes.splice(index, 1); // Eliminar cliente si su tiempo ha expirado
        }
    });
}

// Mostrar mesas disponibles y clientes en el local al cargar la página
mostrarMesasDisponibles();
mostrarClientesEnLocal();

// Actualizar cada 5 minutos el tiempo de permanencia de los clientes
setInterval(() => {
    actualizarTiempoClientes();
    mostrarClientesEnLocal();
}, 300000); // 300000 milisegundos = 5 minutos

// Simulación de datos de reservas
const reservas = [
    { fecha: "2024-05-01", cantidad_personas: 4 },
    { fecha: "2024-05-01", cantidad_personas: 3 },
    { fecha: "2024-05-02", cantidad_personas: 5 },
    { fecha: "2024-05-02", cantidad_personas: 2 },
    { fecha: "2024-05-03", cantidad_personas: 6 }
];

// Función para calcular estadísticas de uso del local
function calcularEstadisticasUsoLocal() {
    const estadisticas = {};

    reservas.forEach(reserva => {
        const fecha = reserva.fecha;
        const cantidadPersonas = reserva.cantidad_personas;

        if (!estadisticas[fecha]) {
            estadisticas[fecha] = {
                num_reservas: 1,
                total_personas: cantidadPersonas
            };
        } else {
            estadisticas[fecha].num_reservas++;
            estadisticas[fecha].total_personas += cantidadPersonas;
        }
    });

    return estadisticas;
}

// Función para mostrar las estadísticas de uso del local en la página
function mostrarEstadisticasUsoLocal() {
    const estadisticas = calcularEstadisticasUsoLocal();

    const estadisticasDiv = document.getElementById("estadisticas-card");
    estadisticasDiv.innerHTML = "<h2>Estadísticas de Uso del Local</h2>";
    if (Object.keys(estadisticas).length === 0) {
        estadisticasDiv.innerHTML += "<p>No hay datos disponibles.</p>";
    } else {
        for (const fecha in estadisticas) {
            if (estadisticas.hasOwnProperty(fecha)) {
                estadisticasDiv.innerHTML += `<p>Fecha: ${fecha} - Reservas: ${estadisticas[fecha].num_reservas} - Total de personas: ${estadisticas[fecha].total_personas}</p>`;
            }
        }
    }
}

// Mostrar estadísticas al cargar la página
mostrarEstadisticasUsoLocal();
